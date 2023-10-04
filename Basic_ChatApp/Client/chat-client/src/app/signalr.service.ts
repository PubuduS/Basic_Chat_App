import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

import { ChatData } from './chat-data';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  hubUrl: string;
  connection: any;
  hubHelloMessage: BehaviorSubject<ChatData>;

  chatData: ChatData = {} as ChatData;

  constructor() 
  { 
    this.connection = null;
    this.hubUrl = 'https://localhost:7081/chathub';

    this.hubHelloMessage = new BehaviorSubject<ChatData>({} as ChatData);
  }

  public async initiateSignalRConnection(): Promise<void>
  {
    try
    {
      this.connection = new signalR.HubConnectionBuilder()
      .withUrl( this.hubUrl )
      .withAutomaticReconnect()
      .build();

      await this.connection.start();

      this.setSignalRClientMethods();

      console.log(`SignalR connection success! connectionId: ${this.connection.connectionId}`);

    }    
    catch( error ) 
    {
      console.log(`SignalR connection error: ${error}`);
    }
  }

  private setSignalRClientMethods(): void 
  {
    //console.log("Inside setSignalRClientMethods");

    this.connection.on("messageReceived", (username: string, message: string) => {
      
      //console.log("########Inside connection" + message);

      
      const divMessages: HTMLDivElement = document.querySelector("#divMessages")!;
      const m = document.createElement("div");
      m.innerHTML = `<div class="message-author">${username}: ${message}</div>`;

      divMessages.appendChild(m);
      divMessages.scrollTop = divMessages.scrollHeight;


      this.chatData.userName = username;
      this.chatData.message = message;
      //console.log("*****Emitting next value to BehaviorSubject");
      this.hubHelloMessage.next(this.chatData);
    });

    //console.log("-------setSignalRClientMethods complete");
  }
}

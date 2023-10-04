import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../signalr.service';
import { ChatData } from '../chat-data';

@Component({
  selector: 'app-send-message-ui',
  templateUrl: './send-message-ui.component.html',
  styleUrls: ['./send-message-ui.component.css']
})
export class SendMessageUiComponent implements OnInit {

  title: string = 'Pubudu\'s Corner';
  hubHelloMessage: string = '';
  userName?: string = '';
  message?: string = '';
  msgData?: string = 'Hello';  

  constructor( private signalRService: SignalrService )
  {    
  }

  ngOnInit(): void 
  {
    console.log("Inside ngOnInit");
    this.signalRService.hubHelloMessage.subscribe( ( chatData: ChatData ) => {
      this.hubHelloMessage = chatData.message;
    });
  }

  sentMessage(): void
  { 
    console.log("Inside sentMessage");
    this.signalRService.connection
    .invoke('NewMessage', this.userName, this.message)
    .catch((error: any) => {
          console.log(`ChatHub.NewMessage() error: ${error}`);
          //alert('ChatHub.NewMessage() error!, see console for details.');
    });   
  }


}

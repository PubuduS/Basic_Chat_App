import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignalrService } from './signalr.service';
import { SendMessageUiComponent } from './send-message-ui/send-message-ui.component';

@NgModule({
  declarations: [
    AppComponent,
    SendMessageUiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    SignalrService,
    {
      provide: APP_INITIALIZER,
      useFactory: ( signalRService: SignalrService) => () => signalRService.initiateSignalRConnection(),
      deps: [SignalrService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

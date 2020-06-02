import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message/message.component';


@NgModule({
  declarations: [MessagesComponent, MessageComponent],
  imports: [
    CommonModule
  ],
  exports: [MessagesComponent]
})
export class MessageModule { }

import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message, MessageType } from './message';

@Component({
  selector: 'app-message',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.reciveMessages().subscribe({
      next: (message: Message) => {
        this.messages.push(message);
        setTimeout(() => { this.removeMessage(message); }, 3000);
      }
    });
  }

  removeMessage(message: Message) {
    this.messages = this.messages.filter(x => x !== message);
  }

  getCssClass(message: Message) {
    const classes = ['alert', 'alert-dismissable'];
    const alertTypeClass = {
        [MessageType.success]: 'alert alert-success',
        [MessageType.error]: 'alert alert-danger'
    }
    classes.push(alertTypeClass[message.type]);
    return classes.join(' ');
}
}

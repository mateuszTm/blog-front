import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from './message';

@Component({
  selector: 'app-messages',
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
      }
    });
  }

  removeMessage(message: Message) {
    this.messages = this.messages.filter(x => x !== message);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from './message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

  public messages: Message[] = [];
  private subscription = new Subscription();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.messageService.reciveMessages().subscribe({
        next: (message: Message) => {
          this.messages.push(message);
        }
      })
    );
  }

  removeMessage(message: Message) {
    this.messages = this.messages.filter(x => x !== message);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

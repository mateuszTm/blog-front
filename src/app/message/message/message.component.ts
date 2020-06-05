import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MessageType, Message } from '../message';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  private _message: Message;
  class = ['alert', 'alert-dismissable'];
  private messageTypeClasses = {
    [MessageType.success]: 'alert-success',
    [MessageType.error]: 'alert-danger',
    [MessageType.info]: 'alert-info',
    [MessageType.warning]: 'alert-warning'
  };
  @Output() whenClose: EventEmitter<void> = new EventEmitter();
  subject = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set message(message: Message) {
    this._message = message;
    this.class.push(this.messageTypeClasses[message.type]);
    if (environment.autocloseMessages) {
      setTimeout(() => {
        this.closeMessage();
      }, 5000);
    }
  }

  get message(): Message {
    return this._message;
  }

  public getClass(): string {
    return this.class.join(' ');
  }

  public closeMessage(): void{
    this.class.push('fade');
    setTimeout(() => {
      this.whenClose.emit();
    }, 500);
  }
}

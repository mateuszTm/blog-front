import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message, MessageType } from '../../message/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();

  constructor() { }

  public reciveMessages(): Observable<Message>{
    return this.subject.asObservable();
  }

  private sendMessage(type: MessageType, message: string) {
    this.subject.next(new Message(type, message));
  }

  success(message: string): void {
    this.sendMessage(MessageType.success, message);
  }

  error(message: string): void {
    this.sendMessage(MessageType.error, message);
  }

  info(message: string): void {
    this.sendMessage(MessageType.info, message);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  static success(message: string) {
    alert('SUCCESS: ' + message);
  }

  static info(message: string) {
    alert('INFO: ' + message);
  }

  static error(message: string) {
    alert('ERROR: ' + message);
  }
}

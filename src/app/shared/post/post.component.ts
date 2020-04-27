import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() title: string;
  @Input() author: string;
  @Input() date: string;
  @Input() content: string;
  @Output() editPost: EventEmitter<void> = new EventEmitter();
  @Output() deletePost: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  runEditPost() {
    console.log('kliknięto edycję wpisu');
  }

  runDeletePost() {
    console.log('kliknięto usunięcie wpisu');
  }
}

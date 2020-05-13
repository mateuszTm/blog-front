import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/dto/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  // @Input() title: string;
  // @Input() author: string;
  // @Input() date: string;
  // @Input() content: string;
  @Output() editPost: EventEmitter<void> = new EventEmitter();
  @Output() deletePost: EventEmitter<void> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  runEditPost() {
    console.log('kliknięto edycję wpisu');
    this.router.navigate(['/editPost/' + this.post.id]);
  }

  runDeletePost() {
    console.log('kliknięto usunięcie wpisu');
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/dto/post';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post-service.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() showActionLinks = true;
  @Input() post: Post;
  @Output() whenEdit: EventEmitter<void> = new EventEmitter();
  @Output() whenDelete: EventEmitter<void> = new EventEmitter();

  constructor(
    private router: Router,
    private postService: PostService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  runEditPost() {
    this.router.navigate(['/editPost/' + this.post.id]);
  }

  runDeletePost() {
    if (confirm('Na pewno chcesz usunąć ten wpis?')) {
      this.postService.deletePost(this.post.id).subscribe({
        next: () => {
          this.messageService.success('Wpis został usunięty');
          this.whenDelete.emit();
        }
      });
    }
  }
}

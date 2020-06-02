import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/dto/post';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post-service.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Output() whenEdit: EventEmitter<void> = new EventEmitter();
  @Output() whenDelete: EventEmitter<void> = new EventEmitter();

  constructor(
    private router: Router,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  runEditPost() {
    console.log('kliknięto edycję wpisu');
    this.router.navigate(['/editPost/' + this.post.id]);
  }

  runDeletePost() {
    if (confirm('Na pewno chcesz usunąć ten wpis?')) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.postService.deletePost(this.post.id).subscribe({
        next: (resp) => {
          MessageService.success('Usunięto wpis');
          this.whenDelete.emit();
        },
        error: error => MessageService.error(error)
      });
    }
  }





  runMsgSuccess(){
    this.messageService.success(':)');
  }
  runMsgError(){
    this.messageService.error(':(');
  }
}

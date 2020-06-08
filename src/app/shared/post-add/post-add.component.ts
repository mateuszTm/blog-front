import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';
import { Router } from '@angular/router';
import { PostForm } from 'src/app/dto/post-form';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {

  @Input() onCancelRoute = '';
  @Input() onSuccessRoute = '';
  isFormVisible = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

  }

  addPost(post: PostForm) {
    this.postService.addPost(post).subscribe({
        next: (data) => {
          this.messageService.success('Wpis został dodany');
          this.runOnSuccess();
        }
      });
  }

  runOnCancel(post: PostForm) {
    if (this.onCancelRoute) {
      this.router.navigate([this.onCancelRoute]);
    }
    this.hideForm();
  }

  runOnSuccess() {
    if (this.onSuccessRoute) {
      this.router.navigate([this.onSuccessRoute]);
    } else {
      this.router.navigate(['/']);
    }
    this.hideForm();
  }

  showForm() {
    this.isFormVisible = true;
  }

  hideForm() {
    this.isFormVisible = false;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/post/post-service.service';
import { PostForm } from 'src/app/dto/post-form';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {

  @Output() whenSuccess = new EventEmitter<void>();
  @Output() whenCancel = new EventEmitter<void>();
  isFormVisible = false;

  constructor(
    private postService: PostService,
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
    this.hideForm();
    this.whenCancel.emit();
  }

  runOnSuccess() {
    this.hideForm();
    this.whenSuccess.emit();
  }

  showForm() {
    this.isFormVisible = true;
  }

  hideForm() {
    this.isFormVisible = false;
  }
}

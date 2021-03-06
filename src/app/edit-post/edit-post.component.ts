import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post-service.service';
import { Post } from '../dto/post';
import { Router, ActivatedRoute } from '@angular/router';
import { PostForm } from '../dto/post-form';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post = new Post();

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.postService.getPostById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
      next: (data: Post) => {this.post = data; }
    });
  }

  runSavePost(post: PostForm) {
    this.postService.editPost(this.post.id, post).subscribe({
      next: data => this.messageService.success('Wpis został pomyślnie edytowany')
    });
  }

  runOnCancel(post: PostForm) {
    this.router.navigate(['/home']);
  }
}

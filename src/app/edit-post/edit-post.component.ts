import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostService } from '../services/post-service.service';
import { Post } from '../dto/post';
import { Router, ActivatedRoute } from '@angular/router';
import { PostForm } from '../dto/post-form';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  private id: string;

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('editing post id: ' + this.id);
  }

  runSavePost(post: PostForm) {
    console.log('submit edit post form');

    this.postService.editPost(this.id, post).subscribe({
      next: data => {
        console.log('edited post');
        console.log(data);
        alert('Wpis został pomyślnie edytowany');
      }
    });
  }

  runOnCancel(post: PostForm) {
    this.router.navigate(['/home']);
    console.log('canceled edit post form');
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from 'src/app/services/post-service.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/dto/post';
import { PostForm } from 'src/app/dto/post-form';

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
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  addPost(post: PostForm) {
    console.log('addPost; kliknięto dodaj post');
    // let httpheaders = new HttpHeaders({
    //   'Content-type': 'application/json; charset=utf-8', 
    //   'Authorization': 'Bearer ' + this.authService.getAccessToken()
    // });
    // return this.http.post(
    //   'http://localhost:8082/resourceserver/post',
    //   {
    //     title: this.addPostform.get('title').value,
    //     content: this.addPostform.get('content').value
    //   }, {
    //     headers: httpheaders
    //   }).subscribe({
    //   next: data => {
    //     console.log('post/add response: ');
    //     console.log(data);
    //   }
  // });
                      //  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    this.postService.addPost(post).subscribe({
        next: (data) => {
          console.log('post/add response: ');
          console.log(data);
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
      window.location.reload();
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

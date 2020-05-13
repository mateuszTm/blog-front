import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Post } from 'src/app/dto/post';
import { PostForm } from 'src/app/dto/post-form';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postFormGroup: FormGroup;
  @Input() defaultValue = new PostForm('', '');
  @Output() clickedSubmit: EventEmitter<PostForm> = new EventEmitter();
  @Output() clickedCancel: EventEmitter<PostForm> = new EventEmitter();
  private _post: Post;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.postFormGroup = this.fb.group({
      title: [''],
      content: ['']
    });
  }

  @Input()
  set post(post: Post) {
    this._post = post;
    if (this.postFormGroup) {
      this.postFormGroup.get('title').setValue(post.title);
      this.postFormGroup.get('content').setValue(post.content);
    }
  }

  get post(): Post {
    return this._post;
  }

  getPostForm(): PostForm {
    return new PostForm(
      this.postFormGroup.get('title').value,
      this.postFormGroup.get('content').value
    );
  }

  runClickedSubmit(){
    this.clickedSubmit.emit(this.getPostForm());
  }

  runClickedCancel() {
    this.clickedCancel.emit(this.getPostForm());
  }
}

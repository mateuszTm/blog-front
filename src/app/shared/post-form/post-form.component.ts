import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Post } from 'src/app/dto/post';
import { PostForm } from 'src/app/dto/post-form';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postFormGroup: FormGroup;
  fcTitle: FormControl;
  fcContent: FormControl;
  @Input() defaultValue = new PostForm('', '');
  @Output() clickedSubmit: EventEmitter<PostForm> = new EventEmitter();
  @Output() clickedCancel: EventEmitter<PostForm> = new EventEmitter();
  private _post: Post;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fcTitle = new FormControl('', [Validators.required]);
    this.fcContent = new FormControl('', [Validators.required]);
    this.postFormGroup = this.fb.group({
      title: this.fcTitle,
      content: this.fcContent
    });
  }

  @Input()
  set post(post: Post) {
    this._post = post;
    this.setFormValues(post);
  }

  get post(): Post {
    return this._post;
  }

  public setFormValues(post: Post): void{
    if (this.postFormGroup) {
      this.postFormGroup.patchValue({
        title: post.title,
        content: post.content
      });
    }
  }

  public getPostForm(): PostForm {
    return new PostForm(
      this.fcTitle.value,
      this.fcContent.value
    );
  }

  public runClickedSubmit(): void{
    this.clickedSubmit.emit(this.getPostForm());
  }

  public runClickedCancel(): void {
    this.clickedCancel.emit(this.getPostForm());
  }
}

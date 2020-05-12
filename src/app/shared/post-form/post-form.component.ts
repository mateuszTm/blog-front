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

  postForm: FormGroup;
  @Input() defaultValue = new PostForm('', '');
  @Output() clickedSubmit: EventEmitter<PostForm> = new EventEmitter();
  @Output() clickedCancel: EventEmitter<PostForm> = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: [this.defaultValue.title],
      content: [this.defaultValue.content]
    });
  }

  runClickedSubmit(){
    this.clickedSubmit.emit(new PostForm(
      this.postForm.get('title').value,
      this.postForm.get('content').value
    ));
  }

  runClickedCancel() {
    this.clickedCancel.emit(new PostForm(
      this.postForm.get('title').value,
      this.postForm.get('content').value
    ));
  }
}

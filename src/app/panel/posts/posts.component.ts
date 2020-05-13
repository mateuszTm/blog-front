import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PostService } from 'src/app/services/post-service.service';
import { Post } from 'src/app/dto/post';
import { ResourcesPage } from 'src/app/dto/resources-page';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  page = new ResourcesPage();
  pageElements: number;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPage();
  }

  private _update(data: ResourcesPage){
    this.page = data;
    this.pageElements = data.numberOfElements;
  }

  getPage(params?: HttpParams) {
    this.postService.getPosts(params).subscribe({
      next: data => {this._update(data); }
    });
  }

}

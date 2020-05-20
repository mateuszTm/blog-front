import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PostService } from 'src/app/services/post-service.service';
import { Post } from 'src/app/dto/post';
import { ResourcesPage } from 'src/app/dto/resources-page';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  page = new ResourcesPage();
  pageElements: number;

  constructor(private userService: ProfileService) { }

  ngOnInit(): void {
    this.getPage();
  }

  private _update(data: ResourcesPage){
    this.page = data;
    this.pageElements = data.totalElements;
  }

  getPage(params?: HttpParams) {
    this.userService.getCurrentUserPosts(params).subscribe({
      next: data => {this._update(data); }
    });
  }

}

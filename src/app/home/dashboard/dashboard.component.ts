import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';
import { ResourcesPage } from 'src/app/dto/resources-page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  page: ResourcesPage = new ResourcesPage();
  pageElements: number;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPage();
  }

  private _setupFromData(data: ResourcesPage){
    this.page = data;
    this.pageElements = data.numberOfElements;
  }

  getPage(page?: number) {
    this.postService.getPosts(page).subscribe({
      next: data => {this._setupFromData(data); }
    });
  }
}

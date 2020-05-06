import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';
import { ResourcesPage } from 'src/app/dto/resources-page';

@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.css']
})
export class DashboadComponent implements OnInit {

  postsList: object[];
  data: ResourcesPage;
  pageElements: number;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.goToPage(0);
  }

  private _setupFromData(data: ResourcesPage){
    this.data = data;
    this.postsList = data.content;
    this.pageElements = data.numberOfElements;
  }

  goToPage(page: number): void {
    this.postService.getPage(page).subscribe({
      next: data => { this._setupFromData(data); }
    });
  }

  previousPage(): void {
    this.postService.getPage(this.data.number - 1).subscribe({
      next: data => { this._setupFromData(data); }
    });
  }

  nextPage(): void {
    this.postService.getPage(this.data.number + 1).subscribe({
      next: data => { this._setupFromData(data); }
    });
  }
}

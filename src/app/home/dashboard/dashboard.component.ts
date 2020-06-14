import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';
import { ResourcesPage } from 'src/app/dto/resources-page';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/dto/post';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  page: ResourcesPage = new ResourcesPage();
  pageElements: number;
  private _isLoggedIn = false;
  private subscription = new Subscription();

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.getPage();
    this._isLoggedIn = this.authService.isLoggedIn();
  }

  ngAfterViewInit(): void {
    this.authService.observeLoggedInStatus()
      .subscribe({
        next: (status: boolean) => { this._isLoggedIn = status; }
      });
  }

  public isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public showActionLinks(post: Post): boolean {
    if (this._isLoggedIn) {
      if (this.authService.getCurrentUser().name === post.userName) {
        return true;
      }
      return false;
    }
    return false;
  }

  private _setupFromData(data: ResourcesPage): void {
    this.page = data;
    this.pageElements = data.numberOfElements;
  }

  public getPage(page?: number): void {
    this.postService.getPosts(page).subscribe({
      next: data => { this._setupFromData(data); }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.css']
})
export class DashboadComponent implements OnInit {

  postsList = '... wczytywanie listy wpisów';
  page = 1;
  pageSize = 10;
  totalPages = 0;
  startsWith = 1;

  constructor(private postService: PostService, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.getPosts().subscribe({
      next: data => {
        console.log('posts JSON:');
        console.log(data);
        // this.postsList = JSON.stringify(data);
        this.postsList = JSON.stringify(data.content);
        this.page = data.number;
        this.pageSize = data.numberOfElements;
        this.totalPages = data.totalPages;
      }
    });
  }

//   private setPaginator(currentPage: number, totalPages: number) {
//     var pages = [];
// // pages.fi
//     // let start = (currentPage - 1);
//     // let end = start + 3;
//     let currentPage = 5;
//     let totalPages = 12;
//     let sideOffset = 2;
//     let pageLinks = sideOffset * 2 + 1;

//     let start = currentPage - sideOffset;
//     if (start < 0) {
//         start = 0;
//     }

//     let end = start + pageLinks;
//     if (end > totalPages) {
//         end = totalPages;
//         start = end - pageLinks;
//     }

//     var pages = [];
//     for (let i = start; i < end; i++ ) {
//         pages.push(i);
//     }
//     console.log('start: ' + start + ' end: ' + end);
//     console.log(pages);

//   }

  goToPage(page: number): void {
    console.log('przejdź do strony: ' + page);
    this.page = page;
  }

  previousPage(): void {
    console.log('poprzednia strona');
    this.page = this.page - 1;
    // console.log(this.page);
  }

  nextPage(): void {
    console.log('następna strona');
    this.page = this.page + 1;
    // console.log(this.page);
  }
}

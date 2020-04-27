import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [PaginationComponent, PostComponent],
  imports: [
    CommonModule
  ],
  exports: [PaginationComponent, PostComponent]
})
export class SharedModule { }

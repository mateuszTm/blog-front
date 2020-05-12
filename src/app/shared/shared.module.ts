import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { PostComponent } from './post/post.component';
import { PostAddComponent } from './post-add/post-add.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PaginationComponent, PostComponent, PostAddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [PaginationComponent, PostComponent, PostAddComponent]
})
export class SharedModule { }

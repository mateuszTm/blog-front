import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { PostComponent } from './post/post.component';
import { PostAddComponent } from './post-add/post-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostFormComponent } from './post-form/post-form.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';



@NgModule({
  declarations: [PaginationComponent, PostComponent, PostAddComponent, PostFormComponent, ProfileComponent, ProfileFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [PaginationComponent, PostComponent, PostAddComponent, PostFormComponent, ProfileComponent]
})
export class SharedModule { }

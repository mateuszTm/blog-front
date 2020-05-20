import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'editPost/:id', component: EditPostComponent},
  { path: 'editProfile/:id', component: EditProfileComponent},
  { path: 'error', component: ErrorComponent},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

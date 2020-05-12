import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { AddPostComponent } from './add-post/add-post.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent, children: [
        { path: '', pathMatch: 'full', component: DashboardComponent},
        { path: 'addPost', component: AddPostComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

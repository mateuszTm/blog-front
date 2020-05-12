import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { SharedModule } from '../shared/shared.module';
import { AddPostComponent } from './add-post/add-post.component';



@NgModule({
  declarations: [DashboardComponent, HomeComponent, AddPostComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    HeaderModule,
    FooterModule
  ],
  exports: [DashboardComponent]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboadComponent } from './dashboad/dashboad.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [DashboadComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    HeaderModule,
    FooterModule
  ],
  exports: [DashboadComponent]
})
export class HomeModule { }

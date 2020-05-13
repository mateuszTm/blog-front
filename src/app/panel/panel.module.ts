import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { PanelComponent } from './panel.component';
import { PostsComponent } from './posts/posts.component';
import { PanelRoutingModule } from './panel-routing.module';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ConfigComponent, PanelComponent, PostsComponent, SidemenuComponent],
  imports: [
    CommonModule,
    SharedModule,
    PanelRoutingModule,
    HeaderModule,
    FooterModule
  ],
  exports: [PanelComponent]
})
export class PanelModule { }

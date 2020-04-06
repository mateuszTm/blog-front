import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PanelComponent } from './panel.component';
import { ConfigComponent } from './config/config.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
    { path: 'panel', component: PanelComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'config'},
        { path: 'config', component: ConfigComponent},
        { path: 'posts', component: PostsComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PanelRoutingModule { }

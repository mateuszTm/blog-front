import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PanelComponent } from './panel.component';
import { ConfigComponent } from './config/config.component';
import { PostsComponent } from './posts/posts.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { AuthGuard } from '../services/auth.guard';
import { Role } from '../services/role';

const routes: Routes = [
    { path: 'panel', canActivate: [AuthGuard], component: PanelComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'config'},
        { path: 'config', component: ConfigComponent},
        { path: 'posts', component: PostsComponent},
        { path: 'profiles', component: ProfilesComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN] }}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PanelRoutingModule { }

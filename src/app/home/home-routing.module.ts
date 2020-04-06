import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboadComponent } from './dashboad/dashboad.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent, children: [
        { path: '', pathMatch: 'full', component: DashboadComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
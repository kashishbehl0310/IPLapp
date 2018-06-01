import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SeasonComponent } from '../season/season/season.component';
// import { SeasonComponent } from '../home/season/season.component';
const routes: Routes = [{
    path: '',
    redirectTo: '/dashboard/2016/22-05-2016',
    pathMatch: 'full'
},{
    path: 'dashboard/:season/:date',
    component: HomeComponent
},{
    path : 'season/2016',
    redirectTo: '/season/2016',
    
},{
    path: 'season/:season',
    component: SeasonComponent
},{
    path: 'todays',
    redirectTo: '/dashboard/2016/22-05-2016',
    pathMatch: 'full'
}]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouterModule{

}
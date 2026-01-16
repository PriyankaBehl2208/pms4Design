import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
     { path: '', component: LoginComponent, pathMatch: 'full'},
     { path:'dash', component: DashboardComponent, pathMatch: 'full'},
     { path:'usr', component: UserComponent, pathMatch: 'full'}
];

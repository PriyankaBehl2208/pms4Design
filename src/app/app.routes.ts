import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { PREPDIDISPTACHComponent } from './STAGE_10/prepdi-disptach/prepdi-disptach.component';
import { REVIEWCHECKLISTComponent } from './STAGE_10/prepdi-disptach/reviewchecklist.component';

export const routes: Routes = [
     { path: '', component: LoginComponent, pathMatch: 'full'},
     { path:'dash', component: DashboardComponent, pathMatch: 'full'},
     { path:'usr', component: UserComponent, pathMatch: 'full'},

{ path:'REVIEWPREPDI', component: REVIEWCHECKLISTComponent, pathMatch: 'full'},

      { path:'PREPDIDISPATCH', component: PREPDIDISPTACHComponent, pathMatch: 'full'}
];

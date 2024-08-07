import { Routes } from '@angular/router';
import { MenuLeftComponent } from './Components/menu-left/menu-left.component';
import { authGuardGuard, authGuardLogin } from './Guards/auth-guard.guard';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { ProjectsComponent } from './Components/proyects/projects.component';
import { ProjectDetailsComponent } from './Components/proyects/project-details/project-details.component';

export const routes: Routes = [
    {path:'dashboard',component:DashboardComponent, canActivate:[authGuardGuard]},
    {path: 'login', component:LoginComponent, canActivate: [authGuardLogin]},
    {path: 'projects', component:ProjectsComponent, canActivate: [authGuardGuard]},
    {path: 'project-details', component:ProjectDetailsComponent, canActivate: [authGuardGuard]}
];

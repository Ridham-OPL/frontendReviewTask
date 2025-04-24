import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { authGuard } from './auth.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'Home',
    component: HomeComponent, canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent, canActivate: [authGuard],
      },
      {
        path: 'user-list',
        component: UserListComponent, canActivate: [authGuard],
      }
    ]
  },
  {
    path: 'ForgetPass',
    component: ForgetPasswordComponent
  },
  {
    path: 'SetPassword/:id',
    component: SetPasswordComponent
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

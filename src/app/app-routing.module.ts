import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent, canActivate: [authGuard],
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

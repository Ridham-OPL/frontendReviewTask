import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { authInterceptor } from './auth.interceptor';
import { UpdatePopupComponent } from './update-popup/update-popup.component';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { ViewPopupComponent } from './view-popup/view-popup.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserListComponent,
    ConfirmationComponent,
    UpdatePopupComponent,
    DeletePopupComponent,
    ViewPopupComponent,
    SetPasswordComponent,
    ForgetPasswordComponent,
    Error404Component,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { NavbarComponent } from './navbar/navbar.component';
import { authInterceptor } from './auth.interceptor';
import { UpdatePopupComponent } from './update-popup/update-popup.component';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserListComponent,
    ConfirmationComponent,
    NavbarComponent,
    UpdatePopupComponent,
    DeletePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }

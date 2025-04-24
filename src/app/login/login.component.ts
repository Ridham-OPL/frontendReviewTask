import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Credential } from '../model/credential';
import { MemoryServiceService } from '../service/memory-service.service';
import { UserServiceService } from '../service/user-service.service';
import { Router } from '@angular/router';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  memoryService = inject(MemoryServiceService);
  userService = inject(UserServiceService)
  router = inject(Router)

  loginData: any;
  user: any;
  msg: string = ''
  message: string = '';
  loginCredential: Credential = new Credential();

  constructor(private builder: FormBuilder,
    public dialog: MatDialog) {
    this.loginData = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    })
    this.generateCaptcha();
  }
  login() {
    if (this.loginData.value.captcha != this.captchaText) {
      this.message = "Invalid captcha";
      this.generateCaptcha();
      return;
    }
    this.loginCredential = this.loginData.value
    this.userService.login(this.loginCredential).subscribe((data) => {
      this.user = data;
      if (this.user.accessRole !== "[ADMIN]") {
        this.msg = "Unauthorized Access!"
        return
      }
      this.memoryService.setCredential("token", this.user.token)
      this.memoryService.setCredential("username", this.user.username)
      // console.log(this.decodeToken(this.user.token))
      this.router.navigate(['/Home']);
    },
      (error) => {
        if (error.status === 403) {
          console.error('Forbidden. Please check your credentials.');
          this.msg = 'Invalid userame or password'
        } else if (error.status === 401) {
          console.error('Unauthorized. Please check your credentials.');
          this.msg = 'Unauthorized access. Invalid credentials.';
        }
      }
    );

  }
  forgetPass() {
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
    });
  }
  get fieldNames() {
    return this.loginData.controls;
  }

  captchaText: string = '';

  generateCaptcha(): void {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueChar = '';

    for (let i = 0; i < 5; i++) {
      uniqueChar += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.captchaText = uniqueChar;
  }

}

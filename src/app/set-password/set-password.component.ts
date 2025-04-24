import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';
import { UpdatePass } from '../model/update-pass';

@Component({
  selector: 'app-set-password',
  standalone: false,
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css'
})
export class SetPasswordComponent {
  newPassData: any
  id: any;
  msg: string = ''
  updatePassProxy: any;
  userService = inject(UserServiceService)
  router = inject(Router)

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.newPassData = this.formBuilder.group({
      newPass: ['', [Validators.required]],
      confirmPass: ['', [Validators.required]]
    });

  }
  ngOnInit(): void {
    // Retrieve the dynamic 'id' from the URL
    this.id = this.route.snapshot.paramMap.get('id');
  }

  updatePass() {
    if (this.newPassData.value.newPass != this.newPassData.value.confirmPass) {
      this.msg = "Password does't match"
      return
    }
    this.updatePassProxy = new UpdatePass()
    this.updatePassProxy.token = this.id;
    this.updatePassProxy.password = this.newPassData.value.confirmPass
    this.userService.resetPassword(this.updatePassProxy).subscribe((data) => {
      this.router.navigate([''])
    }, (error) => {
      if (error.status === 400) {
        this.msg = "Link is expired please try again!"
        return
      } else if (error.status === 404) {
        this.msg = "Something want wrong please try again!"
        return
      }
    })
  }
}

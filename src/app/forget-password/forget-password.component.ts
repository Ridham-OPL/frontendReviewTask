import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserServiceService } from '../service/user-service.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-forget-password',
  standalone: false,
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgetData: any;
  userService = inject(UserServiceService)
  id: string | null = null;
  msg: string = ''

  constructor(private builder: FormBuilder,
    public dialogRef: MatDialogRef<ForgetPasswordComponent>,
    public dialog: MatDialog,
  ) {
    this.forgetData = this.builder.group({
      username: ['', Validators.required],
    })
  }
  sendLink() {
    this.userService.sendLink(this.forgetData.value.username).subscribe((data) => {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        data: {
          msg: 'The link has been successfully sent to the registered email.',
          header: 'Status',
          bg: 'bg-success',
          btnName: 'Ok'
        }
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        this.dialogRef.close();
      });
    }, (error) => {
      this.msg = "Something went wrong, please try again."
    })
  }
  get fieldNames() {
    return this.forgetData.controls;
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}

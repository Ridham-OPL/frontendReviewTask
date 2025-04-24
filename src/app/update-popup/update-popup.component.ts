import { Component, inject, Inject } from '@angular/core';
import { User } from '../model/user';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-update-popup',
  standalone: false,
  templateUrl: './update-popup.component.html',
  styleUrl: './update-popup.component.css'
})
export class UpdatePopupComponent {

  userService = inject(UserServiceService)
  userUpdate: any
  constructor(
    public dialogRef: MatDialogRef<UpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private formBuilder: FormBuilder) {
    console.log(user)

    this.userUpdate = this.formBuilder.group({
      name: [user.name, Validators.required],
      username: [user.username, Validators.required],
      dob: [user.dob, Validators.required],
      gender: [user.gender, Validators.required],
      pinCode: [user.pinCode, Validators.required],
      contactNumber: [user.contactNumber, Validators.required],
      accessRole: [user.accessRole, Validators.required],
      address: [user.address, Validators.required]
    });
  }

  id: any;
  updateUser() {
    this.id = this.user.id;
    this.userService.updateUser(this.id, this.userUpdate.value).subscribe(
      (response) => {
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error during student updation:', error);
      }
    );
  }
  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without deletion
  }

  get fieldNames() {
    return this.userUpdate.controls;
  }
}

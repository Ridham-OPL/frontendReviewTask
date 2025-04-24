import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-view-popup',
  standalone: false,
  templateUrl: './view-popup.component.html',
  styleUrl: './view-popup.component.css'
})
export class ViewPopupComponent {

  userData: any
  profileUrl: any
  constructor(private builder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    this.userData = this.builder.group({
      name: [user.name, Validators.required],
      username: [user.username, Validators.required],
      dob: [user.dob, Validators.required],
      gender: [user.gender, Validators.required],
      pincode: [user.pinCode, Validators.required],
      mobile: [user.contactNumber, Validators.required],
      role: [user.accessRole, Validators.required],
      address: [user.address, Validators.required],
      profile: [user.profileImage]
    })
  }

  getImageUrl(): string {
    const profile = this.user?.profileImage;
    if (profile) {
      const fileName = profile.split('\\').pop(); // Declare and use fileName here
      return `http://localhost:8081/document/${fileName}`;
    }
    return ''; // return empty string if profile path is not available
  }
  setAltText(): string {
    const username = this.user?.username;
    if (username) {
      const nameParts = username.split(' ');
      if (nameParts.length > 1) {
        return nameParts.map(word => word.charAt(0).toUpperCase()).join('');
      }
      return username.charAt(0).toUpperCase();
    }
    return '';
  }

  getInitials(): string {
    const name = this.user?.name;
    if (!name) return '';
    const words = name.trim().split(' ');
    let initials = words[0]?.charAt(0).toUpperCase();
    console.log(words)
    if (words.length > 1) {
      initials += words[1]?.charAt(0).toUpperCase();
    }
    return initials;
  }


  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without deletion
  }
}

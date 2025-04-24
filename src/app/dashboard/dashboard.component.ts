import { Component, inject } from '@angular/core';
import { MemoryServiceService } from '../service/memory-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  memoryService = inject(MemoryServiceService);
  userService = inject(UserServiceService)
  router = inject(Router)

  userData: any
  profileUrl: any
  user: User = new User();
  constructor(private builder: FormBuilder) {
    this.loadUserDetails()
    this.userData = this.builder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      pincode: ['', Validators.required],
      mobile: ['', Validators.required],
      role: ['', Validators.required],
      address: ['', Validators.required],
      profile: ['']
    })
  }

  loadUserDetails() {
    const username = this.memoryService.getCredential("username");
    if (username) {
      this.userService.getUser(username).subscribe({
        next: (data) => {
          this.user = data;

          // Update form controls once user data is received
          this.userData.patchValue({
            name: this.user.name,
            username: this.user.username,
            dob: this.user.dob,
            gender: this.user.gender,
            pincode: this.user.pinCode,
            mobile: this.user.contactNumber,
            role: this.user.accessRole,
            address: this.user.address
          });
          console.log(this.user.profileImage)
          this.profileUrl = 'assets/document/' + this.user.profileImage;
        },
        error: (error) => {
          console.error("Error fetching user details:", error);
        }
      });
    } else {
      console.error("Username not found in memoryService!");
    }
  }

  profileImageURL: string = 'assets/default-profile.png'; // Default image
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  id: any;
  uploadProfile() {
    if (this.selectedFile !== null) {
      this.id = this.user.id;
      const formData = new FormData();
      formData.append("profilePic", this.selectedFile);
      this.userService.uploadProfile(this.id, formData).subscribe(response => {
        alert("Profile picture uploaded successfully!");
      }, error => {
        console.log(error)
      });
    }
  }
}

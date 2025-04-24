import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-delete-popup',
  standalone: false,
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.css'
})
export class DeletePopupComponent {

  userService = inject(UserServiceService)

  constructor(
    public dialogRef: MatDialogRef<DeletePopupComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) { }

  deleteDialog() {
    this.userService.deleteUser(this.id).subscribe((response) => {
      this.dialogRef.close();
    },
      (error) => {
        console.error('Error during student updation:', error);
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

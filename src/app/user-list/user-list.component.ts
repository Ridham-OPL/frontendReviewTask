import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../model/user';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  userService = inject(UserServiceService)
  router = inject(Router)

  users: any;
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 10; // Number of rows per page
  totalPagesArray: number[] = []; // Array to store page numbers
  searchName: any;

  constructor(
    private dialog: MatDialog,
    private builder: FormBuilder
  ) {
    this.searchName = this.builder.group({
      name: ['', Validators.required]
    })

    this.pagination(this.currentPage);
  }
  pagination(pageNumber: Number): void {
    this.userService.pagination(pageNumber, this.pageSize).subscribe(
      (response) => {
        this.users = response.content;  // The list of employees
        this.currentPage = response.pageable.pageNumber + 1;  // Adjust page number to be 1-based
        this.totalPages = response.totalPages;  // The total number of pages
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);  // Array of page numbers
      }
    );
  }

  paginationWithName(pageNumber: Number, name: string) {
    this.userService.paginationWithName(pageNumber, this.pageSize, name).subscribe(
      (response) => {
        this.users = response.content;  // The list of employees
        this.currentPage = response.pageable.pageNumber + 1;  // Adjust page number to be 1-based
        this.totalPages = response.totalPages;  // The total number of pages
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);  // Array of page numbers
      }
    );
  }

  search() {
    this.paginationWithName(this.currentPage, this.searchName.value.name)
  }

  updateDialog(user: User) {
    const dialogRef = this.dialog.open(UpdatePopupComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(res => {
    })
  }

  deleteDialog(eId: Number) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      data: eId
    })
    dialogRef.afterClosed().subscribe(res => {
    })
  }

  get fieldNames() {
    return this.searchName.controls;
  }
}

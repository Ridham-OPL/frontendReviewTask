import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../model/user';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewPopupComponent } from '../view-popup/view-popup.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

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
  totalData: any
  currentData: any

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
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Array of page numbers
        this.totalData = response.totalElements
        this.currentData = response.numberOfElements
      }
    );
  }
  getVisiblePages(): number[] {
    const totalPages = this.totalPages; // Total available pages
    const currentPage = this.currentPage; // Current page number
    const maxVisible = 5; // Number of pages to show at once
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    // Adjust start position if close to the last pages
    if (totalPages > maxVisible && endPage === totalPages) {
      startPage = totalPages - maxVisible + 1;
    }

    return Array(endPage - startPage + 1)
      .fill(0)
      .map((_, i) => startPage + i);
  }


  // paginationWithName(pageNumber: Number, name: string) {
  //   this.userService.paginationWithName(pageNumber, this.pageSize, name).subscribe(
  //     (response) => {
  //       this.users = response.content;  // The list of employees
  //       this.currentPage = response.pageable.pageNumber + 1;  // Adjust page number to be 1-based
  //       this.totalPages = response.totalPages;  // The total number of pages
  //       this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);  // Array of page numbers
  //     }
  //   );
  // }

  search() {
    console.log(this.searchName.value.name)
    this.userService.paginationWithName(this.currentPage, this.pageSize, this.searchName.value.name).subscribe(
      (response) => {
        let temp = this.users;
        this.users = response.content;
        if (this.users.length < 1) {
          this.users = temp
          this.showPopup();
          return
        }
        this.currentPage = response.pageable.pageNumber + 1;  // Adjust page number to be 1-based
        this.totalPages = response.totalPages;  // The total number of pages
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);  // Array of page numbers
        this.totalData = response.totalElements
        this.currentData = response.numberOfElements
      }
    );
  }
  showPopup() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        msg: "Oops! No records found.",
        header: "Not Found",
        bg: "bg-warning",
        btnName: "Close",
        width: '1000px',
        height: 'auto'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.pagination(this.currentPage);
    });
  }

  updateDialog(user: User) {
    const dialogRef = this.dialog.open(UpdatePopupComponent, {
      data: user,
      width: '1000px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.pagination(this.currentPage);
    });
  }


  deleteDialog(eId: Number) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      data: eId
    })
    dialogRef.afterClosed().subscribe(res => {
      this.pagination(this.currentPage);
    })
  }

  viewDialog(user: User) {
    const dialogRef = this.dialog.open(ViewPopupComponent, {
      data: user,
      width: '1000px',
      height: 'auto'
    })
    dialogRef.afterClosed().subscribe(res => {
    })
  }

  get fieldNames() {
    return this.searchName.controls;
  }
}

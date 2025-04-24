import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  standalone: false,
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {

  msg: string = ''
  header: string = '';
  bg: string = ''
  btnName: string = ''
  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.msg = data.msg,
      this.header = data.header,
      this.bg = data.bg,
      this.btnName = data.btnName
  }

  confirm(result: boolean): void {
    this.dialogRef.close(result);
  }

  close(): void {
    this.dialogRef.close();
  }
}

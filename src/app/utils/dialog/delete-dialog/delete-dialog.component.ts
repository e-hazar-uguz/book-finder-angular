import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {}
  book: Book;

  ngOnInit() {}

  actionFunction() {
    this.closeDialog('delete') 
  }

  closeModal() {
    this.closeDialog('cancel')
  }

  closeDialog(button: 'delete' | 'cancel') {
    this.dialogRef.close(button);
  }
}

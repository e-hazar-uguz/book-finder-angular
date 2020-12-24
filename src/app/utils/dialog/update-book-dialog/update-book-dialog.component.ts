import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/model/Book';
import { AlertifyService } from 'src/app/service/alertify.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-update-book-dialog',
  templateUrl: './update-book-dialog.component.html',
  styleUrls: ['./update-book-dialog.component.scss'],
  providers: [ApiService]
})
export class UpdateBookDialogComponent implements OnInit {
  book: Book = new Book();
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateBookDialogComponent>,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertify: AlertifyService,
  ) {
    this.book = data;
  }
  updateBookForm: FormGroup;

  updateAddBookForm() {
    this.updateBookForm = this.formBuilder.group({
      id: [this.book.id, Validators.required],
      name: [this.book.name, Validators.required],
      type: [this.book.type, Validators.required],
      authorName: [this.book.authorName, Validators.required],
    });
  }

  ngOnInit() {
    console.log(this.book);
    this.updateAddBookForm();

  }

  update() {
    if (this.updateBookForm.valid) {
      this.book = Object.assign({}, this.updateBookForm.value);
    }

    this.apiService.updateBook(this.book).subscribe((data) => {
      this.alertify.success("Updated successfully");
      this.dialogRef.close('update');
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}

import { UpdateBookDialogComponent } from './../../utils/dialog/update-book-dialog/update-book-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { ApiService } from 'src/app/service/api.service';
import { AlertifyService } from 'src/app/service/alertify.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/utils/dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [ApiService],
})
export class BookListComponent implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private alertify: AlertifyService,
    public matDialog: MatDialog
  ) {}
  books: Book[] = [];
  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.activatedRoute.params.subscribe((params) => {
      this.apiService.getBooks().subscribe((response) => {
        this.books = response;
      });
    });
  }

  addNew() {
    this.router.navigate(['addBook']).then(
      (nav) => {
        console.log(nav);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteBook(book: Book) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(book);
      this.apiService.deleteBook(book).subscribe((response) => {
        console.log(response);
        this.alertify.error('Delete Successful');
        this.apiService.getBooks().subscribe((result) => {
          this.books = result;
        });
      });
    });
  }

  openDeleteDialog(book: Book) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'delete-dialog-component';
    dialogConfig.height = '250px';
    dialogConfig.width = '400px';
    const modalDialog = this.matDialog.open(
      DeleteDialogComponent,
      dialogConfig
    );

    modalDialog.afterClosed().subscribe((result) => {
      if (result == 'delete') {
        this.deleteBook(book);
      }
    });
  }

  openUpdateDialog(book: Book) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'update-dialog-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '400px';
    dialogConfig.data = book
    const modalDialog = this.matDialog.open(
      UpdateBookDialogComponent,
      dialogConfig,
    );

    modalDialog.afterClosed().subscribe((result) => {
      if (result == 'update') {
        this.apiService.getBooks().subscribe((result) => {
          this.books = result;
        });
      }
    });
  }

}

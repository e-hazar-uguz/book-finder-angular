import { UpdateBookDialogComponent } from './utils/dialog/update-book-dialog/update-book-dialog.component';
import { DeleteDialogComponent as DeleteDialogComponent } from './utils/dialog/delete-dialog/delete-dialog.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    AddBookComponent,
    DeleteDialogComponent,
    UpdateBookDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent, UpdateBookDialogComponent],
})
export class AppModule {}

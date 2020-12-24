import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  path = 'http://localhost:53136/api/books';
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.path + '/getAllBooks').pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }

  addBook(book: Book): Observable<Book> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    return this.http
      .post<Book>(this.path + '/addNewBook', book, httpOptions)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.path + '/updateBook', book).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteBook(book: Book) {
    return this.http.delete(this.path + '/DeleteBookById?id=' + book.id).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occured .. ' + err.error.message;
    } else {
      errorMessage = 'An error occured by System ..';
    }
    return throwError(errorMessage);
  }
}

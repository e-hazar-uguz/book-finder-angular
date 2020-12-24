import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/model/Book';
import { ApiService } from 'src/app/service/api.service';
import { AlertifyService } from 'src/app/service/alertify.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  providers: [ApiService]
})
export class AddBookComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  addBookForm: FormGroup;
  model: Book = new Book();

  createAddBookForm() {
    this.addBookForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      authorName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createAddBookForm();
  }

  add() {
    if (this.addBookForm.valid) {
      this.model = Object.assign({}, this.addBookForm.value);
    }
    this.apiService.addBook(this.model).subscribe((data) => {
      console.log(data.authorName + 'Added successfully.');
      this.alertify.success("Added successfully");
      this.router.navigate(['bookList']);
    });
    
  }

  back() {
    this.router.navigate(['bookList']);
  }

}

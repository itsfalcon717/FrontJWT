import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { Book } from 'src/app/models/book.models';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public listBook: Book[] = [];

  constructor(
    public readonly bookService: BookService
  ) { }

  ngOnInit(): void {

    this.getBooks();

  }

  public getBooks(): void {
    this.bookService.getBooks().pipe(take(1)).subscribe((resp:any) => {
      this.listBook = resp;
      // localStorage.setItem('listCartBook',JSON.stringify(resp));
    });
  }
}

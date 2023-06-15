import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.models';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs/internal/Observable';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public getBooks(): Observable<Book[]> {
    const url: string = environment.API_REST_URL + `/book`;
    return this._httpClient.get<Book[]>(url);
  }

  public getBooksFromCart(): Book[] {
    let listBook: any = localStorage.getItem('listCartBook');
    if (listBook === null) {
      listBook = [];
    }
    
    return JSON.parse(listBook);
  }

  public removeBooksFromCart(): void {
    localStorage.setItem('listCartBook', '');
  }

  public addBookToCart(book: Book) {
    let transformar:any =localStorage.getItem('listCartBook');
    let listBook: any = transformar ===''?undefined:JSON.parse(transformar);
    if (listBook ===  null ||  listBook === undefined) { // Create a list with the book
      book.amount = 1;
      listBook = [ book ];
    } else { 
      const index = listBook.findIndex((item: Book) => {
        return book.id === item.id;
      });
      if (index !== -1) { // Update the quantity in the existing book
        listBook[index].amount++;
      } else { 
        book.amount = 1;
        listBook.push(book);
      }
    }
    localStorage.setItem('listCartBook', JSON.stringify(listBook));
    this._toastSuccess(book);
  }

  public updateAmountBook(book: Book): Book[] {
    const listBookCart = this.getBooksFromCart();
    const index = listBookCart.findIndex((item: Book) => {
      return book.id === item.id;
    });
    if (index !== -1) {
      listBookCart[index].amount = book.amount;
      if (book.amount === 0) {
        listBookCart.splice(index, 1);
      }
    }
    localStorage.setItem('listCartBook', JSON.stringify(listBookCart));
    return listBookCart;
  }

  private _toastSuccess(book: Book) {
    const Toast = swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer);
        toast.addEventListener('mouseleave', swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: 'success',
      title: book.name + ' added to cart'
    });
  }
}

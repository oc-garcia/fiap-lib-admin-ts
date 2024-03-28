export class BookClass {
  title: string;
  author: string;
  isbn: string;
  year: number;
  publisher: string;

  constructor(title: string, author: string, isbn: string, year: number, publisher: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.year = year;
    this.publisher = publisher;
  }
}

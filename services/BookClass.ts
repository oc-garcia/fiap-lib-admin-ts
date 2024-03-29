export class BookClass {
  id: string;
  title: string;
  author: string;
  isbn: string;
  year: number;
  publisher: string;

  constructor(id: string, title: string, author: string, isbn: string, year: number, publisher: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.year = year;
    this.publisher = publisher;
  }
}

# FIAP TypeScript Challenge

## Objective

Develop a library management system using the latest version of TypeScript. The focus will be on creating a CRUD (Create, Read, Update, Delete) that connects to a database, which can be NoSQL or SQL.

## Functional Requirements

Book Management: The goal of your system will be to provide an API that has CRUD functionalities so that a Front-end application can manage this data.

Proposed Structure for Book Entity: Each book can have a title, author, ISBN, year of publication, and if you want to venture out, you can add a Publisher Entity, so a book can be part of a Publisher and a Publisher can have a list of books.

## Technical Requirements

Development of the project using the latest version of TypeScript to ensure that your code is up to date.

Integration of the system with a database that can be NoSQL or SQL. In this scenario, you can use Docker or a free database like PostgreSQL on the Supabase platform.

## Deployment

The application is deployed and can be accessed at [https://fiap-lib-admin-ts.vercel.app/](https://fiap-lib-admin-ts.vercel.app/)

## API Documentation

### Get Books

**Endpoint:** `/api/getBooks`

**Method:** `GET`

**Description:** This endpoint retrieves all books from the database.

**Response:** An array of book objects. Each object contains the following properties:

- `id`: The unique identifier of the book.
- `title`: The title of the book.
- `author`: The author of the book.
- `isbn`: The ISBN of the book.
- `year`: The publication year of the book.
- `publisher`: The publisher of the book.

**Error Response:** If an error occurs, the response will be an object with a body property containing the error.

### Patch Book

**Endpoint:** `/api/patchBook`

**Method:** `PATCH`

**Description:** This endpoint updates a book in the database.

**Request Body:** An object containing the updated book properties. The object must include the `id` of the book to be updated. For example:

```json
{
  "id": "1",
  "title": "Updated Title",
  "author": "Updated Author",
  "isbn": "Updated ISBN",
  "year": 2022,
  "publisher": "Updated Publisher"
}
```

**Response:** A string indicating that the book was updated, along with the updated book object.

**Error Response:** If an error occurs, the response will be an object with a body property containing the error.

### Delete Book

**Endpoint:** `/api/deleteBook`

**Method:** `DELETE`

**Description:** This endpoint deletes a book from the database.

**Request Body:** An object containing the `id` of the book to be deleted. For example:

```json
{
  "id": "1"
}
```

**Response:** A string indicating that the book was deleted, along with the deleted book object.

**Error Response:** If an error occurs, the response will be an object with a body property containing the error.

### Post Book

**Endpoint:** `/api/postBook`

**Method:** `POST`

**Description:** This endpoint creates a new book in the database.

**Request Body:** An object containing the properties of the book to be created. For example:

```json
{
  "title": "New Title",
  "author": "New Author",
  "isbn": "New ISBN",
  "year": 2022,
  "publisher": "New Publisher"
}
```

**Response:** A string indicating that the book was created, along with the created book object.

**Error Response:** If an error occurs, the response will be an object with a body property containing the error.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```


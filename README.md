# Project Title

**Todo Web Application with server-side programming and RESTful services**

## Description


This project implements a web application for managing a to-do list. The front end is built using SvelteKit, providing a fast, reactive user experience with server-side rendering capabilities. The backend is developed with Express.js and offers a RESTful API with CRUD operations. The front end is designed to be responsive with a mobile-first approach. The application stores tasks in a relational database (SQLite), and it is hosted locally using the Node.js runtime environment.

## Interfaces

### Web Interface (SvelteKit)
A web-based UI for viewing, adding, updating, and removing to-dos.

### REST API (Express.js)
- **POST** `/todos`: Create a new todo
- **GET** `/todos`: Retrieve all todos
- **PUT** `/todos/:id`: Update a specific todo
- **DELETE** `/todos/:id`: Delete a specific todo
- **DELETE** `/todos`: Delete all todos
- **PATCH** `/todos/:id`: Toggle complete todo status

## Installation
git clone https://github.com/Maximummaggus/Todo-List-Fullstack-App.git
npm install express sqlite3 cors supertest

## Configuration
- Ensure that Node.js is installed (v18 or higher).
- The application uses SQLite for data persistence; no further   configuration is needed unless you choose to modify the database connection.

## Usage
Start the server:
node .\server.js

Start the frontend:
npm run build
npm run preview

## Testing
Unit tests for backend logic are provided using the Jest framework.
Run tests:
- npm test

## License
- no licenses required

## Authors
Christian Napoli
Simon Chhit
Marcus Becker






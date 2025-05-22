const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Tarea 1:
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books))
});

// Tarea 2:
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  if (!isbn) {
    return res.status(500).json({message: "ISBN requerido"});
  }

  const filtered_books = books[isbn]
  if (filtered_books) {
    return res.send(JSON.stringify(filtered_books))
  }
  else {
    return res.send("No hay libros asociados al ISBN")
  }
 });
  
// Tarea 3:
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author
  if (!author) {
    return res.status(500).json({message: "Autor requerido"});
  }

  const filtered_books = Object.values(books).filter(book => book.author === author)
  if (filtered_books.length > 0) {
    return res.send(JSON.stringify(filtered_books))
  }
  else {
    return res.send("No hay libros asociados al autor")
  }
});

// Tarea 4:
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  if (!title) {
    return res.status(500).json({message: "Título requerido"});
  }

  const filtered_books = Object.values(books).filter(book => book.title === title)
  if (filtered_books.length > 0) {
    return res.send(JSON.stringify(filtered_books))
  }
  else {
    return res.send("No hay libros asociados al título")
  }
});

// Tarea 5:
// Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  if (!isbn) {
    return res.status(500).json({message: "ISBN requerido"});
  }

  const filtered_books = books[isbn]
  if (filtered_books) {
    const reviews = Object.values(books)
    if (reviews.length > 0) {
        return res.send(JSON.stringify(filtered_books.reviews))
    }
    else {
        return res.send("No hay reseñas asociados al ISBN")
    }
  }
  else {
    return res.send("No hay libros asociados al ISBN")
  }
});

module.exports.general = public_users;

const express = require('express');
let books = require("./booksdb.js");
let userExists = require("./auth_users.js").userExists;
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Tarea 6:
public_users.post("/register", (req,res) => {
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    return res.status(500).json({message: "Usuario y contraseña requeridos"});
  }

  if (userExists(username)) {
    return res.status(500).json({message: "El nombre de usuario ya existe"});
  }

  users.push({
    "username": username,
    "password": password
  })
  return res.send("Usuario registrado con éxito")
});

// Tarea 1:
// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   return res.send(JSON.stringify(books))
// });

// Tarea 10:
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const getBooks = new Promise((resolve, reject) => {
    if (books) {
        resolve(books)
    }
    else {
        reject("No se encontraron libros")
    }
  })

  getBooks.then((books) => {
    res.send(JSON.stringify(books))
  }).catch((error) => {
    res.status(500).send(error)
  })
});

// Tarea 2:
// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   const isbn = req.params.isbn
//   if (!isbn) {
//     return res.status(500).json({message: "ISBN requerido"});
//   }

//   const filtered_books = books[isbn]
//   if (filtered_books) {
//     return res.send(JSON.stringify(filtered_books))
//   }
//   else {
//     return res.send("No hay libros asociados al ISBN")
//   }
// });

// Tarea 11:
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const getBooksByISBN = new Promise((resolve, reject) => {
    const isbn = req.params.isbn
    if (!isbn) {
        reject("ISBN requerido")
    }
    if (books) {
        const filtered_books = books[isbn]
        if (filtered_books) {
            resolve(filtered_books)
        }
        else {
            reject("No hay libros asociados al ISBN")
        }
    }
    else {
        reject("No se encontraron libros")
    }
  })

  getBooksByISBN.then((books) => {
    res.send(JSON.stringify(books))
  }).catch((error) => {
    res.status(500).send(error)
  })
});
  
// Tarea 3:
// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   const author = req.params.author
//   if (!author) {
//     return res.status(500).json({message: "Autor requerido"});
//   }

//   const filtered_books = Object.values(books).filter(book => book.author === author)
//   if (filtered_books.length > 0) {
//     return res.send(JSON.stringify(filtered_books))
//   }
//   else {
//     return res.send("No hay libros asociados al autor")
//   }
// });

// Tarea 12:
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const getBooksByAuthor = new Promise((resolve, reject) => {
        const author = req.params.author
        if (!author) {
            reject("Autor requerido")
        }
        if (books) {
            const filtered_books = Object.values(books).filter(book => book.author === author)
            if (filtered_books.length > 0) {
                resolve(filtered_books)
            }
            else {
                reject("No hay libros asociados al autor")
            }
        }
        else {
            reject("No se encontraron libros")
        }
    })
    
    getBooksByAuthor.then((books) => {
        res.send(JSON.stringify(books))
    }).catch((error) => {
        res.status(500).send(error)
    })
});

// Tarea 4:
// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   const title = req.params.title
//   if (!title) {
//     return res.status(500).json({message: "Título requerido"});
//   }

//   const filtered_books = Object.values(books).filter(book => book.title === title)
//   if (filtered_books.length > 0) {
//     return res.send(JSON.stringify(filtered_books))
//   }
//   else {
//     return res.send("No hay libros asociados al título")
//   }
// });

// Tarea 13:
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const getBooksByTitle = new Promise((resolve, reject) => {
        const title = req.params.title
        if (!title) {
           reject("Título requerido")
        }
        if (books) {
            const filtered_books = Object.values(books).filter(book => book.title === title)
            if (filtered_books.length > 0) {
                resolve(filtered_books)
            }
            else {
                reject("No hay libros asociados al título")
            }
        }
        else {
            reject("No se encontraron libros")
        }
    })
    
    getBooksByTitle.then((books) => {
        res.send(JSON.stringify(books))
    }).catch((error) => {
        res.status(500).send(error)
    })
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

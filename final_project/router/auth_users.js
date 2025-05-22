const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const userExists = (username) => {
    const filtered_users = Object.values(users).filter(user => user.username === username)
    return filtered_users.length > 0 ? true : false
}

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    const filtered_users = Object.values(users).filter(user => user.username === username && user.password === password)
    return filtered_users.length == 1 ? true : false
}

// Tarea 7:
//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    return res.status(400).json({message: "Usuario y contraseña requeridos"});
  }

  if (!authenticatedUser(username, password)) {
    return res.status(400).json({message: "Usuario o contraseña incorrectos"});
  }

  const token = jwt.sign({data: password}, "access", {expiresIn: 60 * 60})
  req.session.authorization = {
    token, username
  }

  return res.send("Usuario logueado con éxito")
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.userExists = userExists;
module.exports.isValid = isValid;
module.exports.users = users;

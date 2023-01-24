// consts to require use of installed software
const express = require('express');
const mysql = require('mysql2');

// set up port to run app in
const PORT = process.env.PORT || 3001;

// bring in express middleware
const app = express();
app.use(express.urlencoded ({extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  db.promise().query('SELECT * FROM department').then(([response]) => console.table(response))
  
// consts to require use of installed software
const express = require('express');
const mysql = require('mysql2');
const consoleTable = require('console.table')

// set up port to run app in
const PORT = process.env.PORT || 3001;

// bring in express middleware
const app = express();
app.use(express.urlencoded ({extended: false}));
app.use(express.json());
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// list of options for user to choose from
const questions = [{
    type: 'list',
    name: 'teamOptions',
    message: 'What would you like to do?',
    choices: [
        "View all employees",
        "Add Employee",
        "Update Employee Role",
        "View all Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit"
    ]
}];
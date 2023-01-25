const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { response } = require('express');

// list of options for user to choose from
const questions = [{
    type: 'list',
    name: 'teamOptions',
    message: 'What would you like to do?',
    choices: [
        "View all employees",
        "Add employee",
        "Update employee role",
        "View all roles",
        "Add role",
        "View all departments",
        "Add department",
        "Quit"
    ]
}];

function questionsPrompt() {
    inquirer.prompt(questions). then((answer) => {
        if (answer.teamOptions === "View all employees"){
            viewEmployees();
        } else if ( answer.teamOptions === "Add employee"){
            addEmployee();
        } else if ( answer.teamOptions === "Update employee role"){
            updateRole();
        } else if (answer.teamOptions === "View all roles"){
            viewRoles();
        } else if (answer.teamOptions === "Add role"){
            addRole();
        } else if (answer.teamOptions === "View all departments"){
            viewDepartments();
        } else if (answer.teamOptions === "Add department"){
            addDepartment();
        } else if (answer.teamOptions === "Quit"){
            //quit writeFile(team)
        }
    })
}

function viewEmployees()

function addEmployee()

function updateRole()

function viewRoles()

function addRole()

function viewDepartments()

function addDepartment()
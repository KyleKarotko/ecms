const inquirer = require('inquirer');
//const consoleTable = require('console.table');
const {response} = require('express');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

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
// function to ask user questions 
function questionsPrompt() {
    inquirer.prompt(questions). then((response) => {
        if (response.teamOptions === "View all employees"){
            viewEmployees();
        } else if ( response.teamOptions === "Add employee"){
            addEmployee();
        } else if (response.teamOptions === "Update employee role"){
            updateRole();
        } else if (response.teamOptions === "View all roles"){
            viewRoles();
        } else if (response.teamOptions === "Add role"){
            addRole();
        } else if (response.teamOptions === "View all departments"){
            viewDepartments();
        } else if (response.teamOptions === "Add department"){
            addDepartment();
        } else if (response.teamOptions === "Quit"){
            //quit writeFile(team)
        }
    })
}
// function to view employees from DB
function viewEmployees() {
    db.query("SELECT * FROM employee", (err, res) => {
        if (err){
            console.log(err);
        } console.table(res);
        questionsPrompt();
    })
}
// function to view roles from DB
function viewRoles() {
    db.query("SELECT * FROM roles", (err, res) => {
        if (err){
            console.log(err);
        } console.table(res);
        questionsPrompt();
    })
}
// function to view departments from DB
function viewDepartments() {
    db.query("SELECT * FROM department", (err, res) => {
        if (err){
            console.log(err);
        } console.table(res);
        questionsPrompt();
    })
}
// function to add employees to DB
function addEmployee() {
    db.query("SELECT id, title FROM roles", (err, res) => {
        if(err) {
            console.log(err);
        } 
        console.table(res);
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the empolyees first name?",
            },
            {   type: "input",
                name: "last_name",
                message: "What is the employees last name?",
            },
            {
                type: "list",
                name: "role_id",
                message: "What is the employees role?",
                choices: res.map(({id,title}) => ({value: id, name: title})),
            },
    ]).then((response) => {
        console.log(response);
        db.query("INSERT INTO employee SET ?", response, (err, res) => {
            if (err) {
                console.log(err);
            } console.log("Employee added");
            questionsPrompt()
        })
    })
    })
}
// function to update roles on DB
function updateRole() {
    db.query("SELECT id, first_name, last_name FROM employee", (err, res) => {
        if(err) {
            console.log(err);
        }
        console.log("Showing employees");
        console.table(res);
        inquirer.prompt ([{
            type: "list",
            name: "id",
            message: "Who's role would you like to update?",
            choices: res.map(({id, first_name, last_name}) => ({value:id , name:`${first_name} ${last_name}`}))
        },
    ]).then((response) => {
        let employeeID = response.id;
        db.query("SELECT id, title FROM roles", (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log("Showing roles");
            console.table(res);
            inquirer.prompt ([
                {
                    type:"list",
                    name: "role_id",
                    message: "Please select a role to update to",
                    choices: res.map(({id,title}) => ({value: id, name: title})),
                },
            ]).then((response) => {
                console.log(response);
                db.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role_id, employeeID], (err, res) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log("Role updated")
                    questionsPrompt();
                })
            })
        })
    })
    })
}
// function to add roles to employees in DB
function addRole() {
    db.query("SELECT department.id, department.name FROM department", (err, res) => {
        if (err) {
            console.log(err)
        }
        console.log("Available departments to chose from")
        console.table(res);
        let departmentID= res
        let ids = []
        departmentID.forEach((id) => {
            ids.push(id.id);
        })
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What role are you adding?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for said role?",
            },
            {
                type: "input",
                name: "department_id",
                message: "What department is this in?",
                choices: ids,
            },
        ]).then((response) => {
            console.log(response);
            db.query("INSERT INTO role SET ?", response, (err, res) => {
                if (err) {
                    console.log(err)
                }
                console.log("Done adding role")
                questionsPrompt();
            })
        })
    })
}
const addDprtmnt = [
    {
        type: "input",
        name: "department",
        message: "What department are you adding?",
    },
]
// function to add a department to DB
function addDepartment() {
    inquirer.prompt(addDprtmnt).then((response) => {
        console.log(response)
        db.query("INSERT INTO department (name) VALUES (?)", response.department, (err, res) => {
            if (err) {
                console.log(err)
            }
            console.log("Department has been added")
            questionsPrompt();
        })
    })
}

//Function to init app
questionsPrompt()
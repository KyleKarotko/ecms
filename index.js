const inquirer = require('inquirer');
//const consoleTable = require('console.table');
const {response} = require('express');
const mysql = require('mysql2');
const { appendFile } = require('fs');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
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

function questionsPrompt() {
    inquirer.prompt(questions). then((response) => {
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

function viewEmployees() {
    db.query("SELECT * FROM employee", (err, res) => {
        if (err){
            console.log(err);
        } console.table(res);
        questionsPrompt();
    })
}
function viewRoles() {
    db.query("SELECT * FROM roles", (err, res) => {
        if (err){
            console.log(err);
        } console.table(res);
        questionsPrompt();
    })
}
function viewDepartments() {
    db.query("SELECT * FROM department", (err, res) => {
        if (err){
            console.log(err);
        } console.table(res);
        questionsPrompt();
    })
}
function addEmployee() {
    db.query("SELECT role_id, title FROM role", (err, res) => {
        if(err) {
            console.log(err);
        } console.table(res);
        let roleId= res;
        let ids = [];
        roleId.foreach((id) => {
            ids.push(id.role_id)
        });
        inquirer.promt([
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
                choices: ids,
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

function updateRole() {
    db.query("SELECT employee_id, employee.first_name, employee.last_name FROM employees", (err, res) => {
        if(err) {
            console.log(err);
        }
        console.log("Showing employees");
        console.table(res);
        let ids = [];
        res.forEach((employee) => {
            ids.push(employee.id);
        });
        inquirer.prompt ([{
            type: "list",
            name: "id",
            message: "Who's role would you like to update?",
            choices: ids,
        },
    ]).then((response) => {
        let employeeID = response.id;
        db.query("SELECT role_id, tile FROM role", (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log("Showing roles");
            console.table(res);
            let roleID= res;
            let ids = [];
            roleID.forEach((id) => {
                ids.push(id.role_id)
            })
            inquirer.promt ([
                {
                    type:"list",
                    name: "role_id",
                    message: "Please select a role to update to",
                    choices: ids,
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
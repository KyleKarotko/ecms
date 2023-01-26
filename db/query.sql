SELECT * 
FROM department
ORDER BY name ASC


SELECT department_id, title, department.name AS name, salary
FROM role INNER JOIN department 
ON roles.department_id = department.id;


SELECT employee.id, employee.first_name, employee.last_name, roles.title AS title, 
department.name AS department, roles.salary AS salary, manager.first_name AS manager
FROM employee
LEFT JOIN role 
ON employee.roles_id = roles.roles_id
LEFT JOIN employee manager 
ON employee.manager_id = manager.id
LEFT JOIN department 
ON role.department_id = department.id;


INSERT INTO department (name)
VALUES (?)

INSERT INTO role (department_id, title, salary)
VALUES (?)


INSERT INTO employee(roles_id, first_name, last_name)
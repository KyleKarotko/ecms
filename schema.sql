DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL
);

CREATE TABLE employee (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
        manager_id INT,
        FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
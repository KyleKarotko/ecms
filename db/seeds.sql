INSERT INTO department (name)
VALUES
("Management"),
("Human Resources"),
("Development"),
("Sales");

INSERT INTO roles (department_id, title, salary)
VALUES
(1, "Manager", 100000),
(1, "Assistant Manager", 80000),
(2, "Human Resources Partner", 60000),
(2, "Human Resources Manager", 75000),
(3, "Junior Developer", 80000),
(3, "Senior Developer", 100000),
(4, "Salesperson", 70000),
(4, "Sales Lead", 73000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
( "Bob", "Evan", 1, NULL),
( "James", "Egor", 2, 1),
( "Jimmy", "Buffed", 3, 2),
( "Amy", "Reed", 4, 2),
( "Jennifer", "Rose", 5, 2),
( "Fred", "Krug", 6, 2),
( "Jason", "Crystal", 7, 2),
( "Michael", "Myer", 8, 2);
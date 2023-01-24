INSERT INTO department (name)
VALUES
("Management"),
("Human Resources"),
("Development"),
("Sales");

INSERT INTO role (department_id, title, salary)
VALUES
(1, "Manager", 100000),
(1, "Assistant Manager", 80000),
(2, "Human Resources Buisness Partner", 60000),
(2, "Human Resources Manager", 75000),
(3, "Junior Developer", 80000),
(3, "Senior Developer", 100000),
(4, "Salesperson", 70000),
(4, "Sales Lead", 73000);

INSERT INTO employee (department_id, first_name, last_name, manager)
VALUES
(1, "Bob", "Evan", NULL),
(1, "James", "Egor", "Bob Evan"),
(2, "Jimmy", "Buffed", "Jimmy Buffed"),
(2, "Amy", "Reed", NULL),
(3, "Jennifer", "Rose",  "Bob Evan"),
(3, "Fred", "Krug", "Bob Evan"),
(4, "Jason", "Crystal", "Bob Evan"),
(4, "Michael", "Myer", "Bob Evan");
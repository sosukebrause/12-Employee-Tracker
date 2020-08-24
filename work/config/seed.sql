DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  fName VARCHAR(40) NOT NULL,
  lName VARCHAR(40) NOT NULL,
  title VARCHAR(30),
  dept_id INT,
  role_id INT,
  PRIMARY KEY (id)
);
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
dept VARCHAR(50) NOT NULL,
manager VARCHAR(50),
PRIMARY KEY (id)
);
CREATE TABLE role (
id INT NOT NULL auto_increment,
title VARCHAR(30) NOT NULL,
salary DECIMAL(8,2) NOT NULL,
dept_id INT,
PRIMARY KEY (id)
);

INSERT INTO employee (fName, lName, role_id)
VALUES ("Sosuke", "Brause", 1), ("Janice", "Joplin", 2), ("Sten", "White", 2), ("Max", "Howard", 3), ("Jon", "Doe", 1);

INSERT INTO role (title, salary, dept_id)
VALUES ("Intern", 20000, 4), ("Sales Agent", 110000, 3), ("Software Engineer", 130000, 2), ("Accountant", 105000, 1); 

INSERT INTO department (dept, manager)
VALUES ("Accounting", "Jordan Belfort"), ("Engineering", "Steve Wozniak"), ("Sales", "Ed Croc"), ("Legal", "Johnny Cochrane"); 

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;


-- View employees by role
SELECT
    e.id id,
    e.fName,
    e.lName,
    CONCAT_WS(" ", e.fName, e.lName) full_name,
    role.id role_id,
    role.title,
    department.dept,
    role.salary
FROM
    employee e
LEFT JOIN role ON e.role_id = role.id
LEFT JOIN department ON role.dept_id = department.dept_id

ORDER BY e.id;

-- View employees by department
SELECT
    department.dept,
    role.dept_id,
    role.title,
	role.id RID,
    role.salary,
	employee.id EID
FROM
    employee
LEFT JOIN role ON 
employee.role_id = role.id
LEFT JOIN department ON 
department.id = role.dept_id
order by dept_id;

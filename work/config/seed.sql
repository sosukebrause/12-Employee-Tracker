INSERT INTO employee (fName, lName, role_id)
VALUES ("Sosuke", "Brause", 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Agent", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 1);

INSERT INTO department (name)
VALUE ("Accounting"); 
INSERT INTO department (name)
VALUE ("Engineering"); 
INSERT INTO department (name)
VALUE ("Sales"); 

SELECT * FROM employee;
SELECT * FROM role;
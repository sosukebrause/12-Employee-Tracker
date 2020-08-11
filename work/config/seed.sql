INSERT INTO employee (fName, lName, role_id)
VALUES ("Sosuke", "Brause", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Agent", 100000, 3), ("Software Engineer", 120000, 2), ("Accountant", 125000, 1); 


INSERT INTO department (name)
VALUES ("Accounting"), ("Engineering"), ("Sales"); 


SELECT * FROM employee;
SELECT * FROM role;
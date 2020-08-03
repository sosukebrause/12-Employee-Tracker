DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  fName VARCHAR(40) NOT NULL,
  lName VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
);




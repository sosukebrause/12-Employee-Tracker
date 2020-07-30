const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection.query("SELECT * FROM employees");
  }
  addEmployee(employee) {
    return this.connection.query("INSERT INTO employees SET ?", employee);
  }
}

module.exports = new DB(connection);

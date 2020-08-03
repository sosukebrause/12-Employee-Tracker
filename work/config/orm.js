const connection = require("./connection");

const viewEmployees = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM employee;`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const addEmployee = (employee) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO employees SET ?`, [employee], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({ msg: "successfully added employee" });
      }
    });
  });
};

module.exports = { viewEmployees, addEmployee };
// class DB {
//   constructor(connection) {
//     this.connection = connection;
//   }
//   findAllEmployees() {
//     return this.connection.query("SELECT * FROM employees");
//   }
//   addEmployee(employee) {
//     return this.connection.query("INSERT INTO employees SET ?", [{ employee }]);
//   }
// }

// module.exports = new DB(connection);

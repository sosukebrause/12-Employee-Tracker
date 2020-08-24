const connection = require("./connection");

const viewEmployees = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT
    e.id id,
    e.fName,
    e.lName,
    CONCAT_WS(" ", e.fName, e.lName) full_name,
    role.id role_id,
    role.title
FROM
    employee e
LEFT JOIN role ON e.role_id = role.id
ORDER BY e.id;`,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};
const viewRoles = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM role;`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const deleteEmployee = (empId) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM employee WHERE ?`, [{ id: empId }], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ msg: "Employee successfully removed" });
      }
    });
  });
};
const addEmployee = (employee) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO employee (fName, lName, role_id) VALUES (?, ?, ?)`;
    connection.query(
      query,
      [employee.fName, employee.lName, employee.role_ID],
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({ msg: "Employee successfully added" });
        }
      }
    );
  });
};

const updateEmployeeRole = (roleID, empID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE employee SET ? WHERE ?`,
      [{ role_id: roleID }, { id: empID }],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ msg: "Employee role updated" });
        }
      }
    );
  });
};

const positionByDept = () => {
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

module.exports = {
  viewEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployeeRole,
  viewRoles,
  positionByDept,
};
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

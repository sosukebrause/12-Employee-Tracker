const inquirer = require("inquirer-promise");
const connection = require("./config/connection");
let roles = [];
let employees = [];
let role_ID;
let employee_ID;
const {
  viewEmployees,
  employeeByDept,
  addEmployee,
  updateEmployeeRole,
} = require("./config/orm");

const directory = () => {
  inquirer
    .prompt({
      name: "directory",
      message: "What would you like to do?",
      type: "list",
      choices: [
        "View all employees",
        "View employees by department",
        "Add employee",
        "Update employee role",
      ],
    })
    .then((selection) => {
      switch (selection.directory) {
        case "Exit":
          connection.end();
          process.exit();
        case "View all employees":
          viewEmployees().then((res) => {
            console.table(res);
            directory();
          });
          break;
        case "Add employee":
          addEmployeePrompt().then((res) => {
            console.log(res);
            directory();
          });
          break;
        case "Update employee role":
          updateRolePrompt().then((res) => {
            console.log(res);
            directory();
          });
          break;
        case "View employees by deparment":
          employeeByDept().then((res) => {
            console.table(res);
            directory();
          });
        // default:
        // quit();
      }
    });
};
const updateRolePrompt = () => {
  employees = [];
  roles = [];
  return new Promise((resolve, reject) => {
    viewEmployees()
      .then((res) => {
        res.forEach((element) => {
          roles.push(element.title);
          employees.push(element.full_name);
        });
      })
      .then(() => {
        inquirer
          .prompt([
            {
              name: "employee",
              type: "list",
              message: "Select employee to update their role",
              choices: employees,
            },
            {
              name: "role",
              type: "list",
              message: "Select role to assign",
              choices: roles,
            },
          ])
          .then((inquireRes) => {
            viewEmployees()
              .then((data) => {
                data.forEach((element) => {
                  if (inquireRes.employee === element.full_name) {
                    employee_ID = element.id;
                  }
                  if (inquireRes.role === element.title) {
                    role_ID = element.role_id;
                  }
                });
              })
              .then(() => {
                updateEmployeeRole(role_ID, employee_ID).then((response) =>
                  resolve(response)
                );
              });
          });
      })
      .catch((err) => reject(err));
  });
};

const addEmployeePrompt = () => {
  employee = [];
  return new Promise((resolve, reject) => {
    viewEmployees()
      .then((res) => {
        res.forEach((element) => {
          employee.push(element.full_name);
        });
      })
      .then(() => {
        inquirer
          .prompt([
            {
              name: "fName",
              type: "input",
              message: "What is the first name?",
            },
            {
              name: "lName",
              type: "input",
              message: "What is the last name?",
            },
          ])
          .then((res) => {
            newEmployee = {
              fName: res.fName,
              lName: res.lName,
            };
            addEmployee(newEmployee).then((res) => resolve(res));
          });
      })
      .catch((err) => reject(err));
  });
};

// const quit = () => {
//   console.log("Goodbye");
//   process.exit();
// };

module.exports = directory;

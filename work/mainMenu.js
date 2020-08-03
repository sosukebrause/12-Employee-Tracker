const inquirer = require("inquirer-promise");
const { viewEmployees, addEmployee } = require("./config/orm");
const connection = require("./config/connection");

const directory = () => {
  inquirer
    .prompt({
      name: "directory",
      message: "What would you like to do?",
      type: "list",
      choices: ["View all employees", "Add employee"],
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
        // default:
        // quit();
      }
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

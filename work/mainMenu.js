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
            mainMenu();
          });
          break;
        case "Add employee":
          addEmployee().then((res) => {
            console.table(res);
            directory();
          });
          break;
        // default:
        // quit();
      }
    });
};

// const quit = () => {
//   console.log("Goodbye");
//   process.exit();
// };

module.exports = directory;

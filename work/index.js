const { prompt } = require("inquirer");
const DB = require("./db/orm");
const { inherits } = require("util");
const { async } = require("rxjs");
const db = require("./db/orm");
require("console.table");

init();

function init() {
  console.log("Employee Directory");
  loadMainPrompts();
}

async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "what would you like to do?",
      choices: [
        {
          name: "View all employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "ADD_EMPLOYEE":
      return addEmployee();
    default:
      return quit();
  }
  async function viewEmployees() {
    const employees = await db.findAllEmployees();
    console.table(employees);
    loadMainPrompts();
  }
  async function addEmployee() {
    const { employee } = await prompt([
      {
        name: "fName",
        message: "What is the first name",
      },
      {
        name: "lName",
        message: "What is the last name",
      },
    ]);
    await db.addEmployee(employee);

    viewEmployees();
    loadMainPrompts();
  }
  function quit() {
    console.log("goodbye");
    process.exit();
  }
}

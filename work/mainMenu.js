const inquirer = require("inquirer-promise");
const connection = require("./config/connection");
let roles = [];
let employees = [];
let role_ID;
let employee_ID;
const {
  viewEmployees,
  positionByDept,
  addEmployee,
  updateEmployeeRole,
  viewRoles,
  deleteEmployee,
} = require("./config/orm");

const directory = () => {
  inquirer
    .prompt({
      name: "directory",
      message: "What would you like to do?",
      type: "list",
      choices: [
        "View all employees",
        "View roles",
        "Remove employee",
        "View positions by department",
        "Add employee",
        "Update employee role",
        "Quit",
      ],
    })
    .then((selection) => {
      switch (selection.directory) {
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
        case "View roles":
          viewRoles().then((res) => {
            console.table(res);
            directory();
          });
          break;
        case "Update employee role":
          updateRolePrompt()
            .then(() => console.log("Updated employee role"))
            .then(() => directory());
          break;
        case "View positions by deparment":
          positionByDept().then((res) => {
            console.table(res);
            directory();
          });
          break;
        case "Remove employee":
          removeEmployee().then(() => {
            console.table();
            directory();
          });
          break;
        default:
        case "Quit":
          console.log("Goodbye!");
          connection.end();
          process.exit();
      }
    });
};

const removeEmployee = async () => {
  const employeeList = [];
  return new Promise((resolve, reject) => {
    viewEmployees()
      .then((employees) => {
        employees.forEach((element) => {
          employeeList.push(element.fName);
        });
      })
      .then(() => {
        inquirer
          .prompt([
            {
              name: "employee",
              type: "list",
              message: "Which employee you want to remove?",
              choices: employeeList,
            },
          ])
          .then((selected) => {
            viewEmployees()
              .then((data) => {
                data.forEach((obj) => {
                  if (selected.employee === obj.fName) {
                    toDelete = obj.id;
                  }
                });
              })
              .then(() => {
                console.log(toDelete);
                deleteEmployee(toDelete)
                  .then(() => viewEmployees())
                  .then((response) => console.table(response));
              })
              .then((res) => resolve(res));
          });
      });
  });
};

const updateRolePrompt = async () => {
  // Populate employees array
  let employeeNames = [];
  const employees = await viewEmployees();

  employees.forEach((element) => {
    employeeNames.push(element.full_name);
  });
  // Populate Roles array
  const roleTitles = [];
  const roles = await viewRoles();

  roles.forEach((role) => {
    roleTitles.push(role.title);
  });
  // Obtain employee name and action
  const selection = await inquirer
    .prompt([
      {
        name: "employee",
        type: "list",
        message: "Select employee to be updated",
        choices: employeeNames,
      },
      {
        name: "role",
        type: "list",
        message: "What would role would like to assign the employee?",
        choices: roleTitles,
      },
    ])
    .then((res) => {
      let roleID;
      let empID;
      viewEmployees().then((eData) => {
        eData.forEach((element) => {
          if (res.employee === element.full_name) {
            empID = element.id;
          }
          return empID;
        });

        viewRoles().then((rData) => {
          rData.forEach((role) => {
            if (role.title === res.role) {
              roleID = role.id;
            }
            return roleID;
          });
          updateEmployeeRole(roleID, empID);
        });
      });
    });
};

const addEmployeePrompt = async () => {
  // Step 1: Populate Roles Array
  const roleArray = await viewRoles();
  const roleTitleArray = [];

  for (var i = 0; i < roleArray.length; i++) {
    const role = roleArray[i];
    roleTitleArray.push(role.title);
  }
  // Step 2: prompt user for answers
  const answers = await inquirer.prompt([
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
    {
      name: "role",
      type: "list",
      message: "What is the role of the employee?",
      choices: roleTitleArray,
    },
    {
      name: "manager",
      type: "list",
      message: "Select who the manager will be",
      choices: [`Steve Wozniak`, `Johnny Cochrane`, `Jordan Belfort`],
    },
  ]);
  // Step 3: Add new Employee to DB
  const role = roleArray.find((role) => role.title == answers.role);
  const newEmployee = {
    fName: answers.fName,
    lName: answers.lName,
    role_ID: role.id,
  };

  await addEmployee(newEmployee);
};

module.exports = directory;

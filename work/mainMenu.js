const inquirer = require("inquirer-promise");
const connection = require("./config/connection");
let roles = [];
let employees = [];
let role_ID;
let employee_ID;
const {
  viewEmployees,
  // employeeByDept,
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
        // "View employees by department",
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
          updateRolePrompt().then((res) => {
            console.log(res);
            directory();
          });
          break;
        // case "View employees by deparment":
        //   employeeByDept().then((res) => {
        //     console.table(res);
        //     directory();
        //   });
        //   break;
        case "Remove employee":
          removeEmployee().then((res) => {
            console.log(res);
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
              });
            // .then(() => {
            //   deleteEmployee(employeeID).then((response) => {
            //     resolve(response);
            //   });
            // });
          });
      })
      .catch((err) => {
        if (err) {
          reject(err);
        }
      });
  });
};

const updateRolePrompt = async () => {
  let employeeNames = [];
  const employees = await viewEmployees();

  employees.forEach((element) => {
    employeeNames.push(element.full_name);
  });
  console.log(employeeNames);

  // Step 2: Populate Roles array
  const roleTitles = [];
  const roles = await viewRoles();

  roles.forEach((role) => {
    titleNames.push(role.title);
  });

  inquirer.prompt([
    {
      name: "employee",
      type: "list",
      message: "Which employee's role you want to update?",
      choices: employeeNames,
    },
    {
      name: "role",
      type: "list",
      message: "What is the new title of the employee?",
      choices: roleTitles,
    },
  ]);
};
// const updateRolePrompt = async () => {
//   let employeeNames = [];

//   return new Promise((resolve, reject) => {
//     viewEmployees()
//       .then((res) => {
//         res.forEach((element) => {
//           employeeNames.push(element.full_name);
//         });
//         console.log(employeeNames);
//       })

//         // Step 2: Populate Employee array
//   const employeeArray = await viewEmployees();

//       .then(() => {
//         inquirer.prompt([
//           {
//             name: "employee",
//             type: "list",
//             message: "Which employee's role you want to update?",
//             choices: employeeNames,
//           },
//         ]);
//       });
//   });
// };

const addEmployeePrompt = async () => {
  // Step 1: Populate Roles Array
  const roleArray = await viewRoles();
  const roleTitleArray = [];
  // for (const role of roleArray) {
  //   roleTitleArray.push(role.title);
  // }
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

// const quit = () => {
//   console.log("Goodbye");
//   process.exit();
// };

module.exports = directory;

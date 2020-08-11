const directory = require("./mainMenu");
const connection = require("./config/connection");
// const inquirer = require("inquirer");

connection.connect((err) => {
  if (err) throw err;
  directory();
});

// const example = () => {
//   inquirer
//     .prompt([
//       {
//         type: "expand",
//         name: "reptile",
//         message: "Which is better?",
//         choices: [
//           {
//             key: "a",
//             value: "alligator",
//           },
//           {
//             key: "c",
//             value: "crocodile",
//           },
//         ],
//       },
//     ])
//     .then((answers) => {
//       console.info("Answer:", answers.reptile);
//     })
//     .then(() => {
//       console.log("Process ended");
//       process.exit();
//     });
// };

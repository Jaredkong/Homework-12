'use strict';

const inquirer = require("inquirer");
const prompt = require ("./prompt");
const db = require ("./db/dbmethods");
const cTable = require(`console.table`);


function init(){
    console.log("Welcome to Employee Manager!")
    optionPrompt();
}
async function optionPrompt() {
    const answer = await inquirer.prompt(prompt.choice)

    switch(answer.choice){
        case 'VIEW_EMPLOYEES': return viewEmployees();
        case 'VIEW_DEPARTMENTS': return viewDepartments();
        case 'VIEW_ROLES': return viewRoles();
        case 'ADD_EMPLOYEE' : return addEmployee();
        case 'ADD_DEPARTMENT': return addDepartment();
        case 'ADD_ROLE': return addRole();
        case 'UPDATE_EMPLOYEE_ROLE': return updateRole();
        case 'EXIT': process.exit() ;
    }

}


// view functions
async function viewEmployees() {
    const res = await db.viewAllEmployees();
    console.table("", res);
    optionPrompt();
};

async function viewDepartments(){
    const res = await db.viewAllDepartments();
    console.table("", res);
    optionPrompt();
};

async function viewRoles() {
    const res = await db.viewAllRoles();
    console.table("", res);
    optionPrompt();
};
// Add functions
async function addEmployee() {
    const roles = await db.findRoles();
  
    const roleList = roles.map(record => {
      return record.title;
    });
  
    const employees = await db.findEmployee();
  
    const employeeList = employees.map(record => {
      return record.first_name.concat(" " + record.last_name);
    });
  
    employeeList.unshift("None");
  
    const answer = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices: roleList
      },
      {
        name: "manager",
        type: "list",
        message: "What is their manager's name?",
        choices: employeeList
      }
    ]);
  
    let managerId;
    if (answer.manager !== "None") {
      const managerRecord = employees.find(
        resultEntry =>
          answer.manager === resultEntry.first_name + " " + resultEntry.last_name
      );
  
      managerId = managerRecord.id;
    }
    const roleRecord = roles.find(
      resultEntry => resultEntry.title === answer.role
    );
    const roleId = roleRecord.id;
  
    await db.addEmployee(answer.firstName, answer.lastName, roleId, managerId);
  
    console.log(`Added ${answer.firstName} to the database.`);
    optionPrompt();
};
  
async function addDepartment() {
    const answer = await inquirer.prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?"
    });
  
    const res = await db.addDepartment(answer.department);
  
    console.log(`Added ${answer.department} to the the database.`);
    optionPrompt();
}

async function addRole() {
    const answer = await inquirer.prompt([
      {
        name: "role",
        type: "input",
        message: "What role would you like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for that role?"
      }
    ]);
  
    const res = await db.addRole(answer.role, answer.salary);
    console.log(`Added ${answer.role} to the the database.`);
    optionPrompt();

}
async function updateRole() {
    const employees = await db.findEmployee();
  
    const employeeList = employees.map(record => {
      return record.first_name.concat(" " + record.last_name);
    });
  
    const roles = await db.findRoles();
  
    const roleList = roles.map(record => {
      return record.title;
    });
  
    const answer = await inquirer.prompt([
      {
        name: "name",
        type: "list",
        message: "Which employee do you want to update?",
        choices: employeeList
      },
      {
        name: "role",
        type: "list",
        message: "What is the employee's updated role?",
        choices: roleList
      }
    ]);
  
    const employeeChoice = employees.find(
      resultEntry =>
        answer.name === resultEntry.first_name + " " + resultEntry.last_name
    );
  
    const employeeId = employeeChoice.id;
  
    const roleRecord = roles.find(
      resultEntry => resultEntry.title === answer.role
    );
    const roleId = roleRecord.id;
  
    await db.updateEmployeeRole(roleId, employeeId);
  
    console.log(
      `Updated ${answer.name}'s role in the database.`
    );
    optionPrompt();
};

init();
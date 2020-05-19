"use strict";

module.exports = {
    choice: [{
        type:'list',
        name:'choice',
        message:'What would you like to do?',
        choices: [
        {
            name:'View all employees',
            value:'VIEW_EMPLOYEES'
        },
        {
            name:'View all departments',
            value:'VIEW_DEPARTMENTS'
        },
        {
            name:'View all roles',
            value:'VIEW_ROLES',
        },
        {
            name:'Add an employee',
            value:'ADD_EMPLOYEE'
        },
        {
            name:'Add a role',
            value:'ADD_ROLE'
        },
        {
            name:'Add a department',
            value:'ADD_DEPARTMENT'
        },
        {
            name:'Update employee role',
            value:'UPDATE_EMPLOYEE_ROLE'
        },
        {
            name:'EXIT',
            value:'EXIT'
        }]
            
        
    }]
};
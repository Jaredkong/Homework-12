const connection = require ('./connection');

class DB {
    constructor(connection){
        this.connection = connection;
    }


    viewAllEmployees() {
        return this.connection.query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN role 
            ON employee.role_id = role.id
            LEFT JOIN department 
            ON role.department_id = department.id 
            LEFT JOIN employee manager 
            ON manager.id = employee.manager_id;
            `
        )
    };

    viewAllRoles() {
        return this.connection.query(
            `SELECT role.id, role.title, role.salary, department.name AS department
            FROM role 
            LEFT JOIN department
            ON role.department_id = department.id;`
        )
    };

    viewAllDepartments(){
        return this.connection.query(
            `SELECT * FROM department`
        )
    };

    addEmployee(first_name, last_name, role_id, manager_id) {
        return this.connection.query("INSERT INTO employee SET ?", {
          first_name: first_name,
          last_name: last_name,
          role_id: role_id,
          manager_id: manager_id
        });
    };

    addDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", {
          name: department
        });
    };

    addRole(role, salary) {
        return this.connection.query("INSERT INTO role SET ?", {
          title: role,
          salary: salary
        });
    };
    
    updateEmployeeRole(role_id, id) {
        return this.connection.query(
          `UPDATE employee
            SET role_id = ? 
            WHERE id = ?;`,
          [role_id, id]
        );
    };

    
    findEmployee() {
    return this.connection.query("SELECT id, first_name, last_name FROM employee");
    }

    findRoles() {
    return this.connection.query("SELECT id, title FROM role");
    }

}

module.exports = new DB(connection);
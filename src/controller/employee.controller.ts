import { insertEmployeeImpl } from "../serviceImpl/employees/insert-employee.impl";
import { Employee } from "../entity/Employee";
import { listEmployeeImpl } from "../serviceImpl/employees/list-employee.impl";
import { deleteEmployeeImpl } from "../serviceImpl/employees/delete-employee.impl";
import { updateEmployeeImpl } from "../serviceImpl/employees/update-employee.impl";
import { UpdateEmployeeT } from "../types/employee.type";

export const listEmployees = () => listEmployeeImpl();

export const insertEmployee = (employee: Employee) =>
  insertEmployeeImpl(employee);

export const deleteEmployee = (id: number) => deleteEmployeeImpl(id);

export const updateEmployee = (employee: UpdateEmployeeT) =>
  updateEmployeeImpl(employee);

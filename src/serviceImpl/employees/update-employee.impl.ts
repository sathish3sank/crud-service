import { getRepository, UpdateResult } from "typeorm";
import { Employee } from "../../entity/Employee";
import { UpdateEmployeeT } from "../../types/employee.type";

export const updateEmployeeImpl = (employee: UpdateEmployeeT) =>
  getRepository(Employee)
    .createQueryBuilder()
    .update(Employee)
    .set({ ...employee, updated_at: new Date() })
    .where("id = :id ", { id: employee.id })
    .execute()
    .then((res: UpdateResult) => ({
      success: true,
      error: false,
      message: "Employee updated successfully",
    }))
    .catch((err) => ({
      error: true,
      errorCode: "E000016",
      success: false,
      message: "Failed to update employee",
    }));

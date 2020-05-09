import { getRepository } from "typeorm";
import { Employee } from "../../entity/Employee";

export const listEmployeeImpl = () =>
  getRepository(Employee)
    .find()
    .then((repo: Employee[]) => ({
      employees: repo,
      success: true,
      error: false,
      message: "Employees fetched successfully",
    }))
    .catch((err) => ({
      error: true,
      success: false,
      errorCode: "E00001",
      errorMessage: "Cannot fetch employees list",
    }));

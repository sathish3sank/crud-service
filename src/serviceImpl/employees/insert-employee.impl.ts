import { getRepository, InsertResult } from "typeorm";
import { Employee } from "../../entity/Employee";
import { error } from "../../types/error";

const errorMessageGenerator = (includes: string, error: string) =>
  error.toLowerCase().includes(includes.toLowerCase());

export const insertEmployeeImpl = (employee: Employee) => {
  return getRepository(Employee)
    .createQueryBuilder()
    .insert()
    .into(Employee)
    .values({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      designation: employee.designation,
      created_at: new Date(),
      updated_at: new Date(),
      isActive: true,
    })
    .execute()
    .then((res: InsertResult) => ({
      success: true,
      error: false,
      message: "Employee Inserted Successfully",
    }))
    .catch((err) => {
      let error: error = { error: true, success: false };
      if (err == "Email ID is not in expected format") {
        const error: error = {
          error: true,
          success: false,
          message: "Email ID is not in expected format",
          errorCode: "E000014",
        };
        return error;
      } else if (err.code == "ER_NO_DEFAULT_FOR_FIELD") {
        if (errorMessageGenerator("designation", err.sqlMessage)) {
          error = {
            ...error,
            message: "Designation cannot be empty",
            errorCode: "E000011",
          };
        } else if (errorMessageGenerator("firstName", err.sqlMessage)) {
          error = {
            ...error,
            message: "First Name cannot be empty",
            errorCode: "E000011",
          };
        } else if (errorMessageGenerator("lastName", err.sqlMessage)) {
          error = {
            ...error,
            message: "Last Name cannot be empty",
            errorCode: "E000012",
          };
        } else if (errorMessageGenerator("email", err.sqlMessage)) {
          error = {
            ...error,
            message: "Email ID cannot be empty",
            errorCode: "E000013",
          };
        }
      }
      console.log("Insert Employeee ::::::::", err);
      return error;
    });
};

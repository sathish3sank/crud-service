import express from "express";
import {
  listEmployees,
  insertEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/employee.controller";
import { Employee } from "../entity/Employee";
import { error } from "../types/error";
import { DeleteEmployeeT, UpdateEmployeeT } from "../types/employee.type";

export const employee = express.Router();

const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

employee.get("/list", (req, res, err) => {
  console.log("List employee fired..");
  return listEmployees()
    .then((list) => {
      res.statusCode = 200;
      res.statusMessage = "Success";
      return res.json({
        ...list,
      });
    })
    .catch((err) => {
      console.log("Error in list employee : ", err);
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      return res.json({ ...err });
    });
});

employee.post("/insert", (req, res, err) => {
  const employee: Employee = req.body;

  if (!employee.email.match(regex)) {
    res.statusCode = 301;
    res.statusMessage = "Email ID not in expected format";
    const error: error = {
      error: true,
      success: false,
      errorCode: "E000015",
      message: "Email ID not in expected format",
    };
    return res.json({ ...error });
  }
  return insertEmployee(employee)
    .then((insert) => {
      res.statusCode = 200;
      res.statusMessage = "Success";
      return res.json({
        ...insert,
      });
    })
    .catch((err) => {
      console.log("Error in insert employee : ", err);
      res.statusCode = 404;
      res.statusMessage = "Failed to insert employee";
      return res.json({ ...err });
    });
});

employee.post("/update", async (req, res, err) => {
  const employee: UpdateEmployeeT = req.body;

  if (employee.email) {
    if (!employee.email.match(regex)) {
      res.statusCode = 301;
      res.statusMessage = "Email ID not in expected format";
      const error: error = {
        error: true,
        success: false,
        errorCode: "E000015",
        message: "Email ID not in expected format",
      };
      return res.json({ ...error });
    }
  }
  return updateEmployee(employee)
    .then((resp) => {
      res.statusCode = 200;
      res.statusMessage = "Success";
      return res.json({ ...resp });
    })
    .catch((err) => {
      res.statusMessage = "Failed";
      res.statusCode = 304;
      return res.json({ ...err });
    });
});

employee.delete("/delete", (req, res, err) => {
  const employee: DeleteEmployeeT = req.body;
  return deleteEmployee(employee.id)
    .then((del) => {
      res.statusCode = 200;
      res.statusMessage = "Success";
      return res.json({
        ...del,
      });
    })
    .catch((err) => {
      res.statusCode = 400;
      res.statusMessage = "Failed to delete the employee";
      return res.json({ ...err });
    });
});

import { getRepository, DeleteResult } from "typeorm";
import { Employee } from "../../entity/Employee";
//import { error } from "../../types/error";

export const deleteEmployeeImpl = (id: number) =>
  getRepository(Employee)
    .createQueryBuilder()
    .delete()
    .from(Employee)
    .where("id = :id", { id: id })
    .execute()
    .then((res: DeleteResult) => ({
      success: true,
      error: false,
      message: "Employee deleted successfully",
    }))
    .catch((err) => {
      console.log(err);
    });

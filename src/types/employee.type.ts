export interface EmployeeT {
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
  isActive?: boolean;
}

export interface DeleteEmployeeT {
  id: number;
}

export interface UpdateEmployeeT {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  designation?: string;
}

export interface Employee {
  id: number;
  employee_name: string;
  email: string;
  age: number;
  birth_date: string;
  phone_number: string;
  gender: string;
  created_at: string;
  studies: []; // Update this type as needed
  role: string;
  type: string;
  employee_id: number;
  username: string;
}

export type EmployeeType = Employee | null;

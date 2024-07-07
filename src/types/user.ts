interface User {
  age: number;
  birth_date: string;
  created_at: string;
  email: string;
  employee_id: number;
  employee_name: string;
  gender: string;
  id: number;
  phone_number: string | null;
  role: string;
  type: string;
  username: string;
}

// Allow UserType to be null
export type UserType = User | null;

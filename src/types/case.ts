interface Patient {
  patient_name: string;
  age: number;
  email: string;
  birth_date: string;
  created_at: string;
  gender: string;
  phone_number: string;
  employee_id: number;
  id: number;
  studies: any[]; // Adjust type based on the actual structure of studies
}

interface Case {
  study_name: string;
  status: string;
  notes: string;
  last_view_at: string;
  last_edited_at: string;
  updated_at: string;
  created_at: string;
  xray_path: string;
  xray_type: string;
  severity: number;
  is_archived: boolean;
  patient_id: number;
  doctor_id: number;
  employee_id: number;
  patient: Patient;
  id: number;
}



// Allow Case to be null
export type CaseType = Case | null;

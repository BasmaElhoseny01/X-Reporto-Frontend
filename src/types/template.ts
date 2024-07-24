export interface Template {
  template_name: string;
  template_path: string;
  doctor_id: number;
  last_view_at: string; // Assuming this is a date string in ISO format
  last_edited_at: string; // Assuming this is a date string in ISO format
  id: number;
  used_count: number;
  created_at: string; // Assuming this is a date string in ISO format
}

export type TemplateType = Template | null;

export type ActivityType =
  | "view"
  | "edit"
  | "submit"
  | "archive"
  | "unarchive"
  | "assign"
  | "unassign"
  | "delete"
  | "create";

export interface Activity {
  activity_type: ActivityType;

  created_at: string;
  study_id: number;
  employee_id: number;
  id: number;
}

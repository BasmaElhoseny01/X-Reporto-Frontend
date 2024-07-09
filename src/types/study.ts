import { Patient } from "./patient";
interface Result {
  result_name: "string";
  type: "custom";
  confidence: [];
  labels: [0];
  last_view_at: "2024-07-08T23:50:15.077012";
  last_edited_at: "2024-07-08T23:50:15.077012";
  created_at: "2024-07-08T23:50:15.077012";
  study_id: 0;
  id: 0;
  xray_path: "string";
  region_path: "string";
  heatmap_path: "string";
  report_path: "string";
}

// Allow Case to be null
export type ResultType = Result | null;

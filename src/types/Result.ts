interface Result {
  result_name: string;
  type: string;
  confidence: number[];
  labels: number[];
  last_view_at: string;
  last_edited_at: string;
  created_at: string;
  study_id: number;
  id: number;
  xray_path: string;
  region_path: string;
  heatmap_path: string;
  report_path: string;
  region_sentence_path: string;
}

// Allow Result to be null
export type ResultType = Result | null;

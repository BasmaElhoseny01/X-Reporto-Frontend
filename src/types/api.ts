export const baseUrl = 'http://127.0.0.1:17968/api/v1/';
export const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InplaW5hYiIsInJvbGUiOiJhZG1pbiIsImlkIjo0LCJ0eXBlIjoiZW1wbG95ZWUiLCJleHAiOjE3MjIxMTc5NDV9.micpcnOq521mzwyPhiiyTyp7VL8lKLeN4l26nY7anQI';
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
/* eslint-disable */
import { message } from "antd";
import axios from "../../../../services/apiService";
import { ResultType } from "../../../../types/Result";

const runLLM = async (case_id: number, token: string) => {
  try {
    const response = await axios.post(
      `api/v1/studies/${case_id}/run_llm`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error generating Report: ", error);
    return null;
  }
};

const checkResultStatus = async (
  result_id: number,
  token: string
): Promise<ResultType | null> => {
  console.log("Checking report status... result_id", result_id);
  try {
    const response = await axios.get(`/api/v1/results/${result_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.report_path) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("Error checking report status: ", error);
    return null;
  }
};

const pollResultStatus = async (
  result_id: number,
  token: string,
  setLmResultData: (data: ResultType) => void,
  setUseAI: (data: boolean) => void
) => {
  const interval = 5000; // Poll every 5 seconds
  const maxAttempts = 20; // Maximum number of attempts before giving up
  let attempts = 0;

  const hide = message.loading("Generating report...", 0); // Display loading message with spinner

  const poll = async () => {
    if (attempts < maxAttempts) {
      try {
        const result = await checkResultStatus(result_id, token);
        console.log("Report status:", result);
        if (result) {
          hide(); // Close loading message
          message.success("Report is ready!");
          setLmResultData(result);
          setUseAI(true);
          // Handle the ready report (e.g., download it, display it, etc.)
          console.log("Report is ready:", result);
        } else {
          attempts++;
          setTimeout(poll, interval);
        }
      } catch (error) {
        console.error("Error checking report status:", error);
        hide(); // Close loading message
        message.error("Failed to check report status");
      }
    } else {
      hide(); // Close loading message
      message.error("Report generation timed out");
    }
  };

  poll();
};

export const GenerateReport = async (
  case_id: number | null,
  token: string,
  setLmResultData: (data: ResultType) => void,
  setUseAI: (data: boolean) => void
) => {
  try {
    if (!case_id) {
      throw new Error("Case ID is null");
    }
    console.log("Generating report for case_id: ", case_id);
    const reportResponse = await runLLM(case_id, token);
    if (!reportResponse) throw new Error("Failed to generate report");

    message.success("Report generation started successfully!");
    // Polling the report status
    pollResultStatus(reportResponse.id, token, setLmResultData, setUseAI);
  } catch (error) {
    console.error("Error in GenerateReport():", error);
    message.error("Failed to generate report");
  }
};

// Submitting Custom Results
export const createCustomResult = async (
  study_id: number,
  xray_path: string | null,
  token: string
): Promise<ResultType | null> => {
  try {
    const response = await axios.post(
      `api/v1/results`,
      {
        result_name: "Custom Result",
        type: "custom",
        xray_path: xray_path,
        study_id: study_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
          "Content-Type": "application/json", // Optional: Include if required by your API
        },
      }
    );
    // console.log("Custom Result Created: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating custom result: ", error);
    return null;
  }
};

export const updateCustomResult = async (
  // study_id: number,
  result_id: number,
  new_xray_path: string | null,
  token: string
): Promise<ResultType | null> => {
  try {
    const response = await axios.put(
      `api/v1/results/${result_id}`,
      {
        xray_path: new_xray_path,
        // study_id: study_id, // Add study_id to the request body
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
          "Content-Type": "application/json", // Optional: Include if required by your API
        },
      }
    );
    console.log("Custom Result Updated: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating custom result (xray_path): ", error);
    return null;
  }
};

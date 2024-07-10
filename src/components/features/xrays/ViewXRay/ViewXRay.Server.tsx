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

const pollResultStatus = async (result_id: number, token: string) => {
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
          // setLmResultData(result);
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

export const GenerateReport = async (case_id: number | null, token: string) => {
  try {
    if (!case_id) {
      throw new Error("Case ID is null");
    }
    console.log("Generating report for case_id: ", case_id);
    const reportResponse = await runLLM(case_id, token);
    if (!reportResponse) throw new Error("Failed to generate report");

    message.success("Report generation started successfully!");
    // Polling the report status
    pollResultStatus(reportResponse.id, token);
  } catch (error) {
    console.error("Error in GenerateReport():", error);
    message.error("Failed to generate report");
  }
};

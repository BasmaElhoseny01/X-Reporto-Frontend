/*eslint-disable */
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Typography, message, Spin } from "antd";
const { Title } = Typography;
import {
  ReportHeader,
  ButtonContainer,
  ReportEditor,
  // ReportDiv,
  LoadingContainer,
  ReportSectionContainer,
} from "./ReportSection.Styles";
import LineHeader from "../../../../common/LineHeader/LineHeader";
import SelectionTemplate, {
  defaultTemplate,
} from "../../../../common/SelectionTemplate/SelectionTemplate";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state/Reducers";
import axios from "../../../../../services/apiService";
import { ResultType } from "../../../../../types/Result";
import { GenerateReport } from "../ViewXRay.Server";

// Interfaces
interface ReportSectionProps {
  // Props Here
  useAI: boolean;
  toggleUseAI: () => void;
  bot_img_blue: string;
  bot_img_grey: string;

  llmResultData: ResultType;
  customResultData: ResultType;
  originalXRayPath: string | null;
  case_id: number | null;

  setLmResultData: (data: ResultType) => void;
}

// Server Fetch
const downloadReportFile = async (file_path: string, token: string) => {
  try {
    const response = await axios.get(`api/v1/results/download_file`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        file_path: file_path,
      },
      responseType: "text",
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching Report: ", error);
    return null;
  }
};
// Server Fetch
const uploadReportFile = async (
  text: string,
  resultId: string | number,
  token: string
) => {
  try {
    const blob = new Blob([text], {
      type: "text/plain",
    });
    const formData = new FormData();
    formData.append("report", blob);
    const response = await axios.post(
      `api/v1/results/${resultId}/upload_report`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error uploading Report: ", error);
    return null;
  }
};

// const generateReport = async (case_id: number, token: string) => {
//   try {
//     const response = await axios.post(
//       `api/v1/studies/${case_id}/run_llm`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.log("Error generating Report: ", error);
//     return null;
//   }
// };

const createCustomResult = async (
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
    console.log("Custom Result Created: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating custom result: ", error);
    return null;
  }
};

function ReportSection(props: ReportSectionProps) {
  // Props
  const {
    useAI,
    toggleUseAI,
    bot_img_blue,
    bot_img_grey,
    llmResultData,
    customResultData,
    originalXRayPath,
    case_id,

    setLmResultData,
  } = props;

  const token = useSelector((state: MainState) => state.token);

  // const [xReportoResultId, setXReportoResultId] = useState<number>(0);

  // Text Editor
  const editor = useRef(null);
  const [content, setContent] = useState<string>(defaultTemplate); // Text Editor Content
  const [reportContent, setReportContent] = useState<string>(""); // Finding Report Content

  const [selectedValue, setSelectedValue] = useState<string>("-1");
  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));
  // const [resultId, setResultId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [reportNotExist, setReportNotExist] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);

  const handleSelectionChange = (value: string, labelValue: string): void => {
    setSelectedValue(labelValue);
    setContent(value);
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  useEffect(() => {
    // console.log("ReportSection.....", llmResultData, customResultData, useAI);
    // // Download the report content :D
    // const fetchData = async (reportPath: string) => {
    //   if (reportPath) {
    //     const reportResponse = await downloadReportFile(reportPath, token);
    //     // console.log("reportResponse: ", reportResponse);
    //     if (reportResponse) {
    //       setReportContent(reportResponse);
    //       setContent(
    //         content.replace(
    //           '<p id="findings"></p>',
    //           `<p id="findings">${reportResponse}</p>`
    //         )
    //       );
    //       message.success("Report loaded successfully!");
    //     }
    //   } else {
    //     message.error("Failed to load report");
    //   }
    // };
    // let reportPath: string | null = null;
    // if (useAI) {
    //   if (!llmResultData) {
    //     message.info("No AI results found for this case.");
    //     return;
    //   }
    //   reportPath = llmResultData.report_path;
    // } else {
    //   if (!customResultData) {
    //     message.info("No custom results found for this case.");
    //     return;
    //   }
    //   reportPath = customResultData.report_path;
    // }
    // fetchData(reportPath);
  }, []);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  // const handleGenerateReport = async () => {
  //   setLoading(true);
  //   try {
  //     console.log("idValue", studyCase?.id);
  //     const responseRequestReport = await axios.post(
  //       `api/v1/studies/${studyCase?.id}/run_llm`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log("LLM API response:", responseRequestReport.data);
  //     const requestId = responseRequestReport.data.id;
  //     // setResultId(requestId);
  //     setXReportoResultId(requestId);
  //     console.log("request id", responseRequestReport.data.id);

  //     message.success("Starting to generate report, please wait a minute...");

  //     await delay(60000);

  //     const responseRequestReportPath = await axios.get(
  //       `api/v1/results/${requestId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const reportPath = responseRequestReportPath.data.report_path;
  //     console.log("API response:", responseRequestReportPath.data.report_path);

  //     const responseGetReport = await axios.get(
  //       `api/v1/results/download_file`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: {
  //           file_path: reportPath,
  //         },
  //         responseType: "text",
  //       }
  //     );
  //     setReportContent(responseGetReport.data);
  //     setContent(
  //       content.replace(
  //         '<p id="findings"></p>',
  //         `<p id="findings">${responseGetReport.data}</p>`
  //       )
  //     );
  //     message.success("Report generated successfully!");
  //   } catch (error) {
  //     console.error("Error generating report:", error);
  //     message.error("Failed to generate report");
  //   } finally {
  //     setLoading(false);
  //     setVisible(false);
  //   }
  // };

  const handleSubmitReport = async () => {
    // console.log("reportContent", reportContent);

    // Create a new DOM parser
    const parser = new DOMParser();

    // Parse the HTML string into a document
    const doc = parser.parseFromString(content, "text/html");

    // Select the <p> element by its ID
    const findingsElement = doc.getElementById("findings");
    if (findingsElement) {
      // Get the text content inside the <p> element
      const findingsText = findingsElement.textContent;
      if (!findingsText) {
        message.error("Please fill in the findings section");
        return;
      }

      try {
        let result: ResultType | null = customResultData;
        if (!customResultData) {
          // Create New Custom Result
          console.log("Creating New Custom");
          if (case_id) {
            const response = await createCustomResult(
              case_id,
              llmResultData ? llmResultData.xray_path : originalXRayPath,
              token
            );
            console.log("Response: ", response);
            result = response;
          } else {
            throw new Error("Case ID is null");
          }
        }
        // Upload the report to the result
        console.log("Saving Result ......: ", result);
        if (result) {
          const uploadResponse = await uploadReportFile(
            findingsText,
            result.id,
            token
          );
          console.log("Upload Response: ", uploadResponse);
          if (uploadResponse) {
            message.success("Report submitted successfully!");
          }
        } else {
          throw new Error("Failed to create custom result");
        }
      } catch (error) {
        console.error("Error uploading report:", error);
        message.error("Failed to submit report");
      }
    } else {
      message.error("No Finding Section Found!");
    }
  };

  const checkResultStatus = async (
    result_id: number,
    token: string
  ): Promise<ResultType | null> => {
    console.log("Checking report status...");
    console.log("result_id", result_id);
    try {
      // Implement your API call to check the report status
      const response = await axios.get(`/api/v1/results/${result_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response: ", response.data);
      if (response.data.report_path) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.log("Error checking report status: ", error);
      return null;
    }
  };

  const pollReportStatus = async (result_id: number, token: string) => {
    const interval = 5000; // Poll every 5 seconds
    // const interval = 10; // Poll every 5 seconds
    const maxAttempts = 20; // Maximum number of attempts before giving up
    let attempts = 0;

    const poll = async () => {
      if (attempts < maxAttempts) {
        try {
          const result = await checkResultStatus(result_id, token);
          console.log("Report status:", result);
          if (result) {
            message.success("Report is ready!");
            console.log("Report is ready!", result);
            setLmResultData(result);
            // Handle the ready report (e.g., download it, display it, etc.)
          } else {
            attempts++;
            setTimeout(poll, interval);
            message.info("Checking report status...");
          }
        } catch (error) {
          console.error("Error checking report status:", error);
          message.error("Failed to check report status");
        }
      } else {
        message.error("Report generation timed out");
      }
    };

    poll();
  };

  // const handleGenerateReport = async () => {
  //   try {
  //     if (case_id) {
  //       const reportResponse = await generateReport(case_id, token);
  //       console.log("reportResponse", reportResponse);
  //       if (reportResponse) {
  //         message.success("Report generation started successfully!");
  //         pollReportStatus(reportResponse.id, token);
  //         // message.success("report generated successfully!");
  //       } else {
  //         message.error("Failed to generate report");
  //       }
  //     } else {
  //       throw new Error("Case ID is null");
  //     }
  //   } catch (error) {
  //     console.error("Error generating report:", error);
  //     message.error("Failed to generate report");
  //   }
  // };

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      ) : (
        <ReportSectionContainer>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={3}>Report</Title>
            <img
              src={useAI ? bot_img_blue : bot_img_grey}
              alt="Bot"
              style={{ width: 40, height: 40, cursor: "pointer" }}
              onClick={toggleUseAI}
            />
          </div>
          <LineHeader />
          <ReportEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
            onChange={handleContentChange}
          />
          <ButtonContainer>
            <PrimaryButton onClick={handleSubmitReport} size="large">
              Submit Report
            </PrimaryButton>
            {/* {llmResultData && llmResultData.report_path ? null : (
              <PrimaryButton onClick={handleGenerateReport} size="large">
                Generate Report
              </PrimaryButton>
            )} */}
            <PrimaryButton
              // onClick={() => GenerateReport(case_id, token)}
              size="large"
            >
              Generate Report
            </PrimaryButton>
          </ButtonContainer>

          {/* {reportNotExist ? (
            <ButtonContainer>
              <PrimaryButton
                onClick={handleSubmitReport}
                size="large"
                style={{ width: "13%" }}
              >
                Submit Report
              </PrimaryButton>
              {visible ? (
                <PrimaryButton
                  onClick={handleGenerateReport}
                  size="large"
                  style={{ width: "13%" }}
                >
                  Generate Report
                </PrimaryButton>
              ) : null}
            </ButtonContainer>
          ) : null} */}
        </ReportSectionContainer>
      )}
    </>
  );
}

export default ReportSection;

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
import {
  createCustomResult,
  GenerateReport,
  updateCustomResult,
} from "../ViewXRay.Server";

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

  xRayPath: string | null;
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

// const createCustomResult = async (
//   study_id: number,
//   xray_path: string | null,
//   token: string
// ): Promise<ResultType | null> => {
//   try {
//     const response = await axios.post(
//       `api/v1/results`,
//       {
//         result_name: "Custom Result",
//         type: "custom",
//         xray_path: xray_path,
//         study_id: study_id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the token in the headers
//           "Content-Type": "application/json", // Optional: Include if required by your API
//         },
//       }
//     );
//     console.log("Custom Result Created: ", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating custom result: ", error);
//     return null;
//   }
// };

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
    xRayPath,

    setLmResultData,
  } = props;

  const token = useSelector((state: MainState) => state.token);

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
    const fetchReportData = async () => {
      try {
        if (!reportPath) {
          message.error("Failed to load report");
          throw new Error("No Report Path Found");
        }

        // (1) Download the report content
        const reportResponse = await downloadReportFile(reportPath, token);
        if (!reportResponse) {
          message.error("Failed to load report");
          throw new Error("Failed to load report");
        }

        // parse the report content
        setReportContent(reportResponse);
        setContent(
          content.replace(
            '<p id="findings"></p>',
            `<p id="findings">${reportResponse}</p>`
          )
        );
        message.success("Report loaded successfully!");
      } catch (error) {
        console.log("Error in fetchReportData(): ", error);
      }
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
    };

    // Scenario(1) NoLLMResulT and NoCustomResult
    if (!llmResultData && !customResultData) {
      // console.log("No LLMResult and No CustomResult");
      return;
    }
    // Scenario(2) useAI = true and LLMResultData
    let reportPath: string | null = null;
    if (useAI) {
      if (!llmResultData) {
        message.info("No AI results found for this case.................. >>>");
        return;
      }
      reportPath = llmResultData.report_path;
    } else {
      if (!customResultData || !customResultData.report_path) {
        message.info("No custom (report) results found for this case");
        return;
      }
      reportPath = customResultData.report_path;
    }

    fetchReportData();
  }, [useAI, llmResultData, customResultData]);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmitReport = async () => {
    let findingsText: string | null = null;
    // (1) Check if the findings section is empty
    const parser = new DOMParser();
    // Parse the HTML string into a document
    const doc = parser.parseFromString(content, "text/html");
    // Select the <p> element by its ID
    const findingsElement = doc.getElementById("findings");
    if (findingsElement) {
      // Get the text content inside the <p> element
      findingsText = findingsElement.textContent;
      if (!findingsText) {
        message.error("Please fill in the findings section");
        return;
      }
    }
    try {
      let result: ResultType | null = customResultData;
      if (!result) {
        // Create New Custom Result
        console.log("Creating New Custom With image_path: ", xRayPath);
        if (!case_id) throw new Error("Case ID is null");

        const resultResponse = await createCustomResult(
          case_id,
          xRayPath,
          token
        );
        console.log("Result Response: ", resultResponse);
        if (!resultResponse) throw new Error("Failed to create custom result");
        result = resultResponse;
      }
      if (result.xray_path != xRayPath) {
        console.log("Updating XRay Path");
        console.log("Old XRay Path: ", result.xray_path);
        console.log("New XRay Path: ", xRayPath);
        console.log("Result ID: ", result.id);

        // need to update the xray path
        if (!case_id) throw new Error("Case ID is null");
        const updatedResult = await updateCustomResult(
          // case_id,
          result.id,
          xRayPath,
          token
        );

        console.log("updatedResult: ", updatedResult);
        if (!updatedResult) throw new Error("Failed to update custom result");
        result = updatedResult;
      } else {
        console.log("Same XRay Path");
      }

      //(2) Upload the report to the result
      console.log("Saving Custom Result ......: ", result);
      if (!findingsText) {
        message.error("Please fill in the findings section");
        return;
      }
      const uploadResponse = await uploadReportFile(
        findingsText,
        result.id,
        token
      );
      console.log("Upload Response: ", uploadResponse);

      message.success("Report saved successfully!");
    } catch (error) {
      message.error("Failed to submit report");
      console.log("Error in handleSubmitReport(): ", error);
    }
    // console.log("reportContent", reportContent);
    // Create a new DOM parser
    // const parser = new DOMParser();
    // // Parse the HTML string into a document
    // const doc = parser.parseFromString(content, "text/html");
    // // Select the <p> element by its ID
    // const findingsElement = doc.getElementById("findings");
    // if (findingsElement) {
    //   // Get the text content inside the <p> element
    //   const findingsText = findingsElement.textContent;
    //   if (!findingsText) {
    //     message.error("Please fill in the findings section");
    //     return;
    //   }
    // try {
    //     let result: ResultType | null = customResultData;
    //     if (!customResultData) {
    //       // Create New Custom Result
    //       console.log("Creating New Custom");
    //       if (case_id) {
    //         const response = await createCustomResult(
    //           case_id,
    //           llmResultData ? llmResultData.xray_path : originalXRayPath,
    //           token
    //         );
    //         console.log("Response: ", response);
    //         result = response;
    //       } else {
    //         throw new Error("Case ID is null");
    //       }
    //     }
    //     // Upload the report to the result
    //     console.log("Saving Result ......: ", result);
    //     if (result) {
    //       const uploadResponse = await uploadReportFile(
    //         findingsText,
    //         result.id,
    //         token
    //       );
    //       console.log("Upload Response: ", uploadResponse);
    //       if (uploadResponse) {
    //         message.success("Report submitted successfully!");
    //       }
    //     } else {
    //       throw new Error("Failed to create custom result");
    //     }
    //   } catch (error) {
    //     console.error("Error uploading report:", error);
    //     message.error("Failed to submit report");
    //   }
    // } else {
    //   message.error("No Finding Section Found!");
    // }
  };

  return (
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
          Save
        </PrimaryButton>
        {/* BackDoor for code :D  */}
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
    </ReportSectionContainer>
  );
}

export default ReportSection;

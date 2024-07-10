import React, { useState, useRef, useMemo, useEffect } from "react";

// services
import axios from "../../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state/Reducers";

// Antd Design
import { Typography, message } from "antd";
const { Title } = Typography;

// Styled Components
import {
  ButtonContainer,
  ReportEditor,
  ReportSectionContainer,
} from "./ReportSection.Styles";

// Components
import LineHeader from "../../../../common/LineHeader/LineHeader";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";

// ToDo Use SelectionTemplate
// import SelectionTemplate, {
//   defaultTemplate,
// } from "../../../../common/SelectionTemplate/SelectionTemplate";
import { defaultTemplate } from "../../../../common/SelectionTemplate/SelectionTemplate";

// Types
import { ResultType } from "../../../../../types/Result";

// Server Fetch
import {
  createCustomResult,
  GenerateReport,
  updateCustomResult,
} from "../ViewXRay.Server";

// Interfaces
interface ReportSectionProps {
  // Props Here
  useAI: boolean;
  setUseAI: (data: boolean) => void;
  toggleUseAI: () => void;
  botImgBlue: string;
  botImgGrey: string;

  llmResultData: ResultType;
  customResultData: ResultType;

  xRayPath: string | null;
  caseId: number | null;

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

function ReportSection(props: ReportSectionProps) {
  // Props
  const {
    useAI,
    setUseAI,
    toggleUseAI,
    botImgBlue,
    botImgGrey,
    llmResultData,
    customResultData,
    caseId,
    xRayPath,

    setLmResultData,
  } = props;

  const token = useSelector((state: MainState) => state.token);

  // Text Editor
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  // States
  const [content, setContent] = useState<string>(defaultTemplate); // Text Editor Content
  // const [reportContent, setReportContent] = useState<string>(""); // Finding Report Content
  // const [selectedValue, setSelectedValue] = useState<string>("-1");

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
        // setReportContent(reportResponse);
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
        if (!caseId) throw new Error("Case ID is null");

        const resultResponse = await createCustomResult(
          caseId,
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
        if (!caseId) throw new Error("Case ID is null");
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
          src={useAI ? botImgBlue : botImgGrey}
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
          onClick={() =>
            GenerateReport(caseId, token, setLmResultData, setUseAI)
          }
          size="large"
        >
          Generate Report
        </PrimaryButton>
      </ButtonContainer>
    </ReportSectionContainer>
  );
}

export default ReportSection;

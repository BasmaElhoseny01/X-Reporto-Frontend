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
} from "./ReportSection.Styles";
import LineHeader from "../../../../common/LineHeader/LineHeader";
import SelectionTemplate, {
  defaultTemplate,
} from "../../../../common/SelectionTemplate/SelectionTemplate";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state/Reducers";
import axios from "../../../../../services/apiService";
import { ResultType } from "../../../../../types/study";

// Interfaces
interface ReportSectionProps {
  // Props Here
  lmResultData: ResultType;
  // setLmResultData: (value: ResultType) => void;
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
  const { lmResultData } = props;
  // useEffect(() => {
  //   console.log("ReportSection.....");
  //   console.log("LM Result Data: ", props.lmResultData);
  // }, []);

  // const [xReportoResultId, setXReportoResultId] = useState<number>(0);

  // Text Editor Content
  const [content, setContent] = useState<string>(defaultTemplate); // Text Editor Content
  const [reportContent, setReportContent] = useState<string>(""); // Finding Report Content

  const [selectedValue, setSelectedValue] = useState<string>("-1");
  const editor = useRef(null);
  const token = useSelector((state: MainState) => state.token);
  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));
  // const [resultId, setResultId] = useState<number>(0);
  const studyCase = useSelector((state: MainState) => state.case);
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
    // Download the report content :D
    const fetchData = async () => {
      if (lmResultData?.report_path) {
        const reportResponse = await downloadReportFile(
          lmResultData.report_path,
          token
        );
        // console.log("reportResponse: ", reportResponse);
        if (reportResponse) {
          setReportContent(reportResponse);
          setContent(
            content.replace(
              '<p id="findings"></p>',
              `<p id="findings">${reportResponse}</p>`
            )
          );
          message.success("Report loaded successfully!");
        }
      } else {
        message.error("Failed to load report");
      }
    };

    fetchData();
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
    console.log("reportContent", reportContent);

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
        // Upload the report
        const uploadResponse = await uploadReportFile(findingsText, 5, token);
        if (uploadResponse) {
          message.success("Report submitted successfully!");
          // setReportNotExist(false);
        } else {
          message.error("Failed to submit report");
        }

        // console.log("findingsText", findingsText);

        const blob = new Blob([findingsText], {
          type: "text/plain",
        });
        const formData = new FormData();
        formData.append("report", blob);
        const responseUpload = await axios.post(
          // `api/v1/results/${resultId}/upload_report`,
          `api/v1/results/${5}/upload_report`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error uploading report:", error);
        message.error("Failed to submit report");
      }
    } else {
      message.error("Failed to submit report");
    }
  };

  // useEffect(() => {
  //   const fetchReportPath = async () => {
  //     if (studyCase?.id) {
  //       setLoading(true);
  //       try {
  //         console.log("path", `api/v1/studies/${studyCase.id}/results`);
  //         const responseRequestReportPath = await axios.get(
  //           `api/v1/studies/${studyCase.id}/results`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         console.log("API response:", responseRequestReportPath.data);
  //         const reportPaths = responseRequestReportPath.data;
  //         if (reportPaths.length > 0) {
  //           setReportNotExist(false);
  //           const reportPath = reportPaths[0];
  //           const responseGetReport = await axios.get(
  //             `api/v1/results/download_file`,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //               params: {
  //                 file_path: reportPath.report_path,
  //               },
  //               responseType: "text",
  //             }
  //           );
  //           setContent(
  //             content.replace(
  //               '<p id="findings"></p>',
  //               `<p id="findings">${responseGetReport.data}</p>`
  //             )
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Error fetching report path:", error);
  //         message.error("Failed to fetch report path");
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchReportPath();
  // }, [reportNotExist, studyCase?.id, token]);

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      ) : (
        <>
          <ReportHeader>
            <Title level={3}>Report</Title>
            {/* {reportNotExist ? (
              <SelectionTemplate
                selectedValue={selectedValue}
                handleSelectionChange={handleSelectionChange}
              />
            ) : null} */}
          </ReportHeader>
          <LineHeader />
          <ReportEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
            onChange={handleContentChange}
          />
          <ButtonContainer>
            <PrimaryButton
              onClick={handleSubmitReport}
              // onClick={() => console.log("Submit Report")}
              size="large"
            >
              Submit Report
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
        </>
      )}
    </>
  );
}

export default ReportSection;

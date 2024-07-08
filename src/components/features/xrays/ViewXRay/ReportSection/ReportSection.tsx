import React, { useState, useRef, useMemo, useEffect } from "react";
import { Typography, message, Spin } from 'antd';
const { Title } = Typography;
import { ReportHeader, ButtonContainer, ReportEditor, ReportDiv, LoadingContainer } from "./ReportSection.Styles";
import LineHeader from '../../../../common/LineHeader/LineHeader';
import SelectionTemplate, { defaultTemplate } from "../../../../common/SelectionTemplate/SelectionTemplate";
import PrimaryButton from '../../../../common/PrimaryButton/PrimaryButton';
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state/Reducers";
import axios from "../../../../../services/apiService";

function ReportSection() {
  const [selectedValue, setSelectedValue] = useState<string>("-1");
  const [content, setContent] = useState<string>(defaultTemplate);
  const editor = useRef(null);
  const token = useSelector((state: MainState) => state.token);
  const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
  const [resultId, setResultId] = useState<number>(0);
  const studyCase = useSelector((state: MainState) => state.case);
  const [loading, setLoading] = useState<boolean>(false);
  const [reportNotExist, setReportNotExist] = useState<boolean>(true);
  const [reportContent, setReportContent] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(true);

  const handleSelectionChange = (value: string, labelValue: string): void => {
    setSelectedValue(labelValue);
    setContent(value);
  };


  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typing...'
    }),
    []
  );

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      console.log("idValue", studyCase?.id);
      const responseRequestReport = await axios.post(
        `api/v1/studies/${studyCase?.id}/run_llm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API response:", responseRequestReport.data);
      const requestId = responseRequestReport.data.id;
      setResultId(requestId);
      console.log("request id", responseRequestReport.data.id);

      message.success("Starting to generate report, please wait a minute...");

      await delay(60000);

      const responseRequestReportPath = await axios.get(
        `api/v1/results/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const reportPath = responseRequestReportPath.data.report_path;
      console.log("API response:", responseRequestReportPath.data.report_path);

      const responseGetReport = await axios.get(
        `api/v1/results/download_file`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            file_path: reportPath,
          },
          responseType: 'text',
        },
      );
      setReportContent(responseGetReport.data);
      setContent(content.replace('<p id="findings"></p>', `<p id="findings">${responseGetReport.data}</p>`));
      message.success("Report generated successfully!");
    } catch (error) {
      console.error("Error generating report:", error);
      message.error("Failed to generate report");
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  const handleSubmitReport = async () => {
    const blob = new Blob([reportContent], {
      type: "text/plain",
    });

    const formData = new FormData();
    formData.append("report", blob);
    const responseUpload = await axios.post(
      `api/v1/results/${resultId}/upload_report`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Upload response:", responseUpload.data);
    message.success("X-Ray uploaded successfully");
    setReportNotExist(false);
  };


  useEffect(() => {
    const fetchReportPath = async () => {
      if (studyCase?.id) {
        setLoading(true);
        try {
          console.log("path", `api/v1/studies/${studyCase.id}/results`);
          const responseRequestReportPath = await axios.get(
            `api/v1/studies/${studyCase.id}/results`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("API response:", responseRequestReportPath.data);
          const reportPaths = responseRequestReportPath.data;
          if (reportPaths.length > 0) {
            setReportNotExist(false);
            const reportPath = reportPaths[0];
            const responseGetReport = await axios.get(
              `api/v1/results/download_file`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                params: {
                  file_path: reportPath.report_path,
                },
                responseType: 'text',
              },
            );
            setContent(content.replace('<p id="findings"></p>', `<p id="findings">${responseGetReport.data}</p>`));
          }
        } catch (error) {
          console.error("Error fetching report path:", error);
          message.error("Failed to fetch report path");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReportPath();
  }, [reportNotExist, studyCase?.id, token]);

  return (
    <ReportDiv>
      {loading ? (
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      ) : (
        <>
          <ReportHeader>
            <Title level={2} style={{ margin: "1%" }}>Report</Title>
            {reportNotExist ? (<SelectionTemplate
              selectedValue={selectedValue}
              handleSelectionChange={handleSelectionChange}
            />) : null}
          </ReportHeader>
          <LineHeader />
          <ReportEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={newContent => setContent(newContent)}
            onChange={handleContentChange}
          />
          {reportNotExist ? (
            <ButtonContainer>
              <PrimaryButton onClick={handleSubmitReport} size="large" style={{ width: '13%' }}>
                Submit Report
              </PrimaryButton>
              {visible ? (<PrimaryButton onClick={handleGenerateReport} size="large" style={{ width: '13%' }}>
                Generate Report
              </PrimaryButton>) : null}
            </ButtonContainer>
          ) : null}
        </>
      )}
    </ReportDiv>
  );
}

export default ReportSection;

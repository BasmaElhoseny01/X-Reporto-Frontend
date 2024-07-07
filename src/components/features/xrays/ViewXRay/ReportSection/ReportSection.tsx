import React, { useState, useRef, useMemo } from "react";
import { Typography, message } from 'antd';
const { Title } = Typography;
import { ReportHeader, ButtonContainer, ReportEditor, ReportDiv } from "./ReportSection.Styles";
import LineHeader from '../../../../common/LineHeader/LineHeader';
import SelectionTemplate, { defaultTemplate } from "../../../../common/SelectionTemplate/SelectionTemplate";
import SecondaryButton from '../../../../common/SecondaryButton/SecondaryButton';
import PrimaryButton from '../../../../common/PrimaryButton/PrimaryButton';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state/Reducers";
import axios from "../../../../../services/apiService";

function ReportSection() {
  const [selectedValue, setSelectedValue] = useState<string>("-1");
  const [content, setContent] = useState<string>(defaultTemplate);
  const editor = useRef(null);
  const token = useSelector((state: MainState) => state.token);
  const navigate = useNavigate(); // Initialize useNavigate hook
  // const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
  const [resultId, setResultId] = useState<number>(0);
   const studyCase = useSelector((state: MainState) =>state.case);

  const handleSelectionChange = (value: string, labelValue: string): void => {
    setSelectedValue(labelValue); // Update selected value
    setContent(value); // Update content with selected template value
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typing...'
    }),
    []
  );
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://api.example.com/findings'); // Replace with your API endpoint
  //       const findingsData = response.data.findings; // Adjust according to the API response structure
  //       const updatedContent = content.replace('<p id="findings"></p>', `<p id="findings">${findingsData}</p>`);
  //       setContent(updatedContent);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); // The empty dependency array ensures this runs only once after the initial render

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleGenerateReport = async () => {
    // Implement save as draft functionality
    console.log("idValue", studyCase?.id);
    const responseRequestReport = await axios.post(
      `api/v1/studies/${studyCase?.id}/run_llm`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );
    console.log("API response:", responseRequestReport.data);
    console.log("request id",responseRequestReport.data.id);
    message.success("Starting to generate report, please wait...");
    const requestId = responseRequestReport.data.id;
    setResultId(requestId);
    // await delay(60000);
    // const responseRequestReportPath = await axios.get(
    //   `api/v1/results/${requestId}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`, // Include the token in the headers
    //     },
    //   }
    // );
    // const reportPath = responseRequestReportPath.data.report_path;
    // console.log("API response:", responseRequestReportPath.data.report_path);
    // const responseGetReport = await axios.get(
    //   `api/v1/results/download_file`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`, // Include the token in the headers
    //     },
    //     params: {
    //       file_path: reportPath,
    //     },
    //     responseType: 'text',
    //   },
    // );
    // console.log("API response:", responseGetReport.data);
    // content.replace('<p id="findings"></p>', `<p id="findings">${responseGetReport.data}</p>`);
    // message.success("Report generated successfully!");
  };

  const handleSubmitReport = async () => {
    // Create a Blob from the .docx content
    const blob = new Blob([content], {
      type: "text/plain",
    });

    const formData = new FormData();
    formData.append("file", blob, `report_${studyCase?.id}.txt`);
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
    console.log("Updateload response:", responseUpload.data);
    // const response = await axios.put(
    //   `api/v1/studies/${studyId}`,
    //   {
    //     study_name: formValues.study_name,
    //     patient_id: formValues.patient_id,
    //     notes: formValues.notes,
    //     xray_path: responseUpload.data.xray_path,
    //     doctor_id: me.id,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`, // Include the token in the headers
    //       "Content-Type": "application/json", // Optional: Include if required by your API
    //     },
    //   }
    // );
    // console.log("Upload response:", response.data);
    message.success("X-Ray uploaded successfully");
    navigate("/reports"); // Replace with your actual route 
     };

  return (
    <ReportDiv>
      <ReportHeader>
        <Title level={2} style={{ margin: "1%" }}>Report</Title>
        <SelectionTemplate
          selectedValue={selectedValue}
          handleSelectionChange={handleSelectionChange}
        />
      </ReportHeader>
      <LineHeader />
      <ReportEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={handleContentChange}
      />
      <ButtonContainer>
        <PrimaryButton onClick={handleSubmitReport} size="large" style={{ width: '13%' }}>
          SubmitReport
        </PrimaryButton>
        <SecondaryButton onClick={handleGenerateReport} size="large" style={{ width: '13%' }}>
          GenerateReport
        </SecondaryButton>
      </ButtonContainer>
    </ReportDiv>
  );
}

export default ReportSection;

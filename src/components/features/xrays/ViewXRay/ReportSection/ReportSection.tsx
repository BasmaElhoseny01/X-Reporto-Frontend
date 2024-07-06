import React, { useState, useEffect, useRef, useMemo } from "react";
import { Typography } from "antd";
const { Title } = Typography;
import {
  ReportHeader,
  ButtonContainer,
  ReportEditor,
  ReportDiv,
} from "./ReportSection.Styles";
import LineHeader from "../../../../common/LineHeader/LineHeader";
import SelectionTemplate, {
  defaultTemplate,
} from "../../../../common/SelectionTemplate/SelectionTemplate";
import SecondaryButton from "../../../../common/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import axios from "axios";

function ReportSection() {
  const [selectedValue, setSelectedValue] = useState<string>("-1");
  const [content, setContent] = useState<string>(defaultTemplate);
  const editor = useRef(null);
  const handleSelectionChange = (value: string, labelValue: string): void => {
    setSelectedValue(labelValue); // Update selected value
    setContent(value); // Update content with selected template value
  };

  // Case
  // const study_case = useSelector((state: MainState) => state.case);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.example.com/findings"); // Replace with your API endpoint
        const findingsData = response.data.findings; // Adjust according to the API response structure
        const updatedContent = content.replace(
          '<p id="findings"></p>',
          `<p id="findings">${findingsData}</p>`
        );
        setContent(updatedContent);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs only once after the initial render

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSaveAsDraft = () => {
    // Implement save as draft functionality
  };

  const handleSubmitReport = () => {
    // Implement submit report functionality
  };
  return (
    <ReportDiv>
      <ReportHeader>
        <Title level={2} style={{ margin: "1%" }}>
          Report
        </Title>
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
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={handleContentChange}
      />
      <ButtonContainer>
        <PrimaryButton
          onClick={handleSubmitReport}
          size="large"
          style={{ width: "13%" }}
        >
          SubmitReport
        </PrimaryButton>
        <SecondaryButton
          onClick={handleSaveAsDraft}
          size="large"
          style={{ width: "13%" }}
        >
          SaveAsDraft
        </SecondaryButton>
      </ButtonContainer>
    </ReportDiv>
  );
}

export default ReportSection;

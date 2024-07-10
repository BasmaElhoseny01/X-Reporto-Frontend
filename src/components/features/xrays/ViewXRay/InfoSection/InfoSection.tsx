import React, { useEffect } from "react";

// Antd Design
import Title from "antd/es/typography/Title";

// Styled Components
import { InfoSectionContainer, LineHeader } from "./InfoSection.Styles";

// Components
import PatientData from "./PatientData";
import PatientHistory from "./PatientHistory/PatientHistory";

// Types
import { CaseType } from "../../../../../types/case";

// Interface for InfoSection
interface InfoSectionProps {
  // Props Here
  study_case: CaseType;
  useAI: boolean;
  toggleUseAI: () => void;
  bot_img_blue: string;
  bot_img_grey: string;
}

function InfoSection(props: InfoSectionProps) {
  // Props
  const { study_case, bot_img_blue, bot_img_grey, useAI, toggleUseAI } = props;

  // Get the Study Context
  useEffect(() => {
    console.log("InfoSection.....");
    console.log("Study Case: ", study_case);
  }, []);

  return (
    <InfoSectionContainer>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={4}>Info</Title>
        <img
          src={useAI ? bot_img_blue : bot_img_grey}
          alt="Bot"
          style={{ width: 40, height: 40, cursor: "pointer" }}
          onClick={toggleUseAI}
        />
      </div>

      <LineHeader />
      {study_case && (
        <PatientData
          name={study_case?.patient?.patient_name}
          age={study_case?.patient.age}
          dateOfBirth={study_case?.patient?.birth_date}
          gender={study_case?.patient?.gender}
          id={study_case?.patient?.id}
        />
      )}

      <Title level={4}>History</Title>
      <LineHeader />

      {study_case && <PatientHistory id={study_case.patient.id} />}
    </InfoSectionContainer>
  );
}

export default InfoSection;

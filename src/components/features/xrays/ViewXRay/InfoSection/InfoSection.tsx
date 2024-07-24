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
  studyCase: CaseType;
  useAI: boolean;
  toggleUseAI: () => void;
  botImgBlue: string;
  botImgGrey: string;
}

function InfoSection(props: InfoSectionProps) {
  // Props
  const { studyCase, botImgBlue, botImgGrey, useAI, toggleUseAI } = props;

  // Get the Study Context
  useEffect(() => {
    console.log("InfoSection.....");
    console.log("Study Case: ", studyCase);
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
          src={useAI ? botImgBlue : botImgGrey}
          alt="Bot"
          style={{ width: 40, height: 40, cursor: "pointer" }}
          onClick={toggleUseAI}
        />
      </div>

      <LineHeader />
      {studyCase && (
        <PatientData
          name={studyCase?.patient?.patient_name}
          age={studyCase?.patient.age}
          dateOfBirth={studyCase?.patient?.birth_date}
          gender={studyCase?.patient?.gender}
          id={studyCase?.patient?.id}
        />
      )}

      <Title level={4}>History</Title>
      <LineHeader />

      {studyCase && <PatientHistory id={studyCase.patient.id} />}
    </InfoSectionContainer>
  );
}

export default InfoSection;

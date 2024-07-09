/*eslint-disable */
import React, { useEffect, useState } from "react";
import {
  ActionsContainer,
  InfoSectionContainer,
  LineHeader,
  // Title,
} from "./InfoSection.Styles";
import PatientData from "./PatientData";
import PatientHistory from "./PatientHistory/PatientHistory";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import { useView } from "../ViewProvider";
import { MainState } from "../../../../../state";
import { useSelector } from "react-redux";
import { CaseType } from "../../../../../types/case";
import Title from "antd/es/typography/Title";

// Interface for InfoSection
interface InfoSectionProps {
  // Props Here
  study_case: CaseType;
}
function InfoSection(props: InfoSectionProps) {
  const { study_case } = props;
  // Context
  const { handleSetSiderType } = useView();

  // Get the Study Context
  useEffect(() => {
    console.log("InfoSection.....");
    console.log("Study Case: ", study_case);
  }, []);

  return (
    <InfoSectionContainer>
      <Title level={4}>Info</Title>
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

      {/* {study_case && <PatientHistory id={study_case.patient.id} />} */}

      {/* <PrimaryButton
        // style={{ margin: "10px 10px 0", padding: 5 }}
        onClick={() => handleSetSiderType("report")}
      >
        View Report
      </PrimaryButton> */}
      {/* <LineHeader />
      {study_case && <PatientHistory id={study_case.patient.id} />}
      <ActionsContainer> */}
      {/* <SecondaryButton style={{ margin: "10px 10px 0", padding: 5 }}>
          {" "}
          Save as draft{" "}
        </SecondaryButton> */}
      {/* <PrimaryButton
          style={{ margin: "10px 10px 0", padding: 5 }}
          onClick={() => handleSetSiderType("report")}
        >
          {" "}
          View Report{" "}
        </PrimaryButton> */}
      {/* </ActionsContainer> */}
    </InfoSectionContainer>
  );
}

export default InfoSection;

/*eslint-disable */
import React, { useEffect, useState } from "react";
import {
  ActionsContainer,
  InfoSectionContainer,
  LineHeader,
  Title,
} from "./InfoSection.Styles";
import InputRow from "./InputRow";
import PatientData from "./PatientData";
import PatientHistory from "./PatientHistory";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../common/SecondaryButton/SecondaryButton";
import { useView } from "../ViewProvider";
import axios from "../../../../../services/apiService";
import { MainState } from "../../../../../state";
import { useSelector } from "react-redux";


function InfoSection() {
  // Context
  const { handleSetSiderType } = useView();
  // const [data, setData] = useState<responseDataType>();
  const study_case = useSelector((state: MainState) => state.case);

  // Get the Study Context
  useEffect(() => {}, []);

  return (
    <InfoSectionContainer>
      <Title justify="flex-start">Findings</Title>
      <LineHeader />
      <InputRow />
      <Title justify="flex-start" style={{ marginTop: 5 }}>
        {" "}
        Info{" "}
      </Title>
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
      <Title justify="flex-start" style={{ marginTop: 5 }}>
        {" "}
        History{" "}
      </Title>
      <LineHeader />
      {study_case && <PatientHistory id={study_case.patient.id} />}
      <ActionsContainer>
        <SecondaryButton style={{ margin: "10px 10px 0", padding: 5 }}>
          {" "}
          Save as draft{" "}
        </SecondaryButton>
        <PrimaryButton
          style={{ margin: "10px 10px 0", padding: 5 }}
          onClick={() => handleSetSiderType("report")}
        >
          {" "}
          View Report{" "}
        </PrimaryButton>
      </ActionsContainer>
    </InfoSectionContainer>
  );
}

export default InfoSection;

import React from "react";
import { ActionsContainer, InfoSectionContainer, LineHeader, Title } from "./InfoSection.Styles";
import InputRow from "./InputRow";
import PatientData from "./PatientData";
import PatientHistory from "./PatientHistory";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../common/SecondaryButton/SecondaryButton";

function InfoSection() {
  return (
    <InfoSectionContainer>
      <Title justify="flex-start">
        Findings
      </Title>
      <LineHeader/>
      <InputRow />
      <Title justify="flex-start" style={{marginTop:5}}> Info </Title>
      <LineHeader />
      <PatientData />
      <Title justify="flex-start" style={{marginTop:5}}> History </Title>
      <LineHeader />
      <PatientHistory />
      <ActionsContainer>
        <SecondaryButton style={{margin:"10px 10px 0",padding:5}}> Save as draft </SecondaryButton>
        <PrimaryButton style={{margin:"10px 10px 0",padding:5}}> View Report </PrimaryButton>
      </ActionsContainer>
    </InfoSectionContainer>
  );
}

export default InfoSection;

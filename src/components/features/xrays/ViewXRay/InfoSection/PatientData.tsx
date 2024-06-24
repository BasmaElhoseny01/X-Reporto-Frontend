import React from "react";
import { InputRowContainer, InputText, InputTitle, PatientDataContainer } from "./InfoSection.Styles";
import { Flex } from "antd";

function PatientData() {

  return (
  <Flex vertical>
    <PatientDataContainer>
      <InputRowContainer>
        <InputTitle>Name</InputTitle>
        <InputText > Ahmed Hosny </InputText>
      </InputRowContainer>
      <InputRowContainer>
        <InputTitle>ID</InputTitle>
        <InputText > 11952463 </InputText>
      </InputRowContainer>
      <InputRowContainer>
        <InputTitle>Gender</InputTitle>
        <InputText > male </InputText>
      </InputRowContainer>
    </PatientDataContainer>
    <PatientDataContainer>
      <InputRowContainer>
        <InputTitle>Date of birth</InputTitle>
        <InputText > 4/8/2001 </InputText>
      </InputRowContainer>
      <InputRowContainer>
        <InputTitle>Age</InputTitle>
        <InputText > 23 </InputText>
      </InputRowContainer>
    </PatientDataContainer>
  </Flex>
  );
}

export default PatientData;

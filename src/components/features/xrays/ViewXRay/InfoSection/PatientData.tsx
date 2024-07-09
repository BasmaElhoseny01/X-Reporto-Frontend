import React from "react";
import {
  InputRowContainer,
  InputText,
  InputTitle,
  PatientDataContainer,
} from "./InfoSection.Styles";
import { Flex } from "antd";

type PatientDataProps = {
  name: string;
  id: number;
  gender: string;
  dateOfBirth: string;
  age: number;
};
function PatientData(props: PatientDataProps) {
  return (
    <Flex vertical>
      <PatientDataContainer>
        <InputRowContainer>
          <InputTitle>Name</InputTitle>
          <InputText> {props.name} </InputText>
        </InputRowContainer>
        <InputRowContainer>
          <InputTitle>ID</InputTitle>
          <InputText> {props.id} </InputText>
        </InputRowContainer>
        <InputRowContainer>
          <InputTitle>Gender</InputTitle>
          <InputText> {props.gender} </InputText>
        </InputRowContainer>
      </PatientDataContainer>
      <PatientDataContainer>
        <InputRowContainer>
          <InputTitle>Date of birth</InputTitle>
          <InputText> {props.dateOfBirth} </InputText>
        </InputRowContainer>
        <InputRowContainer>
          <InputTitle>Age</InputTitle>
          <InputText> {props.age} </InputText>
        </InputRowContainer>
      </PatientDataContainer>
    </Flex>
  );
}

export default PatientData;

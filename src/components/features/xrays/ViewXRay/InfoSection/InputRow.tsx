import React from "react";
import { InputContainer, Row, SubTitle } from "./InfoSection.Styles";
import { Progress } from "antd";

function InputRow() {
  return (
    <>
    <Row style={{marginTop:8}}>
      <InputContainer justify="flex-start" >
        <SubTitle > Atelectasis </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
      <InputContainer justify="flex-end" >
        <SubTitle > Cardiomegaly </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
    </Row>
    <Row>
      <InputContainer justify="flex-start">
        <SubTitle > Consolidation </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
      <InputContainer justify="flex-end">
        <SubTitle > Edema </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
    </Row>
    <Row>
      <InputContainer justify="flex-start">
        <SubTitle > Lung Lesion </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
      <InputContainer justify="flex-end">
        <SubTitle > Lung Opacity </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
    </Row>
    <Row>
      <InputContainer justify="flex-start">
        <SubTitle > No Finding </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
      <InputContainer justify="flex-end">
        <SubTitle > Pleural Effusion </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
    </Row>
    <Row>
      <InputContainer justify="flex-start">
        <SubTitle > Enlarged Cardi. </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
      <InputContainer justify="flex-end">
        <SubTitle > Fracture </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
    </Row>
    <Row>
      <InputContainer justify="flex-start">
        <SubTitle > Pleural Other </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
      <InputContainer justify="flex-end">
        <SubTitle > Pneumonia </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
    </Row>
    <Row>
      <InputContainer justify="flex-start">
        <SubTitle > Pneumothorax </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
      <InputContainer justify="flex-end">
        <SubTitle > Support Devices </SubTitle>
        <Progress percent={6} steps={25} size={[4,15]} strokeColor={"#1890FF"[6]} />
      </InputContainer>
    </Row>
  </>
  );
}

export default InputRow;

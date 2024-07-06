import React from "react";
import {
  ImageCaintainer,
  InputContainer,
  Row,
  SubTitle,
} from "./InfoSection.Styles";
import { Image, Progress } from "antd";

function InputRow() {
  // const study_case = useSelector((state: MainState) => state.case);

  return (
    <>
      <Row style={{ marginTop: 8 }}>
        <InputContainer justify="flex-start">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Atelectasis </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
        <InputContainer justify="flex-end">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Cardiomegaly </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
      </Row>
      <Row>
        <InputContainer justify="flex-start">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Consolidation </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
        <InputContainer justify="flex-end">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Edema </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
      </Row>
      <Row>
        <InputContainer justify="flex-start">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Lung Lesion </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
        <InputContainer justify="flex-end">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Lung Opacity </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
      </Row>
      <Row>
        <InputContainer justify="flex-start">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> No Finding </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
        <InputContainer justify="flex-end">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Pleural Effusion </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
      </Row>
      <Row>
        <InputContainer justify="flex-start">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Enlarged Cardi. </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
        <InputContainer justify="flex-end">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Fracture </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
      </Row>
      <Row>
        <InputContainer justify="flex-start">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Pleural Other </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
        <InputContainer justify="flex-end">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Pneumonia </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
      </Row>
      <Row>
        <InputContainer justify="flex-start">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Pneumothorax </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
        <InputContainer justify="flex-end">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={30}
              src={process.env.PUBLIC_URL + "/test.jpg"}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Support Devices </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={6}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
      </Row>
    </>
  );
}

export default InputRow;

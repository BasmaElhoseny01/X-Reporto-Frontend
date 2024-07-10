import React from "react";
import {
  ImageCaintainer,
  InputContainer,
  Row,
  SubTitle,
} from "./HeatMapSection.Styles";
import { Image, Progress } from "antd";

type InputRowProps={
  Atelectasis:string | null;
  Cardiomegaly:string | null;
  Edema:string | null;
  LungOpacity:string | null;
  NoFinding:string | null;
  PleuralEffusion:string | null;
  Pneumonia:string | null;
  SupportDevices:string | null;
  probabilities: number[] | null;
}

function InputRow(props: InputRowProps) {
  // const study_case = useSelector((state: MainState) => state.case);
  return (
    <>
      <Row style={{ marginTop: 8 }}>
        <InputContainer justify="flex-start">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={40}
              src={props?.Atelectasis??""}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Atelectasis </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={props?.probabilities?.[0] ? parseFloat((props.probabilities[0] * 100).toFixed(2)) : 0}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
        <InputContainer justify="flex-end">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={40}
              src={props?.Cardiomegaly ?? ""}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Cardiomegaly </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={props?.probabilities?.[1] ? parseFloat((props.probabilities[1] * 100).toFixed(2)) : 0}
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
              width={40}
              src={props?.Edema??""}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Edema </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={props?.probabilities?.[2] ? parseFloat((props.probabilities[2] * 100).toFixed(2)) : 0}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
        <InputContainer justify="flex-end">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={40}
              src={props?.LungOpacity??""}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Lung Opacity </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={props?.probabilities?.[3] ? parseFloat((props.probabilities[3] * 100).toFixed(2)) : 0}
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
              width={40}
              src={props?.NoFinding??""}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> No Finding </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={props?.probabilities?.[4] ? parseFloat((props.probabilities[4] * 100).toFixed(2)) : 0}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
        <InputContainer justify="flex-end">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={40}
              src={props?.PleuralEffusion??""}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Pleural Effusion </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={props?.probabilities?.[5] ? parseFloat((props.probabilities[5] * 100).toFixed(2)) : 0}
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
              width={40}
              src={props?.Pneumonia??""}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Pneumonia </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={props?.probabilities?.[6] ? parseFloat((props.probabilities[6] * 100).toFixed(2)) : 0}
            steps={25}
            size={[4, 15]}
            strokeColor={"#1890FF"[6]}
          />
        </InputContainer>
        <InputContainer justify="flex-end">
          <ImageCaintainer>
            {/* <Image width={40} src={process.env.REACT_APP_BASE_URL + "/download/" + props.xray_path} /> */}
            <Image
              width={40}
              src={props?.SupportDevices??""}
              style={{ paddingRight: 5 }}
            />
            <SubTitle> Support Devices </SubTitle>
          </ImageCaintainer>
          <Progress
            percent={props?.probabilities?.[7] ? parseFloat((props.probabilities[7] * 100).toFixed(2)) : 0}
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

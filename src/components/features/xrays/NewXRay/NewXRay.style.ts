import styled from "styled-components";
import { Row, Input, Form, Flex, Upload } from "antd";

const { TextArea } = Input;
const { Dragger } = Upload;

export const NewXRayContainer = styled(Flex)`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;

  height: 100%;
  /* flex: 1;
  height: 70vh;
  align-items: start;
  justify-content: start; */
`;

export const ButtonContainer = styled(Flex)`
  display: flex;
  flex-direction: row;

  justify-content: flex-end;

  flex: 1;
  width: 100%;

  & > * {
    margin: 0px 0px;
  }
`;

export const InputRow = styled(Row)`
  width: 100%;
  display: flex;
  border-radius: 1%;
`;

export const FormItem = styled(Form.Item)`
  margin-right: 30px;
`;
export const TextAreaRow = styled(TextArea)`
  width: 95%;
  border-radius: 1%;

  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* Track color */
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* Thumb color */
    border-radius: 3px; /* Rounded corners of the thumb */
  }
`;
export const NoteItem = styled(Form.Item)`
  width: 95vw;
`;
export const UploadRow = styled(Row)`
  width: 95%;
  display: flex;
  border-radius: 1%;
  /* height: 37vh; */
`;

export const UploadItem = styled(Form.Item)`
  width: 100%;
`;

export const SubmitContainer = styled(Flex)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
`;

export const FlexButton = styled(Flex)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;
export const StyledDragger = styled(Dragger)`
  display: flex;
  width: 100%;
  /* height: 30vh; */
  border-radius: 1%;
`;

import { palette } from "../../../../styles/theme";
import styled from "styled-components";
import {  Row, Input, Form ,Flex,Upload} from "antd";
const { TextArea } = Input;
const { Dragger } = Upload;

export const NewXRayContainer = styled(Flex)`
  display: flex;
  flex-direction: column;`;
export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
`;
export  const ButtonContainer = styled(Flex)`
display: flex;
flex-direction: row;

justify-content: flex-end;
// align-items: flex-end;

flex: 1;
width: 100%;

& > * {
  margin: 0px 10px;
}
`;

const LineHeader = styled.hr`
    border-top: 1px solid  ${palette.grey50};
    margin-right:2%;

`;
const InputRow = styled(Row)`
    width: 100%;
    display: flex;
    border-radius: 1%;
`;

const FormItem = styled(Form.Item)`
   margin-right: 30%;
`;
const TextAreaRow = styled(TextArea)`
    width: 95%;
    border-radius: 1%;
    // background-color: green;
`;
const NoteItem = styled(Form.Item)`
    width: 95vw;
`;
const UploadRow = styled(Row)`
    width: 95%;
    display: flex;
    border-radius: 1%;
`;
const UploadItem = styled(Form.Item)`
    width: 100%;
`;
const ButtonRow = styled(Row)`
    width: 40%;
    margin-left: 55%;
`;
const FlexButton = styled(Flex)`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
const StyledDragger = styled(Dragger)`
    display: flex;
    width: 100%;
    height: 35vh;
    border-radius: 1%;
`;
export { LineHeader, InputRow, FormItem, TextAreaRow, NoteItem, UploadRow, FlexButton, ButtonRow,UploadItem,StyledDragger};

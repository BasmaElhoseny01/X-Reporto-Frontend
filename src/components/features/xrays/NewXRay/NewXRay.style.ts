import { palette } from "../../../../styles/theme";
import styled from "styled-components";
import { Col, Row, Input, Form ,Flex,Upload} from "antd";
import Button from "antd-button-color";
const { TextArea } = Input;
const { Dragger } = Upload;

// const NewXRayDiv = styled.div`
//     // width: 100vw;
//     // height: 100vh;
// `;
const LineHeader = styled.hr`
    border-top: 1px solid  ${palette.grey50};
    margin-right:2%;

`;
const InputRow = styled(Row)`
    width: 100%;
    display: flex;
    border-radius: 1%;

`;
const InputCol = styled(Input)`
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
width: 100vw;
`;
const NoteCol = styled(Col)`
width: 95%;
`;
const UploadRow = styled(Row)`
    width: 100%;
    display: flex;
    border-radius: 1%;
    height: 50vh;
`;
const UploadItem = styled(Form.Item)`
    width: 100%;
    height: 50vh;
`;
const UploadCol = styled(Col)`
display: flex;
width: 95%;
height: 40vh;
`;
const ButtonRow = styled(Row)`
    width: 40%;
    margin-left: 55%;
`;
const ButtonCol = styled(Col)`
    width: 100%;
    display: flex;
    justify-content:end;
    margin-top: 10%;
`;
const FlexButton = styled(Flex)`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
const AddButton = styled(Button)`
width: 17%;
`;
const StyledDragger = styled(Dragger)`
    display: flex;
    width: 100%;
    height: 40vh;
    border-radius: 1%;
`;
export { LineHeader, InputRow, InputCol, FormItem, TextAreaRow, NoteItem, NoteCol, UploadRow, ButtonCol, AddButton, FlexButton, ButtonRow,UploadItem,UploadCol,StyledDragger};

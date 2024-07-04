import { Col,Row, Flex } from "antd";
import styled from "styled-components";
import JoditEditor from 'jodit-react';

export const ReportDiv = styled.div`
    // padding: 20px;
      height: 100%;
    overflow-y: scroll;
`;

export const TemplateDataCol = styled(Col)`
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-radius: 1%;
`;
export const TemplateDataRow = styled(Row)`
width: 30%;
    display: flex;
    justify-content: space-between;
`;

export const TemplateEditor = styled(Row)`
    display: flex;
    width: 10%;
    flex: 1;
    background-color: #f0f2f5;
`;

export const ButtonContainer = styled(Flex)`
    width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ReportEditor = styled(JoditEditor)`
height: 100%;
width: 80%;
`;

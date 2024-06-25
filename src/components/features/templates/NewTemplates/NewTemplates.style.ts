import { Row, Flex } from "antd";
import styled from "styled-components";
import JoditEditor from 'jodit-react';

export const ReportDiv = styled.div`
    padding: 20px;
`;

export const TemplateData = styled(Row)`
    display: flex;
    width: 65%;
    justify-content: space-between;
    border-radius: 1%;
`;

export const TemplateEditor = styled(Row)`
    display: flex;
    width: 65%;
    flex: 1;
    // height: 10;
`;

export const ButtonContainer = styled(Flex)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;
    width: 100%;
    margin-top: 15%;
    & > * {
        margin: 0px 1%;
    }
`;

export const ReportEditor = styled(JoditEditor)`
    // width: 100%;
    // background-color: #f0f2f5;
`;

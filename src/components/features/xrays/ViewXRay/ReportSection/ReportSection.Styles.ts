// import { palette } from "../../../styles/theme";
import { Row ,Flex} from "antd";
import styled from "styled-components";
import JoditEditor from 'jodit-react';

export const ReportDiv = styled.div`
    // display: flex;
`;
export const ReportHeader = styled(Row)`
    display: flex;
    justify-content: space-between;
`;
export const ButtonContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1; 
  width: 100%;

  & > * {
    margin: 0px 10px;
  }
`;
export const ReportEditor = styled(JoditEditor)`
    height: 50vh;
    `;
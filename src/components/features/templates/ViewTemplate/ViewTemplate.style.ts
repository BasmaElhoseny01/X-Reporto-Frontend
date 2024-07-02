
import styled from "styled-components";

// Ant Design
import { Flex } from "antd";
export const ButtonContainer = styled(Flex)`
  display: flex;
  flex-direction: row;

  justify-content: flex-end;
  align-items: flex-end;

  flex: 1; // To take up the remaining space :D
  /* height: 100%; */ // DON'T USE THIS

  width: 100%;

  & > * {
    margin: 0px 10px;
  }
`;
export const ViewTemplateContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;

//   // padding: 20px;
//   width: 100%;
//   height: 100vh;
      height: 100%;

overflow-y: scroll;


`;
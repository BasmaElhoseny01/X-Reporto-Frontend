import styled from "styled-components";

// Ant Design
import {Flex } from "antd";
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
export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;
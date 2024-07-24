import styled from "styled-components";

// Ant Design
import { Flex, Tabs } from "antd";
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

  height: 100%;
  width: 100%;
`;

export const StyledTabs = styled(Tabs)`
  height: 100%;

  & > .ant-tabs-bar {
    height: 100%;

    & > .ant-tabs-nav {
      height: 100%;

      /* & > .ant-tabs-content-holder {
        height: 100%;
        background-color: red;

        & > .ant-tabs-content {
          height: 100%;

          background-color: cyan;
        }
      } */
    }
    background-color: #aaa;
    /* margin-bottom: 0px; */
  }
`;

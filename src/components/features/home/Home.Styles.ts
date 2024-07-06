import styled from "styled-components";

// Theme
// import { palette } from "../../../../styles/theme";

// Ant Design
import { Flex } from "antd";

export const HomeContainer = styled(Flex)`
  /* background-color: aliceblue; */

  display: flex;
  flex-direction: column;

  height: 100%;
`;

export const HomeTopContainer = styled(Flex)`
  /* background-color: #aaa; */

  display: flex;
  flex-direction: row;

  height: 50%;
`;

export const HomeBottomContainer = styled(Flex)`
  /* background-color: #ccc; */
  display: flex;
  flex-direction: column;

  height: 50%;
  /* margin-top: -45px; */
`;

export const HomeTopLeftContainer = styled(Flex)`
  /* background-color: #abc; */

  display: flex;
  flex-direction: column;

  height: 100%;
`;

export const HomeTopRightContainer = styled(Flex)`
  /* background-color: #cab; */

  display: flex;
  flex-direction: column;

  height: 100%;
  width: 50%;

  z-index: 10;
`;
export const HomeTopTitleContainer = styled(Flex)`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const ActivityCardsContainer = styled(Flex)`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  justify-content: center;

  overflow-y: scroll;

  /* height: 80%; */
  width: 100%;

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
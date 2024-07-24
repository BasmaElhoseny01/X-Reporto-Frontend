import styled from "styled-components";

// Theme
// import { palette } from "../../../../styles/theme";

// Ant Design
import { Flex } from "antd";
import { palette } from "../../../../../styles/theme";

export const InfoSectionContainer = styled(Flex)`
  flex-direction: column;
  /* background-color: red; */

  /* Take Full Height (VIP) */
  width: 100%;
  height: 100%;
`;

export const LineHeader = styled.hr`
  border-top: 1px solid ${palette.grey50};
  width: 100%;
  margin-bottom: 5px;
  margin-left: 0px;
`;

export const Row = styled(Flex)`
  width: 100%;
  padding: 0px 0;
  align-items: center;
  justify-content: space-between;
`;

export const SubTitle = styled(Flex)`
  font-size: 15px;
  padding: 2px 0;
  margin: 0 15px 0 0;
`;
export const InputContainer = styled(Flex)`
  align-items: center;
  width: 50%;
  margin: 0 20px 0 0;
  justify-content: space-between;
`;

export const InputTitle = styled(Flex)`
  font-size: 12px;
  padding: 2px 0 8px;
  margin: 0 15px 0 0;
`;

export const InputText = styled(Flex)`
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  justify-content: flex-start;
`;

export const InputRowContainer = styled(Flex)`
  width: 33%;
  padding: 2px 0;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const PatientDataContainer = styled(Flex)`
  width: 100%;
  padding: 5px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
`;

export const ActionsContainer = styled(Flex)`
  width: 100%;
  padding: 5px;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: row;
`;
export const HistoryContainer = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  /* background-color: green; */
  height: 100%;
  flex: 1;

  overflow-y: scroll;
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

export const CardContainer = styled(Flex)`
  width: 100%;
  padding: 4px 15px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  border: 1px solid ${palette.grey50};
`;
export const CardSubContainer = styled(Flex)`
  width: 80%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;
export const CardSecondSubContainer = styled(Flex)`
  width: 50%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const ImageDetails = styled(Flex)`
  width: 100%;
  padding: 5px;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
export const CardDate = styled(Flex)`
  font-size: 12px;
  padding: 4px 15px;
`;

export const NotFoundContainer = styled(Flex)`
  width: 100%;
  padding: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

export const ImageCaintainer = styled(Flex)`
  padding: 5px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

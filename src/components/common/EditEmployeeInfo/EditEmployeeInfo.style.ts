import styled from "styled-components";

// Theme
import { palette } from "../../../styles/theme";

// Ant Design
import { Flex } from "antd";
import { EditOutlined } from "@ant-design/icons";

export const InfoContainer = styled(Flex)`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
`;

export const FormInputsContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  /* Make Children width 30% */
  & > * {
    width: 20%;
    margin: 0px 10px;
  }
`;

export const EditButton = styled(EditOutlined)`
  color: ${palette.primary};
  margin-left: 5%;
`;
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

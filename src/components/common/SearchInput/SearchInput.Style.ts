// import { palette } from "../../../../styles/theme";
import styled from "styled-components";

// Ant Design
import {Flex ,Row ,Input} from "antd";
const { Search } = Input;

export const SearchContainer = styled(Row)`
    width: 100%;
    display: flex;
    flex-direction: row;
  justify-content: flex-start;
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
export const SearchInputContainer = styled(Search)`
    widdth: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: orange;
    `;
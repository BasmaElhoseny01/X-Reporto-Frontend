import { palette } from "../../../styles/theme";
import styled from "styled-components";

// Ant Design
import {Flex} from "antd";
// import Button from "antd-button-color";
import { EditOutlined } from '@ant-design/icons';

// export const ButtonContainer = styled.div`
//     // margin-top: 2%;
//     margin-left: 90%;
//     `;
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
// export { LineHeader, InputRow, ButtonCol, AddButton, FlexButton, ButtonRow };

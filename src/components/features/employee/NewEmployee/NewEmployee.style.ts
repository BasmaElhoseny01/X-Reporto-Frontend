import { palette } from "../../../../styles/theme";
import styled from "styled-components";

// Ant Design
import { Row, Col, Flex, Form } from "antd";
import Button from "antd-button-color";

export const NewEmployeeContainer = styled(Flex)`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;

  height: 80%;
`;

export const InputFieldsContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 100%;

  /* Make Children Width 30% */
  & > .ant-form-item {
    height: fit-content;
    width: 25%;

    margin: 0px 10px;
  }
`;

export const SubmitContainer = styled(Flex)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
`;

const LineHeader = styled.hr`
  border-top: 1px solid ${palette.grey50};
  margin-right: 2%;
`;

const InputRow = styled(Row)`
  width: 90%;
  display: flex;
  justify-content: space-between;
  // border-radius: 5px;
`;
const ButtonRow = styled(Row)`
  /* width: 40%;
  margin-left: 55%;
  margin-top: 15%; */

  display: flex;
  flex-direction: row;

  width: 100%;
`;

const ButtonCol = styled(Col)`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 40%;
`;

const FlexButton = styled(Flex)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const AddButton = styled(Button)`
  width: 17%;
`;
export { LineHeader, InputRow, ButtonCol, AddButton, FlexButton, ButtonRow };

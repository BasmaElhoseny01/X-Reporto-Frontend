import styled from "styled-components";

// Theme
// import { palette } from "../../../../styles/theme";

// Ant Design
import { Card, Flex, Form } from "antd";

export const MainContainer = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;
  margin:10% auto 90%;
  height: 100%;
  overflow-y: hidden;
`;

export const Header = styled(Flex)`
  justify-content: space-between;
  align-items: space-between;
  padding: 0 10px 10px;
`;

export const CardContainer = styled(Card)`
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 42px;
  padding-button: 0px;
`;

export const FormItem = styled(Form.Item)`
  padding: 10px 0;
`;
import styled from "styled-components";

// Theme
// import { palette } from "../../../../styles/theme";

// Ant Design
import { Card, Flex, Form } from "antd";

// import coverImage from "../../../assets/images/cover.jpg"; // Adjust the path accordingly

export const SigInPageContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

// export const SignInCoverContainer = styled(Flex)`
//   /* background-image: url("../../assets/images/cover.jpg"); */
//   background-image: url(${coverImage});

//   /* background-image: url("./assets/cover.jpg"); */
//   background-size: cover; // Adjust as needed
//   background-position: center; // Adjust as needed

//   border-radius: 10px;
//   margin-top: 5px;

//   /* background-color: #f0f2f5; */
//   height: 100%;
//   flex: 1;
// `;

export const SignInContentContainer = styled(Flex)`
  /* background-color: #f0f2f5; */
  height: 100%;
  flex: 1;
`;

export const Header = styled(Flex)`
  justify-content: space-between;
  align-items: space-between;
  padding: 0 10px 10px;
`;

export const CardContainer = styled(Card)`
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  /* margin: 10px; */
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* margin-bottom: 42px; */
  /* padding-bottom: 0px; */
`;

export const StyledForm = styled(Form)`
  width: 100%;
  margin: 0px 10px;
`;

export const FormItem = styled(Form.Item)`
  padding: 2px 0;
`;

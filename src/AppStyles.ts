import styled from "styled-components";

// Ant Design
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export const MainContainer = styled(Layout)`
  padding: 0px 16px 10px 16px;
  height: 100vh;
`;

export const ContentContainer = styled(Content)`
  height: 100%;
  /* flex: 1; */
  /* overflow-y: scroll; */
`;

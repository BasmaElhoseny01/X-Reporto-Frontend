import styled from "styled-components";

// Theme
import { palette } from "../../../styles/theme";

// Ant Design
import { Flex } from "antd";
import AntdLink from "antd/es/typography/Link";

export const ActivityCardContainer = styled(Flex)`
  /* background-color: ${palette.grey_light}20; */
  background-color: ${palette.grey_light}50;

  width: 90%;
  /* width: 40%; */
  height: 50px;

  padding: 5px;
  margin: 5px 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* Image */
  & > img {
    margin-left: 5px;
  }
`;

export const ActivityCardMiddleContainer = styled(Flex)`
  width: 100%;

  padding: 0 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & > .grey-color {
    color: ${palette.grey300};

    font-size: 12px;
  }
`;

export const Link = styled(AntdLink)`
  text-decoration: underline !important;
`;

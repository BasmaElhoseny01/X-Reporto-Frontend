import styled from "styled-components";

// Theme
import { palette } from "../../../styles/theme";

// Ant Design
import { Flex } from "antd";
import AntdLink from "antd/es/typography/Link";

export const ActivityCardContainer = styled(Flex)<{ isDarkTheme: boolean }>`
  background-color: ${(props) =>
    props.isDarkTheme ? `${palette.navy}60` : `${palette.grey_light}60`};

  width: 80%;
  height: 50px;

  padding: 5px;
  margin: 5px 5px;

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

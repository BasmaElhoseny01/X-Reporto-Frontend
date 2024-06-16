import styled from "styled-components";

// Theme
import { palette } from "../../../styles/theme";

// Ant Design
import { Header as AntdHeader } from "antd/es/layout/layout";
import { Avatar, Flex } from "antd";

export const HeaderContainer = styled(AntdHeader)`
  background-color: transparent;
  /* border-bottom: 1px solid; */

  padding: 5px 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLeftContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;

  & > * {
    margin-right: 3rem;
  }

  /* Logo Size */
  & > img {
    height: 50px;
  }
`;

export const HeaderRightContainer = styled(Flex)`
  width: 40%;

  align-items: center;
  justify-content: flex-end;
`;

export const LightDarkSwitchContainer = styled(Flex)`
  width: 150px;

  justify-content: space-between;
  align-items: center;

  & > .ant-typography {
    margin-bottom: 0;
  }

  & .ant-switch-inner-checked {
    margin-top: 1px !important;

    & img {
      height: 20px;
    }
  }

  & .ant-switch-inner-unchecked {
    margin-top: -26px !important;

    & img {
      width: 16px;
    }
  }
`;

export const StyledAvatar = styled(Avatar)`
  background-color: ${palette.secondary};
  color: ${palette.primary};

  font-size: 18px !important;

  cursor: pointer;
`;

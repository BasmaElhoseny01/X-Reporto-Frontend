/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import Icon from "@ant-design/icons";

import { ChangeTheme } from "../../../state/ActionCreators/index";

// Assets
import Logo from "../../../assets/images/logo.svg";
import LogoDark from "../../../assets/images/logo-dark.svg";
import Sun from "../../../assets/images/sun.svg";
import Moon from "../../../assets/images/moon.svg";
import { RootState } from "../../../state/Reducers";

// Styles
import {
  HeaderContainer,
  HeaderLeftContainer,
  HeaderRightContainer,
  LightDarkSwitchContainer,
  StyledAvatar,
} from "./Header.Styles";
import { Switch } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useDispatch, useSelector } from "react-redux";
// import { IconComponentProps } from "@ant-design/icons/lib/components/Icon";
// import { JSX } from "react/jsx-runtime";
// import { Avatar } from "antd";

function Header() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme);

  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? "light" : "dark";
    console.log("Current Theme: ", newTheme);
    // dispatch(ChangeTheme(newTheme));

    ChangeTheme(newTheme)(dispatch);
  };

  return (
    <HeaderContainer>
      <HeaderLeftContainer>
        {/* Logo*/}

        {currentTheme === "light" ? (
          <img src={Logo} alt="logo" height="40px" />
        ) : (
          <img src={LogoDark} alt="logo-dark" height="40px" />
        )}

        {/* Switch Dark Light Mode */}
        <LightDarkSwitchContainer>
          <Paragraph>Light</Paragraph>

          <Switch
            checkedChildren={<img src={Sun} alt="sun" />}
            unCheckedChildren={<img src={Moon} alt="moon" />}
            defaultChecked
            onChange={toggleTheme}
          />

          <Paragraph>Dark</Paragraph>
        </LightDarkSwitchContainer>
      </HeaderLeftContainer>

      <HeaderRightContainer>
        {/* <div onClick={() => console.log("Avatar Clicked")}> */}
        <StyledAvatar size="large" onClick={() => console.log("Clicked")}>
          B
        </StyledAvatar>
        {/* </div> */}
        {/* <Avatar
          size={64}
          style={{ backgroundColor: "#E6F7FF", color: "#1890FF", fontSize: 24 }}
        >
          B
        </Avatar> */}
        {/* Utils */}
        {/* Avatar */}
      </HeaderRightContainer>
    </HeaderContainer>
  );
}

export default Header;

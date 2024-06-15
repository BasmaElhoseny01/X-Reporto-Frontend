/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { ChangeTheme } from "../../../state/ActionCreators/index";
import { RootState } from "../../../state/Reducers";

// Ant Design
import { Switch } from "antd";
import Paragraph from "antd/es/typography/Paragraph";


// Styled Components
import {
  HeaderContainer,
  HeaderLeftContainer,
  HeaderRightContainer,
  LightDarkSwitchContainer,
  StyledAvatar,
} from "./Header.Styles";


// Assets
import Logo from "../../../assets/images/logo.svg";
import LogoDark from "../../../assets/images/logo-dark.svg";
import Sun from "../../../assets/images/sun.svg";
import Moon from "../../../assets/images/moon.svg";

function Header() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme);

  // Toggle theme function
  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? "light" : "dark";

    // Dispatch action to change theme
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
        {/* Avatar */}
        <StyledAvatar size="large" onClick={() => console.log("Clicked")}>
          B
        </StyledAvatar>
      </HeaderRightContainer>
    </HeaderContainer>
  );
}

export default Header;

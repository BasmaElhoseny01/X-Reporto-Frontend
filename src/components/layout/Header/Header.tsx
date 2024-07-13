import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { ChangeTheme } from "../../../state/ActionCreators/index";
import { MainState, RootState } from "../../../state/Reducers";

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

// Utils
import paths from "../../../pages/paths";
import useCustomNavigate from "../../../hooks/useCustomNavigate";

function Header() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme);
  const user = useSelector((state: MainState) => state.user);

  const isLoginPage = location.pathname === paths.login;

  // Toggle theme function
  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? "light" : "dark";

    // Dispatch action to change theme
    ChangeTheme(newTheme)(dispatch);

    // console.log("Theme changed to: ", newTheme);
  };
  const customNavigate = useCustomNavigate();
  return (
    <HeaderContainer>
      <HeaderLeftContainer>
        {/* Logo*/}
        {currentTheme === "light" ? (
          <img
            src={Logo}
            alt="logo"
            height="40px"
            style={{ cursor: "pointer" }}
            // onClick={reDirectToHome}
            onClick={customNavigate.navigateToHome}
          />
        ) : (
          <img
            src={LogoDark}
            alt="logo-dark"
            height="40px"
            style={{ cursor: "pointer" }}
            // onClick={reDirectToHome}
            onClick={customNavigate.navigateToHome}
          />
        )}

        {/* Switch Dark Light Mode */}
        <LightDarkSwitchContainer>
          <Paragraph>Light</Paragraph>

          <Switch
            checkedChildren={<img src={Sun} alt="sun" />}
            unCheckedChildren={<img src={Moon} alt="moon" />}
            defaultChecked={currentTheme === "light"}
            onChange={toggleTheme}
          />

          <Paragraph>Dark</Paragraph>
        </LightDarkSwitchContainer>
      </HeaderLeftContainer>

      {isLoginPage ? null : (
        <HeaderRightContainer>
          {/* Avatar */}
          <StyledAvatar size="large" 
          // onClick={reDirectToAccount}
          onClick={customNavigate.navigateToAccount}
          >
            {user?.username.charAt(0).toUpperCase()}
          </StyledAvatar>
        </HeaderRightContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;

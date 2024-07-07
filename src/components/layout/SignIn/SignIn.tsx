import React from "react";

// Services
import axios from "../../../services/apiService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators, MainState } from "../../../state";
import { bindActionCreators } from "redux";

// Ant Design
import { Button, Form, Input, message, Switch } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

// Styled Components
import {
  CardContainer,
  MainContainer,
  Header,
  FormItem,
} from "./SignIn.Styles";
import { LightDarkSwitchContainer } from "../../layout/Header/Header.Styles";

// Assets
import Logo from "../../../assets/images/logo.svg";
import LogoDark from "../../../assets/images/logo-dark.svg";
import Sun from "../../../assets/images/sun.svg";
import Moon from "../../../assets/images/moon.svg";

// Utils
import { reDirectToHome } from "../../../pages/paths.utils";

function SignIn() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    axios
      .post("/api/v1/login", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        if (res.status === 200) {
          ChangeToken(res.data.access_token);
          message.success("Login Successful");
          reDirectToHome();
        } else {
          ChangeToken("");
          console.error("Failed to Login:", res);
          message.error("Login Failed");
        }
      })
      .catch((err) => {
        ChangeToken("");
        console.error("Failed to Login:", err);
        message.error("Login Failed");
      });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
    ChangeToken("");
  };

  const currentTheme = useSelector((state: MainState) => state.theme);
  const dispatch = useDispatch();
  const { ChangeTheme, ChangeToken } = bindActionCreators(
    actionsCreators,
    dispatch
  );
  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? "light" : "dark";
    ChangeTheme(newTheme);
  };
  return (
    <MainContainer>
      <CardContainer
        title={
          <Header>
            {currentTheme === "light" ? (
              <img src={Logo} alt="logo" height="40px" />
            ) : (
              <img src={LogoDark} alt="logo-dark" height="40px" />
            )}
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
          </Header>
        }
        style={{ width: 500, padding: "30px 30px 0" }}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </FormItem>

          <FormItem
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </FormItem>

          <FormItem
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </FormItem>
        </Form>
      </CardContainer>
    </MainContainer>
  );
}

export default SignIn;

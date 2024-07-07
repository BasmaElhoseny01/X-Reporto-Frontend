import React from "react";

// Services
import axios from "../../../services/apiService";

// Redux
import { useDispatch } from "react-redux";
import { actionsCreators } from "../../../state";
import { bindActionCreators } from "redux";

// Ant Design
import { Input, message, Typography } from "antd";

// Styled Components
import {
  CardContainer,
  FormItem,
  SigInPageContainer,
  StyledForm,
} from "./SignIn.Styles";

// Components
import Header from "../Header/Header";
import PrimaryButton from "../../common/PrimaryButton/PrimaryButton";

// Utils
import { reDirectToHome } from "../../../pages/paths.utils";

function SignIn() {
  const dispatch = useDispatch();
  const { ChangeToken } = bindActionCreators(actionsCreators, dispatch);

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

  return (
    <SigInPageContainer>
      {/* <SignInContentContainer> */}
      <CardContainer style={{ width: 500, padding: "30px 30px 0" }}>
        <Header />
        <Typography.Title level={2} style={{ textAlign: "left" }}>
          Welcome to X-Report
        </Typography.Title>
        <Typography.Paragraph
          style={{
            textAlign: "left",
            color: "#888888",
            marginBottom: "20px",
          }}
        >
          Please log in to access your dashboard and start managing your
          reports.
        </Typography.Paragraph>
        <StyledForm
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
            <PrimaryButton style={{ width: "200px" }} htmlType="submit">
              Login
            </PrimaryButton>
          </FormItem>
        </StyledForm>
      </CardContainer>
    </SigInPageContainer>
  );
}

export default SignIn;

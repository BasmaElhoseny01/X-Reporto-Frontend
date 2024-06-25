import React from 'react';
import { Button, Form, Input, Switch } from 'antd';
import { CardContainer,MainContainer, Header, FormItem } from './signin.Styles';

import Logo from "../../../assets/images/logo.svg";
import { LightDarkSwitchContainer } from '../../layout/Header/Header.Styles';
import Paragraph from "antd/es/typography/Paragraph";
import LogoDark from "../../../assets/images/logo-dark.svg";
import Sun from "../../../assets/images/sun.svg";
import Moon from "../../../assets/images/moon.svg";
import { useDispatch, useSelector } from 'react-redux';
import { actionsCreators, MainState } from '../../../state';
import { bindActionCreators } from 'redux';

function Signin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log('Success:', values);
    ChangeToken(values);
    ChangeDrawer("/");
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const currentTheme = useSelector((state: MainState) => state.theme);
  const dispatch = useDispatch();
  const { ChangeTheme,ChangeToken,ChangeDrawer } = bindActionCreators(actionsCreators, dispatch);
  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? "light" : "dark";
    ChangeTheme(newTheme);
    console.log("Theme changed to: ", newTheme);
  };
  return (
    <MainContainer >
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
              onChange={toggleTheme} />

            <Paragraph>Dark</Paragraph>
          </LightDarkSwitchContainer>
        </Header>
      }
        style={{ width: 500,padding: '30px 30px 0'}}
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
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </FormItem>

          <FormItem
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </FormItem>

          <FormItem style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
            <Button type="primary" htmlType="submit" > 
              Submit
            </Button>
          </FormItem>
        </Form>
      </CardContainer>
    </MainContainer>
  );
}

export default Signin;

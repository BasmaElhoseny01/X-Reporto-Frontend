import React, { useEffect } from "react";

// Third Party Components
import PhoneInput from "antd-phone-input";

// Ant Design
import Title from "antd/es/typography/Title";
import { Form, Input, Radio, message } from "antd";

// Components
import LineHeader from "../../../common/LineHeader/LineHeader";
import SecondaryButton from "../../../common/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

import { useSelector } from "react-redux";
import { MainState } from "../../../../state/Reducers";

import axios from "../../../../services/apiService";
// Styled Components
import {
  NewEmployeeContainer,
  FormContainer,
  InputFieldsContainer,
  SubmitContainer,
} from "./NewEmployee.style";
import Unauthorized from "../../../layout/unauthorized/Unauthorized";

interface NewEmployeeFormValues {
  employee_name: string;
  role: "user";
  type: "employee" | "doctor";
  age: number;
  birth_date: string;
  created_at: string;
  gender: "male" | "female";
  phone_number: string;
  email: string;
  employee_id: number;
  password: string;
  username: string;
}

interface NewEmployeeProps {
  type: string;
}

function NewEmployee(props: NewEmployeeProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const token = useSelector((state: MainState) => state.token);
  const [me, setMe] = React.useState({} as any);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get("/api/v1/employees/me")
      .then((response) => {
        setMe(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const onFinish = async (values: unknown) => {
    const formValues = values as NewEmployeeFormValues;
    formValues.phone_number =
      (formValues.phone_number as any).countryCode +
      (formValues.phone_number as any).areaCode +
      (formValues.phone_number as any).phoneNumber;
    formValues.type = props.type == "doctors" ? "doctor" : "employee";
    formValues.employee_id = me.id;
    console.log("Form values:", formValues);

    try {
      const response = await axios.post(`api/v1/employees`, formValues, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
          "Content-Type": "application/json", // Optional: Include if required by your API
        },
      });
      console.log("API response:", response.data);
      message.success(
        `${
          props.type == "doctors" ? "Radiologist" : "Employee"
        } added successfully`
      );
      navigate("/doctors"); // Replace with your actual route
    } catch (error) {
      console.error("API error:", error);
      message.error(
        `Failed to add ${props.type == "doctors" ? "Radiologist" : "Employee"}`
      );
    }
  };

  const onCancel = () => {
    form.resetFields();
  };

  const calculateAge = (date: string | null): number | null => {
    if (!date) return null;
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    form.setFieldsValue({ age: calculateAge(date) });
  };

  return (
    <>
      {me.type != "employee" ? (
        <Unauthorized />
      ) : (
        <NewEmployeeContainer>
          <Title level={2}>
            New {props.type == "doctors" ? "Radiologist" : "Employee"}
          </Title>
          <LineHeader />
          <FormContainer
            form={form}
            onFinish={onFinish}
            initialValues={{
              gender: "male",
              role: "user",
              type: "employee",
              created_at: new Date().toISOString(),
            }}
          >
            <InputFieldsContainer>
              <Form.Item
                name="employee_name"
                label="Employee Name"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input placeholder="Employee Name" />
              </Form.Item>

              <Form.Item
                name="birth_date"
                label="Birth Date"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Birth Date is required" }]}
              >
                <Input
                  placeholder="Birth Date"
                  type="date"
                  onChange={handleBirthDateChange}
                />
              </Form.Item>

              <Form.Item
                name="age"
                label="Age"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Age" type="number" disabled />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Email is invalid" },
                ]}
              >
                <Input placeholder="Email" type="email" />
              </Form.Item>

              <Form.Item
                name="phone_number"
                label="Phone Number"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Phone is required" }]}
              >
                <PhoneInput enableSearch />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Gender is required" }]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="male">Male</Radio.Button>
                  <Radio.Button value="female">Female</Radio.Button>
                </Radio.Group>
              </Form.Item>

              {/* <Form.Item
            name="type"
            label="Type"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Type is required" }]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="employee">Employee</Radio.Button>
              <Radio.Button value="doctor">Doctor</Radio.Button>
            </Radio.Group>
          </Form.Item> */}
              <Form.Item
                name="username"
                label="Username"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </InputFieldsContainer>

            <SubmitContainer gap="middle">
              <SecondaryButton
                onClick={onCancel}
                htmlType="button"
                size="large"
                style={{ width: "6%" }}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                htmlType="submit"
                size="large"
                style={{ width: "6%" }}
              >
                Add
              </PrimaryButton>
            </SubmitContainer>
          </FormContainer>
        </NewEmployeeContainer>
      )}
    </>
  );
}

export default NewEmployee;

import React from "react";
import axios from "axios";

// Third Party Components
import PhoneInput from "antd-phone-input";

// Ant Design
import Title from "antd/es/typography/Title";
import { Form, Input, Radio, message } from "antd";

// Components
import LineHeader from "../../../common/LineHeader/LineHeader";
import SecondaryButton from "../../../common/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";

// Styled Components
import {
  NewRadiologistContainer,
  FormContainer,
  InputFieldsContainer,
  SubmitContainer,
} from "./NewRadiologist.style";

interface NewRadiologistFormValues {
  RadiologistName: string;
  birthDate: string;
  age: number;
  email: string;
  phone: string;
  gender: "male" | "female";
}

function NewRadiologist() {
  const [form] = Form.useForm();

  const onFinish = async (values: unknown) => {
    const formValues = values as NewRadiologistFormValues;
    console.log("Form values:", formValues);

    try {
      const response = await axios.post('/api/Radiologists', formValues);
      console.log("API response:", response.data);
      message.success("Radiologist added successfully");
      form.resetFields();
    } catch (error) {
      console.error("API error:", error);
      message.error("Failed to add Radiologist");
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
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    form.setFieldsValue({ age: calculateAge(date) });
  };

  return (
    <NewRadiologistContainer>
      <Title level={2}>New Radiologist</Title>
      <LineHeader />
      <FormContainer
        form={form}
        onFinish={onFinish}
        initialValues={{ gender: "male" }}
      >
        <InputFieldsContainer>
          <Form.Item
            name="RadiologistName"
            label="Radiologist Name"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Radiologist Name" />
          </Form.Item>

          <Form.Item
            name="birthDate"
            label="Birth Date"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Birth Date is required" }]}
          >
            <Input placeholder="Birth Date" type="date" onChange={handleBirthDateChange} />
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
            name="phone"
            label="Phone"
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
        </InputFieldsContainer>

        <SubmitContainer gap="middle">
          <SecondaryButton onClick={onCancel} htmlType="button" size="large" style={{ width: "6%" }}>Cancel</SecondaryButton>
          <PrimaryButton htmlType="submit" size="large" style={{ width: "6%" }}>Add</PrimaryButton>
        </SubmitContainer>
      </FormContainer>
    </NewRadiologistContainer>
  );
}

export default NewRadiologist;

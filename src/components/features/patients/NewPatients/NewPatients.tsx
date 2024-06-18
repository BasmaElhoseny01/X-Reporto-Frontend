import React from "react";

// Third Party Components
import PhoneInput from "antd-phone-input";

// Ant Design
import Title from "antd/es/typography/Title";
import { Form, Input, Radio } from "antd";

// Styled Components
import {
  NewPatientContainer,
  FormContainer,
  InputFieldsContainer,
  SubmitContainer,
} from "./NewPatients.Styles";

// Components
import LineHeader from "../../../common/LineHeader/LineHeader";
import SecondaryButton from "../../../common/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";

// interface FormValues {
//   patientName: string;
//   birthDate: string;
//   age: number;
//   email: string;
//   phone: string;
//   gender: string;
// }

function NewPatients() {
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    console.log("Form values:", values);
  };

  // const onCancel = () => {
  //   form.resetFields();
  // };

  return (
    <NewPatientContainer>
      <Title level={2}>New Patients</Title>
      <LineHeader />
      <FormContainer
        form={form}
        onFinish={onFinish}
        initialValues={{ gender: "male" }}
      >
        {/* <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ gender: "male" }}
          
        > */}

        {/* Input Fields */}
        <InputFieldsContainer>
          <Form.Item
            name="patientName"
            label="Patient Name"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Patient Name" />
          </Form.Item>

          <Form.Item
            name="birthDate"
            label="Birth Date"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Birth Date is required" }]}
          >
            <Input placeholder="Birth Date" type="date" />
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Age is required" }]}
          >
            <Input placeholder="Age" type="number" />
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

        {/* Submit */}
        <SubmitContainer>
          <SecondaryButton>Cancel</SecondaryButton>
          <PrimaryButton>Add</PrimaryButton>
        </SubmitContainer>
      </FormContainer>
    </NewPatientContainer>
  );
}
export default NewPatients;

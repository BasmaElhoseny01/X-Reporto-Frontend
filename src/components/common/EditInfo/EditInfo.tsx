import React, { useState, useEffect } from "react";
import { Form, Input, Radio, message } from "antd";
import axios from "../../../services/apiService";
import { Descriptions } from "antd";
import { Patient } from "../../../types/patient";
import {
  ButtonContainer,
  InfoContainer,
  FormInputsContainer,
} from "./EditInfo.style";
import SecondaryButton from "../../../components/common/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../components/common/PrimaryButton/PrimaryButton";
import { calculateAge } from "../../../utils/dateUtils";

interface EditInfoProps {
  patient: Patient;
  setPatientData: (value: Patient) => void;
  edit: boolean;
  setIsEditing: (value: boolean) => void;
}

function EditInfo(props: EditInfoProps) {
  const { patient, setPatientData, edit, setIsEditing } = props;
  const [form] = Form.useForm();
  const [ageValue, setAgeValue] = useState<number>(-1); // State to hold calculated age

  useEffect(() => {
    // Calculate age initially when patient data is loaded
    if (patient.birth_date) {
      const age = calculateAge(patient.birth_date);
      setAgeValue(age);
    }
  }, [patient.birth_date]);

  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    const age = calculateAge(date);
    setAgeValue(age); // Update age in state
    form.setFieldsValue({ age }); // Update age field in form
  };

  const onFinish = async (values: any) => {
    await axios
      .put(`api/v1/patients/${patient.id}`, { ...values })
      .then((response) => {
        setPatientData(response.data);
        message.success("Data successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        message.error("Failed to update data. Please try again.");
      });
    // Turn off editing mode
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <InfoContainer>
      {edit ? (
        <Form
          form={form}
          layout="vertical"
          initialValues={patient}
          onFinish={onFinish}
        >
          <FormInputsContainer>
            <Form.Item
              label="Patient ID"
              name="id"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Name"
              name="patient_name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Patient Name" />
            </Form.Item>

            <Form.Item
              label="Birth Date"
              name="birth_date"
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
              label="Age"
              name="age"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input type="number" disabled value={ageValue} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone_number"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Phone is required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Gender is required" }]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="male">Male</Radio.Button>
                <Radio.Button value="female">Female</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </FormInputsContainer>

          <ButtonContainer>
            <PrimaryButton
              htmlType="submit"
              size="large"
              style={{ width: "6%" }}
            >
              Save
            </PrimaryButton>
            <SecondaryButton
              onClick={handleCancel}
              size="large"
              style={{ width: "6%" }}
            >
              Cancel
            </SecondaryButton>
          </ButtonContainer>
        </Form>
      ) : (
        <Descriptions layout="vertical" colon={false}>
          <Descriptions.Item
            label="Patient ID"
            style={{ width: "20%" }}
            span={0.5}
          >
            {patient.id}
          </Descriptions.Item>
          <Descriptions.Item label="Patient Name" style={{ width: "20%" }}>
            {patient.patient_name}
          </Descriptions.Item>

          <Descriptions.Item label="Birth Date" style={{ width: "20%" }}>
            {patient.birth_date}
          </Descriptions.Item>

          <Descriptions.Item label="Age" style={{ width: "20%" }}>
            {patient.age}
          </Descriptions.Item>

          <Descriptions.Item label="Email">{patient.email}</Descriptions.Item>

          <Descriptions.Item label="Phone">
            {patient.phone_number}
          </Descriptions.Item>

          <Descriptions.Item label="Gender">{patient.gender}</Descriptions.Item>
        </Descriptions>
      )}
    </InfoContainer>
  );
}

export default EditInfo;

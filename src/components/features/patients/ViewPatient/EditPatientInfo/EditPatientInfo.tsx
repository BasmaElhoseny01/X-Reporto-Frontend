/*eslint-disable */
import React, { useState, useEffect } from "react";
import { Form, Input, Radio, message } from "antd";
import axios from "../../../../../services/apiService";
import { Descriptions } from "antd";

import {
  ButtonContainer,
  InfoContainer,
  FormInputsContainer,
} from "./EditPatientInfo.Styles";
import SecondaryButton from "../../../../common/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import { calculateAge } from "../../../../../utils/dateUtils";

// Types
import { PatientType } from "../../../../../types/patient";
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state";

// Interfaces
interface EditEmployeeInfoProps {
  patient: PatientType;
  setPatientData: (value: PatientType) => void;
}

function EditPatientInfo(props: EditEmployeeInfoProps) {
  const { patient, setPatientData } = props;
  const [form] = Form.useForm();

  // Redux
  const token = useSelector((state: MainState) => state.token);
  const user = useSelector((state: MainState) => state.user);

  // Use States
  const [isEditing, setIsEditing] = useState(false);
  const [ageValue, setAgeValue] = useState<number>(-1); // State to hold calculated age

  useEffect(() => {
    console.log("ViewInfo.....");

    // Calculate age initially when patient data is loaded
    if (patient?.birth_date) {
      const age = calculateAge(patient.birth_date);
      setAgeValue(age);
    }
  }, [patient?.birth_date]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    const age = calculateAge(date);
    setAgeValue(age); // Update age in state
    form.setFieldsValue({ age }); // Update age field in form
  };

  const onFinish = async (values: any) => {
    // Add employee_id to the values [This Employee Has Edited]
    values.employee_id = user?.id ?? -1;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await axios
      .put(`api/v1/patients/${patient?.id}`, { ...values })
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
    patient && (
      <InfoContainer>
        {isEditing ? (
          <Form
            form={form}
            layout="vertical"
            initialValues={patient}
            onFinish={onFinish}
          >
            <FormInputsContainer>
              <Form.Item
                label="ID"
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
              <SecondaryButton onClick={handleCancel} size="large">
                Cancel
              </SecondaryButton>
              <PrimaryButton htmlType="submit" size="large">
                Save
              </PrimaryButton>
            </ButtonContainer>
          </Form>
        ) : (
          <>
            <Descriptions layout="vertical" colon={false}>
              {patient?.id && (
                <Descriptions.Item label="ID" style={{ width:"20%" }} span={0.5}>
                  {patient.id}
                </Descriptions.Item>
              )}

              {patient?.patient_name && (
                <Descriptions.Item label="Name">
                  {patient.patient_name}
                </Descriptions.Item>
              )}

              {patient?.birth_date && (
                <Descriptions.Item label="Date of Birth">
                  {patient.birth_date}
                </Descriptions.Item>
              )}

              {ageValue !== -1 && (
                <Descriptions.Item label="Age" span={0.5}>
                  {ageValue}
                </Descriptions.Item>
              )}

              {patient?.email && (
                <Descriptions.Item label="Email">
                  {patient.email}
                </Descriptions.Item>
              )}

              {patient?.phone_number && (
                <Descriptions.Item label="Phone">
                  {patient.phone_number}
                </Descriptions.Item>
              )}

              {patient?.gender && (
                <Descriptions.Item label="Gender">
                  {patient.gender}
                </Descriptions.Item>
              )}
            </Descriptions>
            <ButtonContainer>
              <PrimaryButton size="large" onClick={handleEdit}>
                Edit
              </PrimaryButton>
            </ButtonContainer>
          </>
        )}
      </InfoContainer>
    )
  );
}

export default EditPatientInfo;

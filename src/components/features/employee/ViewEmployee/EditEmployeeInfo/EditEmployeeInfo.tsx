import React, { useState, useEffect } from "react";

// Services
import axios from "../../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state/Reducers";

// Third Party

// Ant Design
import { Descriptions, Form, Input, Radio, message } from "antd";

// Styled Components
import { ButtonContainer, FormInputsContainer } from "./EditEmployeeInfo.style";

// Components
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../common/SecondaryButton/SecondaryButton";

// Styled Components
import { InfoContainer } from "../../../../common/EditInfo/EditInfo.style";

//Types
import { EmployeeType } from "../../../../../types/employee";

interface EditEmployeeInfoProps {
  type: string;
  employee: EmployeeType;
  setEmployeeData: (value: EmployeeType) => void;
}

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

function EditEmployeeInfo(props: EditEmployeeInfoProps) {
  const { employee, setEmployeeData } = props;
  const [form] = Form.useForm();

  // Redux
  const token = useSelector((state: MainState) => state.token);
  const user = useSelector((state: MainState) => state.user);

  // Use States
  const [isEditing, setIsEditing] = useState(false);
  const [ageValue, setAgeValue] = useState<number>(-1); // State to hold calculated age

  useEffect(() => {
    // Calculate age initially when patient data is loaded
    if (employee?.birth_date) {
      const age = calculateAge(employee?.birth_date);
      setAgeValue(age);
    }
  }, [employee?.birth_date]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    form.setFieldsValue({ age: calculateAge(date) });
  };

  const onFinish = async (values: any) => {
    // Add employee_id to the values [This Employee Has Edited]
    values.employee_id = user?.id ?? -1;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .put(`api/v1/employees/${employee?.id}`, { ...values })
      .then((response) => {
        setEmployeeData(response.data);
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
    employee && (
      <InfoContainer>
        {isEditing ? (
          <Form
            form={form}
            layout="vertical"
            initialValues={employee}
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
                name="employee_name"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input placeholder="Employee Name" />
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input placeholder="Employee Username" />
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                name="birth_date"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Birth Date is required" }]}
              >
                <Input
                  placeholder="Date of Birth"
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
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Email is invalid" },
                ]}
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
              <Descriptions.Item label="ID" style={{ width: "20%" }} span={0.5}>
                {employee?.id}
              </Descriptions.Item>

              <Descriptions.Item label="Name">
                {employee?.employee_name}
              </Descriptions.Item>

              <Descriptions.Item label="Username">
                {employee?.username}
              </Descriptions.Item>

              <Descriptions.Item label="Date of Birth">
                {employee?.birth_date}
              </Descriptions.Item>

              <Descriptions.Item label="Age" span={0.5}>
                {employee?.age}
              </Descriptions.Item>

              <Descriptions.Item label="Email">
                {employee?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {employee?.phone_number}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {employee?.gender}
              </Descriptions.Item>
            </Descriptions>
            <ButtonContainer>
              <PrimaryButton
                htmlType="submit"
                size="large"
                onClick={handleEdit}
              >
                Edit
              </PrimaryButton>
            </ButtonContainer>
          </>
        )}
      </InfoContainer>
    )
  );
}
export default EditEmployeeInfo;

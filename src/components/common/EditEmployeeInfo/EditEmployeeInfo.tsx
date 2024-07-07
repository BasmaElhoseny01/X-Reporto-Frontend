import React, { useState, useEffect } from 'react';
import { Descriptions, Form, Input, Radio, message } from 'antd';
import { EditButton, ButtonContainer } from './EditEmployeeInfo.style';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
// import Title from 'antd/es/typography/Title';
// import LineHeader from '../LineHeader/LineHeader';
import { format, parseISO, isValid } from 'date-fns';
import { useSelector } from "react-redux";
import { MainState } from "../../../state";

import axios from '../../../services/apiService';

interface UserData {
  id: number;
  employee_name: string;
  email: string;
  age: number;
  birth_date: string;
  phone_number: string;
  gender: string;
  created_at: string;
  studies: []; // Update this type as needed
  role: string;
  type: string;
  employee_id: number;
  username: string;
}

interface EditEmployeeInfoProps {
  idValue: string;
  type: string;
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

function formatDateTime(dateString: string): string {
  const date = parseISO(dateString);
  if (isValid(date)) {
    return format(date, 'MM/dd/yyyy HH:mm:ss');
  }
  return 'Invalid Date';
}

function EditEmployeeInfo (props: EditEmployeeInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const token = useSelector((state: MainState) => state.token);
  const user = useSelector((state: MainState) => state.user);

  const [data, setData] = useState<UserData>({
    id: 0,
    employee_name: '',
    email: '',
    age: 0,
    birth_date: '',
    phone_number: '',
    gender: '',
    created_at: '',
    studies: [],
    role: 'user',
    type: 'employee',
    employee_id: 0,
    username: ''
  });

  useEffect(() => {
    if (props.idValue) {
      axios.get(`api/v1/employees/${props.idValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(response => {
          setData(response.data);
          form.setFieldsValue(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [props.idValue, form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    form.setFieldsValue({ age: calculateAge(date) });
  };

  const onFinish = async (values: any) => {
    values.id = data.id;
    values.age = calculateAge(values.birth_date);
    values.created_at = data.created_at;
    values.role = data.role;
    values.type = data.type;
    values.employee_id = user?.id ?? 0;
    values.username = data.username;
    values.doctor_id =  user?.id ?? 0;

    try {
      await axios.put(`api/v1/employees/${data.id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setData(values);
      setIsEditing(false);
      message.success('Data successfully updated!');
    } catch (error) {
      console.error('Error updating user data:', error);
      message.error('Failed to update data. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <Form form={form} layout="vertical" initialValues={data} onFinish={onFinish}>
        <Descriptions layout="vertical" colon={false}>
          <Descriptions.Item label="Employee ID">{data.id}</Descriptions.Item>
          <Descriptions.Item label="Employee Name">
            {isEditing ? (
              <Form.Item
                name="employee_name"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Name is required' }]}
              >
                <Input placeholder="Employee Name" />
              </Form.Item>
            ) : (
              <>
                {data.employee_name} <EditButton onClick={handleEdit} />
              </>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="UesrName">{data.username}</Descriptions.Item>
          <Descriptions.Item label="Birth Date">
            {isEditing ? (
              <Form.Item
                name="birth_date"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Birth Date is required' }]}
              >
                <Input placeholder="Birth Date" type="date" onChange={handleBirthDateChange} />
              </Form.Item>
            ) : (
              <>
                {data.birth_date} <EditButton onClick={handleEdit} />
              </>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {isEditing ? (
              <Form.Item
                name="email"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Email is required' }]}
              >
                <Input />
              </Form.Item>
            ) : (
              <>
                {data.email} <EditButton onClick={handleEdit} />
              </>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {isEditing ? (
              <Form.Item
                name="phone_number"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Phone Number is required' }]}
              >
                <Input />
              </Form.Item>
            ) : (
              <>
                {data.phone_number} <EditButton onClick={handleEdit} />
              </>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Age">{data.age}</Descriptions.Item>
          <Descriptions.Item label="Gender">
            {isEditing ? (
              <Form.Item
                name="gender"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Gender is required' }]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="male">Male</Radio.Button>
                  <Radio.Button value="female">Female</Radio.Button>
                </Radio.Group>
              </Form.Item>
            ) : (
              <>
                {data.gender} <EditButton onClick={handleEdit} />
              </>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">{formatDateTime(data.created_at)}</Descriptions.Item>
        </Descriptions>
        {isEditing && (
          <ButtonContainer>
            <PrimaryButton htmlType="submit" size="large" style={{ width: '6%' }}>
              Save
            </PrimaryButton>
            <SecondaryButton onClick={handleCancel} size="large" style={{ width: '6%' }}>
              Cancel
            </SecondaryButton>
          </ButtonContainer>
        )}
      </Form>
      {/* <Title level={4}>History</Title>
      <LineHeader /> */}
    </div>
  );
}
export default EditEmployeeInfo;

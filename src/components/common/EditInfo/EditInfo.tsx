import React, { useState, useEffect } from 'react';
import { Descriptions, Form, Input, Radio } from 'antd';
import { EditButton, ButtonContainer } from './EditInfo.style';
import SecondaryButton from '../../../components/common/SecondaryButton/SecondaryButton';
import PrimaryButton from '../../../components/common/PrimaryButton/PrimaryButton';
// import axios from 'axios';

interface UserData {
  id: number;
  patientName: string;
  email: string;
  age: number;
  birthData: string;
  phone: string;
  gender: string;
  createdAt: string;
}

interface EditInfoProps {
  searchValue: string;
  apiPut: string;
  apiGet: string;
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
function EditInfo(props: EditInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<UserData>({
    id: 1,
    patientName: 'John Doe',
    email: 'Zeinab@gmail.com',
    age: 25,
    birthData: '12/12/1996',
    phone: '123456789',
    gender: 'Female',
    createdAt: '12/12/2021',
  });

  useEffect(() => {
    if (props.searchValue) {
      // axios.get<UserData>(`https://jsonplaceholder.typicode.com/users/${searchValue}`)
      //   .then(response => {
      //     setData(response.data);
      //     form.setFieldsValue(response.data);
      //   })
      //   .catch(error => {
      //     console.error("Error fetching user data:", error);
      //   });
    } else {
      // Handle when searchValue is falsy (null or empty string)
      // setData(null); // Reset data if searchValue is falsy
    }
  }, [props.searchValue]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    form.setFieldsValue({ age: calculateAge(date) });
  };
  const onFinish = async () => {
    form
      .validateFields()
      .then((values) => {
        // Simulate saving data to an API
        values.id = data.id;
        values.age = calculateAge(values.birthData); // Recalculate age from birth data
        values.createdAt = data.createdAt;
        console.log('Received values of form:', values);
        //   axios
        //   .put<UserData>(props.apiPut, values)
        //   .then((response) => {
        // setData(response.data);
        setData(values);

        //     setIsEditing(false);
        //     console.log('Data saved successfully:', response.data);
        setIsEditing(false);

        //   })
        //   .catch((error) => {
        //     console.error('Error saving data:', error);
        //   });
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      }
      );
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // useEffect(() => {
  //   // Calculate initial age when component mounts
  //   const initialAge = calculateAge(data.birthData);
  //   setData((prevData) => ({
  //     ...prevData,
  //     age: initialAge,
  // //   }));
  // }, [data.birthData]);
  // if (data === null) {
  //   return null; // Return null to prevent rendering anything when data is null
  // }
  return (
    <div>
      <Form form={form} layout="vertical" initialValues={data} onFinish={onFinish}>
        <Descriptions layout="vertical" colon={false}>
          <Descriptions.Item label="Patient ID">{data.id}</Descriptions.Item>
          <Descriptions.Item label="Patient Name">
            {isEditing ? (
              <Form.Item
                name="patientName"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Name is required' }]}
              >
                <Input placeholder="Patient Name" />
              </Form.Item>
            ) : (
              <>
                {data.patientName} <EditButton onClick={handleEdit} />
              </>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Birth Date">
            {isEditing ? (
              <Form.Item
                name="birthData"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Birth Data is required' }]}
              >
                <Input placeholder="Birth Date" type="date" />
              </Form.Item>
            ) : (
              <>
                {data.birthData} <EditButton onClick={handleEdit} onChange={handleBirthDateChange} />
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
          <Descriptions.Item label="Phone">
            {isEditing ? (
              <Form.Item
                name="phone"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Phone is required' }]}
              >
                <Input />
              </Form.Item>
            ) : (
              <>
                {data.phone} <EditButton onClick={handleEdit} />
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
          <Descriptions.Item label="Created At">{data.createdAt}</Descriptions.Item>
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
    </div>
  );
}

export default EditInfo;

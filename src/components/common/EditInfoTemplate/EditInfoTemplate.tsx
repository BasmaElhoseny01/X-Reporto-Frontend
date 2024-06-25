import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Descriptions, Form, Input, message } from 'antd';
import { EditButton, ButtonContainer, ReportEditor } from './EditInfoTemplate.style';
import SecondaryButton from '../../../components/common/SecondaryButton/SecondaryButton';
import PrimaryButton from '../../../components/common/PrimaryButton/PrimaryButton';
import axios from 'axios';

interface UserData {
  id: number;
  templateName: string;
  createdBy: string;
  createdAt: string;
  content: string;
}

interface EditInfoTemplateProps {
  templateID: number;
  apiPut: string;
  apiGet: string;
}

function EditInfoTemplate(props: EditInfoTemplateProps) {
  const [content, setContent] = useState<string>(""); // Initialize with defaultTemplate
  const editor = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typing...'
    }),
    []
  );

  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    if (props.templateID) {
      axios.get<UserData>(props.apiGet)
        .then(response => {
          setData(response.data);
          form.setFieldsValue(response.data);
        })
        .catch(error => {
          message.error("Error fetching user data");
          console.error("Error fetching user data:", error);
        });
    }
  }, [props.templateID, props.apiGet, form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const onFinish = async () => {
    form
      .validateFields()
      .then((values) => {
        if (data) {
          values.id = data.id;
          values.createdAt = data.createdAt;
          axios.put<UserData>(props.apiPut, values)
            .then(response => {
              setData(response.data);
              setIsEditing(false);
              message.success("Data saved successfully");
            })
            .catch(error => {
              message.error("Error saving data");
              console.error('Error saving data:', error);
            });
        }
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setIsEditing(true);
  };

  if (!data) {
    return null; // Do not render the form if data is null
  }

  return (
    <div>
      <Form form={form} layout="vertical" initialValues={data} onFinish={onFinish}>
        <Descriptions layout="vertical" colon={false}>
          <Descriptions.Item label="Template ID">{data.id}</Descriptions.Item>
          <Descriptions.Item label="Template Name">
            {isEditing ? (
              <Form.Item
                name="templateName"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: 'Name is required' }]}
              >
                <Input placeholder="Template Name" />
              </Form.Item>
            ) : (
              <>
                {data.templateName} <EditButton onClick={handleEdit} />
              </>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Created By">{data.createdBy}</Descriptions.Item>
          <Descriptions.Item label="Created At">{data.createdAt}</Descriptions.Item>
          <Form.Item name="content" label="Template" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <ReportEditor
              ref={editor}
              value={content} // Bind value to content state
              config={config}
              onBlur={handleContentChange} // You can choose to keep onBlur or onChange based on performance considerations
              onChange={handleContentChange}
            />
          </Form.Item>
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

export default EditInfoTemplate;

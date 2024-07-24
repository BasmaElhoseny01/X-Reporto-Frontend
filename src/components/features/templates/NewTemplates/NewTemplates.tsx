import React, { useState, useRef, useMemo } from "react";

// Services
import axios from "../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../state/Reducers";

// Ant Design
import { Typography, Form, Input, message } from "antd";
const { Title } = Typography;

// Styled Components
import {
  ButtonContainer,
  ReportEditor,
  NewTemplateContainer,
  InputFieldsContainer,
} from "./NewTemplates.style";

// Components
import PrimaryButton from "../../../../components/common/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../components/common/SecondaryButton/SecondaryButton";
import LineHeader from "../../../../components/common/LineHeader/LineHeader";
import SelectionTemplate, {
  defaultTemplate,
} from "../../../../components/common/SelectionTemplate/SelectionTemplate";
import Unauthorized from "../../../layout/unauthorized/Unauthorized";
import { reDirectToTemplates } from "../../../../pages/paths.utils";

// Interface
interface FormValues {
  templateName: string;
  templateContent: string;
  templateType: string;
}

function NewTemplates() {
  const editor = useRef(null);
  const [form] = Form.useForm<FormValues>();

  // Redux
  const token = useSelector((state: MainState) => state.token);
  const user = useSelector((state: MainState) => state.user);

  // Use States
  const [selectedValue, setSelectedValue] = useState<string>("-1");
  const [content, setContent] = useState<string>(defaultTemplate); // Initialize with defaultTemplate

  const onFinish = async (values: FormValues) => {
    // Add Content to the template
    // console.log("Content", content);
    values.templateContent = content;

    try {
      // Step 1: Create the template with an empty template_path
      const createTemplatePayload = {
        template_name: values.templateName,
        template_path: "",
        doctor_id: user?.id ?? 0,
      };

      const createTemplateResponse = await axios.post(
        `api/v1/templates/`,
        createTemplatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      // console.log("createTemplateResponse", createTemplateResponse);
      // Notify success of template create
      message.success("Template created successfully.");

      const templateId = createTemplateResponse.data.id; // Adjust according to your API response
      // Step 2: Convert HTML content to a Blob object
      // console.log("value file", values.templateContent);

      // Create a Blob from the .docx content
      const blob = new Blob([values.templateContent], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // const blob = new Blob([values.templateContent], { type: 'text/html' }); // Adjust type if necessary

      const formData = new FormData();
      formData.append("file", blob, `${values.templateName}.docx`);

      const uploadResponse = await axios.post(
        `api/v1/templates/${templateId}/upload_template`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Adjust content type if server expects a specific type
          },
        }
      );

      const templatePath = uploadResponse.data.template_path; // Adjust based on your API response

      // Step 3: Update the created template with the obtained template path
      const updateTemplatePayload = {
        template_name: values.templateName,
        template_path: templatePath,
        doctor_id: user?.id ?? 0,
      };

      await axios.put(`api/v1/templates/${templateId}`, updateTemplatePayload, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
          // 'Content-Type': 'application/json' // Optional: Include if required by your API
        },
      });

      // Notify success of template update
      message.success("Template updated successfully with the file path.");

      setTimeout(() => {
        // Redirect to the template list page
        reDirectToTemplates("all");
      }, 500); // 1 second delay
    } catch (error) {
      console.error("Error creating or updating template:", error);
      message.error("Failed to create new template.");
    }
  };

  const onCancel = () => {
    form.resetFields();
    setContent(defaultTemplate); // Reset content to default template
  };

  const handleSelectionChange = (
    value: string,
    labelValue: string,
    label: string
  ): void => {
    setSelectedValue(labelValue); // Update selected value
    setContent(value); // Update content with selected template value

    form.setFieldsValue({
      templateContent: value,
      templateType: labelValue,
      templateName: label,
    });
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <>
      {user && user.type != "doctor" ? (
        <Unauthorized />
      ) : (
        <NewTemplateContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Title level={3}>New Template</Title>

            <Form
              form={form}
              onFinish={onFinish}
              initialValues={{
                templateName: "",
                // templateContent: defaultTemplate,
                templateType: "Default",
              }}
              style={{
                width: "50%",
              }}
            >
              <InputFieldsContainer>
                <Form.Item
                  name="templateName"
                  label="Name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    { required: true, message: "Template name is required" },
                  ]}
                >
                  <Input placeholder="Template Name" />
                </Form.Item>

                <Form.Item
                  name="templateType"
                  label="Initial Template"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <SelectionTemplate
                    selectedValue={selectedValue}
                    handleSelectionChange={handleSelectionChange}
                  />
                </Form.Item>
              </InputFieldsContainer>
            </Form>
          </div>
          <LineHeader />

          <ReportEditor
            ref={editor}
            value={content} // Bind value to content state
            config={config}
            onBlur={handleContentChange} // You can choose to keep onBlur or onChange based on performance considerations
            onChange={handleContentChange}
          />

          <ButtonContainer gap="middle">
            <SecondaryButton
              onClick={onCancel}
              size="large"
              style={{ width: "8%" }}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              // htmlType="submit"
              onClick={form.submit}
              size="large"
              style={{ width: "8%" }}
            >
              Add
            </PrimaryButton>
          </ButtonContainer>
        </NewTemplateContainer>
      )}
    </>
  );
}

export default NewTemplates;

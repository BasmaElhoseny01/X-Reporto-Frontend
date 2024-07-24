/*eslint-disable */
import React, { useState, useEffect, useRef, useMemo } from "react";

// Services
import axios from "../../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state/Reducers";

// Third Party
import { format, parseISO, isValid } from "date-fns";

// Antd Design
import { Descriptions, Form, Input, message } from "antd";

// Styled Components
import {
  EditButton,
  ButtonContainer,
  ReportEditor,
  InfoContainer,
} from "./EditInfoTemplate.style";

// Components
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../common/SecondaryButton/SecondaryButton";

// Types
// import { TemplateType } from "../../../../../types/template";
import { TemplateObject } from "../ViewTemplate";

// interface TemplateData {
//   id: number;
//   template_name: string;
//   created_by: string;
//   created_at: string;
//   content: string;
// }

interface EditInfoTemplateProps {
  template: TemplateObject;
}

function EditInfoTemplate(props: EditInfoTemplateProps) {
  const { template } = props;
  const editor = useRef(null);

  const [form] = Form.useForm();

  // Redux
  const token = useSelector((state: MainState) => state.token);
  const user = useSelector((state: MainState) => state.user);

  // Use States
  const [isEditing, setIsEditing] = useState(false);
  // const [content, setContent] = useState<string>(""); // Initialize with defaultTemplate

  const config = useMemo(
    () => ({
      readonly: !isEditing,
      toolbar: isEditing, // Hide toolbar in read-only mode
      placeholder: "Start typing...",
    }),
    []
  );

  // const [data, setData] = useState<TemplateData | null>(null);

  useEffect(() => {
    if (template) {
      console.log("template", template);
      // const newTemplateObject: any = {
      //   ...template.template,
      //   content: template.content,
      // };

      // console.log("newTemplateObject", newTemplateObject);

      // console.log("template OBJECT", template.template);
      // console.log(template.template);
    }
    // const fetchData = async () => {
    //   if (props.templateID) {
    //     try {
    //       const responseGet = await axios.get(
    //         `api/v1/templates/${props.templateID}`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
    //       const responseContent = await axios.get(
    //         `api/v1/templates/${responseGet.data.id}/download_template`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`, // Include the token in the headers
    //           },
    //         }
    //       );
    //       const responseCreatedBy = await axios.get(
    //         `api/v1/employees/${responseGet.data.doctor_id}`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`, // Include the token in the headers
    //           },
    //         }
    //       );
    //       setData({
    //         ...responseGet.data,
    //         created_by: responseCreatedBy.data.employee_name,
    //         content: responseContent.data,
    //       });
    //       setContent(responseContent.data);
    //       console.log("responseGet.data", responseContent.data);
    //       console.log(
    //         `api/v1/templates/${responseGet.data.id}/download_template`
    //       );
    //       form.setFieldsValue({
    //         ...responseGet.data,
    //         content: responseContent.data,
    //         created_by: responseCreatedBy.data.employee_name,
    //       });
    //     } catch (error) {
    //       console.error(`Error downloading template`, error);
    //       message.error("Error loading template");
    //     }
    //   }
    // };
    // fetchData();
    // }, [props.templateID, form]);
  }, [form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const onFinish = async () => {
    // form
    //   .validateFields()
    //   .then(async (values) => {
    //     if (data) {
    //       data.template_name = values.template_name;
    //       const blob = new Blob([content], {
    //         type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //       });
    //       const formData = new FormData();
    //       formData.append("file", blob, `${values.template_name}.docx`);
    //       const uploadResponse = await axios.post(
    //         `api/v1/templates/${data.id}/upload_template`,
    //         formData,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "multipart/form-data", // Adjust content type if server expects a specific type
    //           },
    //         }
    //       );
    //       message.success("Template uploaded successfully.");
    //       const templatePath = uploadResponse.data.template_path; // Adjust based on your API response
    //       console.log("templatePath", templatePath);
    //       // Step 3: Update the created template with the obtained template path
    //       const updateTemplatePayload = {
    //         template_name: values.template_name,
    //         template_path: templatePath,
    //         employee_id: user?.id,
    //       };
    //       await axios.put(
    //         `api/v1/templates/${data.id}`,
    //         updateTemplatePayload,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`, // Include the token in the headers
    //           },
    //         }
    //       );
    //       // Notify success of template update
    //       message.success("Template updated successfully.");
    //       setIsEditing(false);
    //     }
    //   })
    //   .catch((info) => {
    //     message.error("Validation failed:", info);
    //   });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleContentChange = (newContent: string) => {
    // setContent(newContent);
    setIsEditing(true);
  };

  function formatDateTime(dateString: string | undefined): string {
    if (!dateString) {
      return "Invalid Date";
    }
    const date = parseISO(dateString);
    if (isValid(date)) {
      return format(date, "MM/dd/yyyy HH:mm:ss");
    }
    return "Invalid Date";
  }

  // if (!data) {
  //   return null; // Do not render the form if data is null
  // }

  return (
    template && (
      <InfoContainer>
        {isEditing ? (
          <h1>Edit</h1>
        ) : (
          // <Form
          //   form={form}
          //   layout="vertical"
          //   initialValues={template.template}
          //   onFinish={onFinish}
          // ></Form>
          // <div style={{ overflowY: "auto", height: "100%" }}>
          <div style={{ height: "100%" }}>
            <Descriptions layout="vertical" colon={false}>
              <Descriptions.Item label="ID" style={{ width: "20%" }} span={0.5}>
                {template?.template?.id}
              </Descriptions.Item>
              <Descriptions.Item label="Name">
                {template?.template?.template_name}
              </Descriptions.Item>

              <Descriptions.Item label="Created By">
                {template?.doctor?.employee_name}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {formatDateTime(template?.template?.created_at)}
              </Descriptions.Item>
            </Descriptions>
            <ReportEditor
              ref={editor}
              // value={content} // Bind value to content state
              value={template?.content} // Bind value to content state
              // value={
              //   "<h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1><h1>aaa</h1>"
              // } // Bind value to content state
              config={config}
              onBlur={handleContentChange} // You can choose to keep onBlur or onChange based on performance considerations
              onChange={handleContentChange}
            />
          </div>
        )}
      </InfoContainer>
    )

    // {/* <Form
    //   form={form}
    //   layout="vertical"
    //   initialValues={data}
    //   onFinish={onFinish}
    // >
    //   <Descriptions layout="vertical" colon={false}>
    //     <Descriptions.Item label="Template ID">{data.id}</Descriptions.Item>
    //     <Descriptions.Item label="Template Name">
    //       {isEditing ? (
    //         <Form.Item
    //           name="template_name"
    //           labelCol={{ span: 24 }}
    //           wrapperCol={{ span: 24 }}
    //           rules={[{ required: true, message: "Name is required" }]}
    //         >
    //           <Input placeholder="Template Name" />
    //         </Form.Item>
    //       ) : (
    //         <>
    //           {data.template_name} <EditButton onClick={handleEdit} />
    //         </>
    //       )}
    //     </Descriptions.Item>
    //     <Descriptions.Item label="Created By">
    //       {data.created_by}
    //     </Descriptions.Item>
    //     <Descriptions.Item label="Created At">
    //       {formatDateTime(data.created_at)}
    //     </Descriptions.Item>

    //     <Form.Item
    //       name="content"
    //       label="Template"
    //       labelCol={{ span: 24 }}
    //       wrapperCol={{ span: 24 }}
    //       style={{ width: "10%" }}
    //     >
    //       <ReportEditor
    //         ref={editor}
    //         value={content} // Bind value to content state
    //         config={config}
    //         onBlur={handleContentChange} // You can choose to keep onBlur or onChange based on performance considerations
    //         onChange={handleContentChange}
    //       />
    //     </Form.Item>
    //   </Descriptions>
    //   {isEditing && (
    //     <ButtonContainer>
    //       <PrimaryButton
    //         htmlType="submit"
    //         size="large"
    //         style={{ width: "6%" }}
    //       >
    //         Save
    //       </PrimaryButton>
    //       <SecondaryButton
    //         onClick={handleCancel}
    //         size="large"
    //         style={{ width: "6%" }}
    //       >
    //         Cancel
    //       </SecondaryButton>
    //     </ButtonContainer>
    //   )}
    // </Form> */}
  );
}

export default EditInfoTemplate;

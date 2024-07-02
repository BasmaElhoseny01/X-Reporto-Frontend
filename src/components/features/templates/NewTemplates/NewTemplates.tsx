import React, { useState, useRef, useMemo } from "react";
import { Typography, Form, Input, message } from 'antd';
const { Title } = Typography;
import { ButtonContainer, ReportEditor, ReportDiv, TemplateDataCol, TemplateDataRow } from "./NewTemplates.style";
import LineHeader from '../../../../components/common/LineHeader/LineHeader';
import SelectionTemplate, { defaultTemplate } from "../../../../components/common/SelectionTemplate/SelectionTemplate";
import SecondaryButton from '../../../../components/common/SecondaryButton/SecondaryButton';
import PrimaryButton from '../../../../components/common/PrimaryButton/PrimaryButton';
import { baseUrl, token } from "../../../../types/api";
import axios from 'axios';


interface FormValues {
    templateName: string;
    templateContent: string;
    templateType: string;
}

function NewTemplates() {
    const [form] = Form.useForm<FormValues>();
    const [selectedValue, setSelectedValue] = useState<string>("-1");
    const [content, setContent] = useState<string>(defaultTemplate); // Initialize with defaultTemplate
    const editor = useRef(null);

    const onFinish = async (values: FormValues) => {
        console.log('Values', values);
        try {
            // Step 1: Create the template with an empty template_path
            const createTemplatePayload = {
                template_name: values.templateName,
                template_path: "",
                doctor_id:2
            };

            const createTemplateResponse = await axios.post(`${baseUrl}templates/`, createTemplatePayload, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                }
            });
            const templateId = createTemplateResponse.data.id; // Adjust according to your API response

            // Notify success of template creation
            message.success('Template created successfully.');
            // Step 2: Convert HTML content to a Blob object
            console.log("value file", values.templateContent);    
             // Create a Blob from the .docx content
             const blob = new Blob([values.templateContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
 
            // const blob = new Blob([values.templateContent], { type: 'text/html' }); // Adjust type if necessary

            const formData = new FormData();
            formData.append('file', blob, `${values.templateName}.docx`);

            const uploadResponse = await axios.post(
                `${baseUrl}templates/${templateId}/upload_template`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', // Adjust content type if server expects a specific type
                    },
                }
            );

            const templatePath = uploadResponse.data.template_path; // Adjust based on your API response

            // Step 3: Update the created template with the obtained template path
            const updateTemplatePayload = {
                template_name: values.templateName,
                template_path: templatePath,
                doctor_id:2
            };

            await axios.put(`${baseUrl}templates/${templateId}`, updateTemplatePayload, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                    // 'Content-Type': 'application/json' // Optional: Include if required by your API
                }
            });

            // Notify success of template update
            message.success('Template updated successfully with the file path.');
        } catch (error) {
            console.error('Error creating or updating template:', error);
            message.error('Error creating or updating template.');
        }
    };

    const onCancel = () => {
        form.resetFields();
    };

    const handleSelectionChange = (value: string, labelValue: string,label:string): void => {
        setSelectedValue(labelValue); // Update selected value
        setContent(value); // Update content with selected template value
        
        form.setFieldsValue({ templateContent: value, templateType: labelValue,templateName:label });
    };

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typing...',
        }),
        []
    );

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://api.example.com/findings'); // Replace with your API endpoint
    //             const findingsData = response.data.findings; // Adjust according to the API response structure
    //             const updatedContent = content.replace('<p id="findings"></p>', `<p id="findings">${findingsData}</p>`);
    //             setContent(updatedContent);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []); // Fetch data only once on initial render

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    return (
        <ReportDiv>
            <Title level={2}>New Templates</Title>
            <LineHeader />
            <Form
                form={form}
                onFinish={onFinish}
                initialValues={{ templateName: '', templateContent: defaultTemplate, templateType: 'Default' }}
            >
                <TemplateDataCol>
                    <TemplateDataRow>
                        <Form.Item
                            name="templateName"
                            label="Template Name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input name="templateName" />
                        </Form.Item>

                        <Form.Item
                            name="templateType"
                            label="Template Type"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}>
                            <SelectionTemplate
                                selectedValue={selectedValue}
                                handleSelectionChange={handleSelectionChange}
                            />
                        </Form.Item>
                    </TemplateDataRow>
                    <Form.Item
                        name="templateContent"
                        label="Template Content"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <ReportEditor
                            ref={editor}
                            value={content} // Bind value to content state
                            config={config}
                            onBlur={handleContentChange} // You can choose to keep onBlur or onChange based on performance considerations
                            onChange={handleContentChange}
                        />
                    </Form.Item>
                </TemplateDataCol>
                <ButtonContainer gap="middle">
                    <SecondaryButton onClick={onCancel} size="large" style={{ width: '8%' }}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton htmlType="submit" size="large" style={{ width: '8%' }}>
                        Add
                    </PrimaryButton>
                </ButtonContainer>
            </Form>
        </ReportDiv>
    );
}

export default NewTemplates;

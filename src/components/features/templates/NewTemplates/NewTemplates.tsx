import React, { useState, useEffect, useRef, useMemo } from "react";
import { Typography, Form, Input, Row } from 'antd';
const { Title } = Typography;
import { ButtonContainer, ReportEditor, ReportDiv, TemplateData, TemplateEditor } from "./NewTemplates.style";
import LineHeader from '../../../../components/common/LineHeader/LineHeader';
import SelectionTemplate, { defaultTemplate } from "../../../../components/common/SelectionTemplate/SelectionTemplate";
import SecondaryButton from '../../../../components/common/SecondaryButton/SecondaryButton';
import PrimaryButton from '../../../../components/common/PrimaryButton/PrimaryButton';
import axios from 'axios';

interface FormValues {
    templateName: string;
    templateContent: string;
    templateType: string;
}

function NewTemplates() {
    const [form] = Form.useForm<FormValues>();
    const [selectedValue, setSelectedValue] = useState<string>(defaultTemplate);
    const [content, setContent] = useState<string>(defaultTemplate); // Initialize with defaultTemplate
    const editor = useRef(null);

    const onFinish = async (values: FormValues) => {
        console.log('Form values:', values);
        // Add your API call here
    };

    const onCancel = () => {
        form.resetFields();
    };

    const handleSelectionChange = (value: string, label: string): void => {
        setSelectedValue(value); // Update selected value
        setContent(value); // Update content with selected template value
        form.setFieldsValue({ templateContent: value, templateType: label });
    };
    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typing...'
        }),
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.example.com/findings'); // Replace with your API endpoint
                const findingsData = response.data.findings; // Adjust according to the API response structure
                const updatedContent = content.replace('<p id="findings"></p>', `<p id="findings">${findingsData}</p>`);
                setContent(updatedContent);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Fetch data only once on initial render

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
                <TemplateData>
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
                </TemplateData>
                <TemplateEditor>
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

                </TemplateEditor>
                <Row>
                <ButtonContainer>
                    <SecondaryButton onClick={onCancel} size="large" style={{ width: '8%' }}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton htmlType="submit" size="large" style={{ width: '8%' }}>
                        Add
                    </PrimaryButton>
                </ButtonContainer>
                </Row>
            </Form>
        </ReportDiv>
    );
}

export default NewTemplates;

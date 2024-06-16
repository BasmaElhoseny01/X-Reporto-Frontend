import React from "react";
import { LineHeader, InputRow, FormItem, TextAreaRow, NoteItem, NoteCol, UploadRow, ButtonCol, AddButton, FlexButton, ButtonRow, UploadItem, UploadCol, StyledDragger } from "./NewXRay.style";
import { Col, Form, message, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";

// Define the structure of the form values
interface FormValues {
    patientID: string;
    age: number;
    note: string;
    uploadXRay: UploadFile[];  // Updated type to use UploadFile from antd
}

function NewXRay() {
    const [form] = Form.useForm<FormValues>();

    const props: UploadProps = {
        name: "file",
        multiple: true,
        action: "api/upload",
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    const onFinish = (values: FormValues) => {
        console.log("Form values:", values);
    };

    const onCancel = () => {
        form.resetFields();
    };

    return (
        <div>
            <h2>New X-Ray</h2>
            <LineHeader></LineHeader>
            <Form form={form} onFinish={onFinish}>
                <InputRow>
                    <Col span={6}>
                        <FormItem
                            name="patientID"
                            label="Patient ID"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: "Patient ID is required" }]}
                        >
                            <Input placeholder="Patient ID" size="large" />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            name="patientName"
                            label="Patient Name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: "Patient ID is required" }]}
                        >
                            <Input placeholder="Patient Name" size="large" />
                        </FormItem>
                    </Col>
                </InputRow>
                <InputRow>
                    <NoteCol>
                        <NoteItem
                            name="note"
                            label="Note"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <TextAreaRow placeholder="Please enter any notes" rows={4} />
                        </NoteItem>
                    </NoteCol>
                </InputRow>
                <UploadRow>
                    <UploadCol>
                        <UploadItem
                            name="uploadXRay"
                            label="Upload X-Ray"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <StyledDragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined style={{ color: "black", fontSize: "24px" }} />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
                                </p>
                            </StyledDragger>
                        </UploadItem>
                    </UploadCol>
                </UploadRow>
                <ButtonRow>
                    <ButtonCol>
                        <FlexButton gap="middle" wrap>
                            <AddButton type="primary" htmlType="button" ghost style={{ borderRadius: "1px" }} size="large" onClick={onCancel}>Cancel</AddButton>
                            <AddButton type="primary" htmlType="submit" shape="default" size="large" style={{ borderRadius: "1px" }}>Add</AddButton>
                        </FlexButton>
                    </ButtonCol>
                </ButtonRow>
            </Form>
        </div>
    );
}

export default NewXRay;

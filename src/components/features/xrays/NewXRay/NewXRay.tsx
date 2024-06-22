import React, { useState, useEffect } from "react";
import { LineHeader, InputRow, FormItem, TextAreaRow, NoteItem, UploadRow, UploadItem, StyledDragger, NewXRayContainer, FormContainer, ButtonRow, FlexButton } from "./NewXRay.style";
import { message, Input, Form } from "antd";
import SecondaryButton from "../../../common/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import Title from "antd/es/typography/Title";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import axios from "axios";

// Define the structure of the form values
interface FormValues {
    patientID: string;
    patientName: string;
    note: string;
    uploadXRay: UploadFile[];
}

function NewXRay() {
    const [form] = Form.useForm<FormValues>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    // const [isFetchingName, setIsFetchingName] = useState(false);

    const props: UploadProps = {
        onRemove: (file) => {
            setFileList((prev) => {
                const index = prev.indexOf(file);
                const newFileList = prev.slice();
                newFileList.splice(index, 1);
                console.log("File removed:", file);
                return newFileList;
            });
        },
        beforeUpload: (file) => {
            setFileList((prev) => [...prev, file]);
            return false; // Prevent automatic upload
        },
        fileList,
    };

    const onFinish = async (values: FormValues) => {
        const formData = new FormData();
        formData.append("patientID", values.patientID);
        formData.append("patientName", values.patientName);
        formData.append("note", values.note);
        fileList.forEach((file) => {
            formData.append("uploadXRay", file as unknown as File); // Cast UploadFile to File
        });
        console.log("Form values:", values);
        try {
            const response = await axios.post("/api/xray/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            message.success("X-Ray uploaded successfully!");
            console.log("API response:", response.data);
            form.resetFields();
            setFileList([]);
        } catch (error) {
            message.error("Failed to upload X-Ray. Please try again.");
            console.error("API error:", error);
        }
    };

    const onCancel = () => {
        form.resetFields();
        setFileList([]);
    };

    useEffect(() => {
        // const fetchPatientName = async (patientID: string) => {
        //     if (patientID) {
        //         // setIsFetchingName(true);
        //         try {
        //             const response = await axios.get(`/api/patient/${patientID}`);
        //             form.setFieldsValue({ patientName: response.data.name });
        //         } catch (error) {
        //             message.error("Failed to fetch patient name. Please try again.");
        //             console.error("API error:", error);
        //         } finally {
        //             // setIsFetchingName(false);
        //         }
        //     }
        // };

    //     const unsubscribe = form.getFieldInstance('patientID').addListener('change', () => {
    //         const patientID = form.getFieldValue('patientID');
    //         fetchPatientName(patientID);
    //     }
    // );

        // return () => unsubscribe();
    }, [form]);

    return (
        <NewXRayContainer>
            <Title level={2}>New X-Ray</Title>
            <LineHeader />
            <FormContainer form={form} onFinish={(values) => onFinish(values as FormValues)}>
                <InputRow>
                    <FormItem
                        name="patientID"
                        label="Patient ID"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: "Patient ID is required" }]}
                    >
                        <Input placeholder="Patient ID" size="large" />
                    </FormItem>

                    <FormItem
                        name="patientName"
                        label="Patient Name"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input placeholder="Patient Name" size="large" disabled />
                    </FormItem>
                </InputRow>
                <InputRow>
                    <NoteItem
                        name="note"
                        label="Note"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <TextAreaRow placeholder="Please enter any notes" rows={4} />
                    </NoteItem>
                </InputRow>
                <UploadRow>
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
                                Support for a single or bulk upload.
                            </p>
                        </StyledDragger>
                    </UploadItem>
                </UploadRow>
                <ButtonRow>
                    <FlexButton gap="middle">
                        <SecondaryButton htmlType="button" style={{ width: "17%" }} size="large" onClick={onCancel}>Cancel</SecondaryButton>
                        <PrimaryButton htmlType="submit" size="large" style={{ width: "17%" }}>Add</PrimaryButton>
                    </FlexButton>
                </ButtonRow>
            </FormContainer>
        </NewXRayContainer>
    );
}

export default NewXRay;

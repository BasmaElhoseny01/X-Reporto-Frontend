import React, { useState,useEffect } from "react";
import { LineHeader, InputRow, FormItem, TextAreaRow, NoteItem, UploadRow, UploadItem, StyledDragger, NewXRayContainer, FormContainer, ButtonRow, FlexButton } from "./NewXRay.style";
import { message, Input, Form } from "antd";
import SecondaryButton from "../../../common/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import Title from "antd/es/typography/Title";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { MainState } from "../../../../state/Reducers";
import axios from '../../../../services/apiService';

// Define the structure of the form values
interface FormValues {
    patient_id: string;
    patientName: string;
    study_name: string;
    notes: string;
    uploadXRay: UploadFile[];
}

function NewXRay() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [form] = Form.useForm<FormValues>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const token = useSelector((state: MainState) => state.token);
    const [me, setMe] = React.useState({} as any);

    useEffect(() => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/v1/employees/me")
        .then((response) => {
          setMe(response.data);
          console.log(me);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [token]);

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

    const uploadXRayFile = async (studyId: number, formValues: FormValues) => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file as any);
        });

        try {
            console.log("Uploading X-Ray file...");
            const responseUpload = await axios.post(
                `api/v1/studies/${studyId}/upload_image`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            console.log("Updateload response:", responseUpload.data);
            const response = await axios.put(
                `api/v1/studies/${studyId}`,
                {
                    study_name: formValues.study_name,
                    patient_id: formValues.patient_id,
                    notes: formValues.notes,
                    xray_path: responseUpload.data.xray_path,
                    doctor_id: me.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the headers
                        'Content-Type': 'application/json' // Optional: Include if required by your API
                    }
                }
            );
            console.log("Upload response:", response.data);
            message.success("X-Ray uploaded successfully");
            navigate('/reports'); // Replace with your actual route

        } catch (error) {
            console.error("Upload error:", error);
            message.error("Failed to upload X-Ray");
        }
    };

    const onFinish = async (values: FormValues) => {
        const formValues = values as FormValues;
        formValues.study_name = "Chest X-Ray";
        console.log("Form values:", formValues);
        try {
            const response = await axios.post(
                `api/v1/studies`,
                {
                    study_name: formValues.study_name,
                    patient_id: formValues.patient_id,
                    notes: formValues.notes,
                    doctor_id: me.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the headers
                        'Content-Type': 'application/json' // Optional: Include if required by your API
                    }
                }
            );
            console.log("API response:", response.data);
            message.success("Patient added successfully");

            // Upload X-Ray file after creating the study
            const studyId = response.data.id; // Assuming the response contains the study ID
            await uploadXRayFile(studyId, formValues);

        } catch (error) {
            console.error("API error:", error);
            message.error("Failed to add Xray");
        }
    };

    const onCancel = () => {
        form.resetFields();
        setFileList([]);
    };

    const handlePatientIDChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const patientID = event.target.value;
        await axios.get(`api/v1/patients/${patientID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                    'Content-Type': 'application/json' // Optional: Include if required by your API
                }
            }).then(response => {
                form.setFieldsValue({ patientName: response.data.patient_name });
            }).catch(error => {
                message.error("Failed to fetch patient name. Please try again.");
                console.error("API error:", error);
            });
    };

    return (
        <NewXRayContainer>
            <Title level={2}>New X-Ray</Title>
            <LineHeader />
            <FormContainer form={form} onFinish={(values) => onFinish(values as FormValues)}>
                <InputRow>
                    <FormItem
                        name="patient_id"
                        label="Patient ID"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: "Patient ID is required" }]}
                    >
                        <Input placeholder="Patient ID" size="large" onChange={handlePatientIDChange} />
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
                        name="notes"
                        label="Notes"
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

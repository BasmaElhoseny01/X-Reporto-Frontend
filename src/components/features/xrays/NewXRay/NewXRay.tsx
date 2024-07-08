import React, { useState } from "react";

// Hooks
import useCustomNavigate from "../../../../hooks/useCustomNavigate";

// Services
import axios from "../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../state/Reducers";

// Ant Design
import { message, Input, Form, Upload } from "antd";
import { UploadFile, UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";

// Components
import Unauthorized from "../../../layout/unauthorized/Unauthorized";
import SecondaryButton from "../../../common/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import Title from "antd/es/typography/Title";
import LineHeader from "../../../common/LineHeader/LineHeader";

import {
  InputRow,
  FormItem,
  TextAreaRow,
  NoteItem,
  UploadRow,
  UploadItem,
  StyledDragger,
  NewXRayContainer,
  FormContainer,
  SubmitContainer,
} from "./NewXRay.style";

// Define the structure of the form values
interface FormValues {
  patient_id: string;
  patientName: string;
  study_name: string;
  notes: string;
  uploadXRay: UploadFile[];
}

function NewXRay() {
  // Navigation
  const { navigateToCases } = useCustomNavigate();

  // Form
  const [form] = Form.useForm<FormValues>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Redux
  const token = useSelector((state: MainState) => state.token);
  const user = useSelector((state: MainState) => state.user);

  const props: UploadProps = {
    onRemove: (file) => {
      setFileList((prev) => {
        const index = prev.indexOf(file);
        const newFileList = prev.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file) => {
      // Allow only one file to be uploaded at a time
      if (fileList.length >= 1) {
        message.error("You can only upload one file at a time.");
        return Upload.LIST_IGNORE; // Ignore this file
      }
      setFileList([file]); // Replace the current file
      return false; // Prevent automatic upload
    },
    fileList,
  };

  const uploadXRayFile = async (studyId: number, formValues: FormValues) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file as any);
    });

    try {
      console.log("Uploading X-Ray file...");
      const responseUpload = await axios.post(
        `api/v1/studies/${studyId}/upload_image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      /*eslint-disable-next-line*/
      const response = await axios.put(
        `api/v1/studies/${studyId}`,
        {
          study_name: formValues.study_name,
          patient_id: formValues.patient_id,
          notes: formValues.notes,
          xray_path: responseUpload.data.xray_path,
          doctor_id: user?.id ?? 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("X-Ray File uploaded successfully");
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
          doctor_id: user?.id ?? 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Upload X-Ray file after creating the study
      const studyId = response.data.id; // Assuming the response contains the study ID
      await uploadXRayFile(studyId, formValues);

      message.success("Case added successfully");
      navigateToCases("unassigned");
    } catch (error) {
      console.error("API error:", error);
      message.error("Failed to add Xray");
    }
  };

  const onCancel = () => {
    form.resetFields();
    setFileList([]);
  };

  const handlePatientIDChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const patientID = event.target.value;
    await axios
      .get(`api/v1/patients/${patientID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        form.setFieldsValue({ patientName: response.data.patient_name });
      })
      .catch((error) => {
        message.error("Failed to fetch patient name. Please try again.");
        console.error("API error:", error);
      });
  };

  return (
    <>
      {user && user.type != "employee" ? (
        <Unauthorized />
      ) : (
        <NewXRayContainer>
          <Title level={3}>New X-Ray</Title>
          <LineHeader />
          <FormContainer
            form={form}
            onFinish={(values) => onFinish(values as FormValues)}
          >
            <InputRow>
              <FormItem
                name="patient_id"
                label="Patient ID"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Patient ID is required" }]}
              >
                <Input
                  placeholder="Patient ID"
                  size="large"
                  onChange={handlePatientIDChange}
                />
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
                    <InboxOutlined
                      style={{ color: "black", fontSize: "24px" }}
                    />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </StyledDragger>
              </UploadItem>
            </UploadRow>

            <SubmitContainer gap="middle">
              <SecondaryButton
                onClick={onCancel}
                htmlType="button"
                size="large"
                style={{ width: "6%" }}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                htmlType="submit"
                size="large"
                style={{ width: "6%" }}
              >
                Add
              </PrimaryButton>
            </SubmitContainer>
          </FormContainer>
        </NewXRayContainer>
      )}
    </>
  );
}

export default NewXRay;

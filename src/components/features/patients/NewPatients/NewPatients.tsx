import React from "react";
import { LineHeader, InputRow, ButtonCol, AddButton, FlexButton, ButtonRow } from "./NewPatients.style";
import { Col, Form, Input, Radio } from "antd";
import PhoneInput from "antd-phone-input";
// import Button from "antd-button-color";

interface FormValues {
    patientName: string;
    birthDate: string;
    age: number;
    email: string;
    phone: string;
    gender: string;
}

function NewPatients() {
    const [form] = Form.useForm();

    const onFinish = (values: FormValues) => {
        console.log("Form values:", values);
    };

    const onCancel = () => {
        form.resetFields();
    };

    return (
        <div>
            <h2>New Patients</h2>
            <LineHeader></LineHeader>
            <Form
                form={form}
                onFinish={onFinish}
                initialValues={{ gender: "male" }}
            >
                <InputRow>
                    <Col span={6}>
                        <Form.Item
                            name="patientName"
                            label="Patient Name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: "Name is required" }]}
                        >
                            <Input placeholder="Patient Name" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="birthDate"
                            label="Birth Date"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: "Birth Date is required" }]}
                        >
                            <Input placeholder="Birth Date" type="date" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="age"
                            label="Age"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: "Age is required" }]}
                        >
                            <Input placeholder="Age" type="number" />
                        </Form.Item>
                    </Col>
                </InputRow>
                <InputRow>
                    <Col span={6}>
                        <Form.Item
                            name="email"
                            label="Email"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                { required: true, message: "Email is required" },
                                { type: "email", message: "Email is invalid" }
                            ]}
                        >
                            <Input placeholder="Email" type="email" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: "Phone is required" }]}
                        >
                            <PhoneInput enableSearch />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: "Gender is required" }]}
                        >
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button value="male">Male</Radio.Button>
                                <Radio.Button value="female">Female</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </InputRow>
                <ButtonRow>
                    <ButtonCol>
                        <FlexButton gap="middle" wrap>
                            <AddButton type="primary" htmlType="button" onClick={onCancel} ghost style={{ borderRadius: "1px" }} size="large" >Cancel</AddButton>
                            <AddButton type="primary" htmlType="submit" shape="default" size="large" style={{ borderRadius: "1px" }}  >Add</AddButton>
                        </FlexButton>
                    </ButtonCol>
                </ButtonRow>
            </Form>
        </div>
    );
}
export default NewPatients;

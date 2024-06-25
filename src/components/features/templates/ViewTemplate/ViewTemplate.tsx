import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { ButtonContainer } from "./ViewTemplate.style";

import Title from 'antd/es/typography/Title';
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import LineHeader from '../../../common/LineHeader/LineHeader';
import EditInfoTemplate from '../../../common/EditInfoTemplate/EditInfoTemplate';
import axios from 'axios';
import { message } from 'antd';

interface RouteParams extends Record<string, string | undefined> {
    Id: string;
}

function ViewTemplate() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { Id } = useParams<RouteParams>();
    const [templateID, setTemplateID] = useState<string>('');

    useEffect(() => {
        if (Id) {
            setTemplateID(Id);
        }
    }, [Id]);
    const handleNewTemplate = () => {
        // Perform any necessary actions before navigating
        // Example: Saving data, validation, etc.

        // Navigate to the desired route using history.push
        navigate('/template/new'); // Replace with your actual route
    };
    const handleDeleteTemplate = () => {
        if (templateID) {
            axios.delete(`https://api/v1/templates/${templateID}`)
                .then(response => {
                    message.success('Template deleted successfully',response.data);
                    navigate('/templates'); // Replace with your actual route
                })
                .catch(error => {
                    message.error('There was an error deleting the template!');
                    console.error("There was an error deleting the template!", error);
                });
        }
        
    };
    return (
        <div>
            <Title level={2}>Template</Title>
            <LineHeader />
            <ButtonContainer>
                <PrimaryButton icon={<PlusOutlined />} onClick={handleNewTemplate}>New Template</PrimaryButton>
                <PrimaryButton danger icon={<DeleteOutlined />} onClick={handleDeleteTemplate}>Delete Template</PrimaryButton>
            </ButtonContainer>
            <EditInfoTemplate
                templateID={parseInt(templateID)}
                apiPut={`https://api/v1/templates/${templateID}`}
                apiGet={`https://api/v1/templates/${templateID}`}
            />
        </div>
    );
}

export default ViewTemplate;

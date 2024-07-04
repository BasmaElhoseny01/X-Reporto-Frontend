import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { ButtonContainer, ViewTemplateContainer } from "./ViewTemplate.style";

import Title from 'antd/es/typography/Title';
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import LineHeader from '../../../common/LineHeader/LineHeader';
import EditInfoTemplate from '../../../common/EditInfoTemplate/EditInfoTemplate';
import { message } from 'antd';
import { useSelector } from "react-redux";
import { MainState } from "../../../../state/Reducers";

import axios from '../../../../services/apiService';


interface RouteParams extends Record<string, string | undefined> {
    Id: string;
}

function ViewTemplate() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { Id } = useParams<RouteParams>();
    const [templateID, setTemplateID] = useState<string>('');
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
    useEffect(() => {
        if (Id) {
            setTemplateID(Id);
        }
    }, [Id]);
    const handleNewTemplate = () => {
        // Navigate to the desired route using history.push
        navigate('/templates/new'); // Replace with your actual route
    };
    const handleDeleteTemplate = () => {
        if (templateID) {
            axios.delete(`api/v1/templates/${templateID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(response => {
                    message.success('Template deleted successfully', response.data);
                    navigate('/templates'); // Replace with your actual route
                })
                .catch(error => {
                    message.error('There was an error deleting the template!');
                    console.error("There was an error deleting the template!", error);
                });
        }

    };
    return (
        <ViewTemplateContainer>

            <Title level={2}>Template</Title>
            <LineHeader />
            <ButtonContainer>
                <PrimaryButton icon={<PlusOutlined />} onClick={handleNewTemplate}>New Template</PrimaryButton>
                <PrimaryButton danger icon={<DeleteOutlined />} onClick={handleDeleteTemplate}>Delete Template</PrimaryButton>
            </ButtonContainer>
            <EditInfoTemplate
                templateID={parseInt(templateID)}
            />
        </ViewTemplateContainer>
    );
}

export default ViewTemplate;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import LineHeader from '../../../common/LineHeader/LineHeader';
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import { ButtonContainer } from "./ViewEmployee.style";
import EditEmployeeInfo from '../../../common/EditEmployeeInfo/EditEmployeeInfo';

import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { PlusOutlined } from "@ant-design/icons";

interface RouteParams extends Record<string, string | undefined> {
  Id: string;
}
interface ViewEmployeeProps {
  type: string;
}

function ViewEmployee(props: ViewEmployeeProps) {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { Id } = useParams<RouteParams>(); // Replace with the actual ID value

  const [idValue, setIdValue] = useState<string>('');
  useEffect(() => {
    if (Id) {
      setIdValue(Id);
    }
  }, [Id]);
  const handleAddEmployee = () => {
    // Perform any necessary actions before navigating
    // Example: Saving data, validation, etc.

    // Navigate to the desired route using history.push
    navigate(`/${props.type}/new`); // Replace with your actual route
  };

  return (
    <div>
      <Title level={2}>View {props.type=="doctors" ? 'Radiologist' : 'Employee'} </Title>
      <LineHeader />
      <ButtonContainer>
        <PrimaryButton icon={<PlusOutlined />} onClick={handleAddEmployee}>Add {props.type=="doctors" ? 'Radiologist' : 'Employee'}</PrimaryButton>
        {/* <PrimaryButton danger icon={<ContainerOutlined />}>Archive Patient</PrimaryButton> */}
      </ButtonContainer>
      <Title level={4}>{props.type=="doctors" ? 'Radiologist' : 'Employee'} Information</Title>
      <LineHeader />
      <EditEmployeeInfo idValue={idValue} type={props.type} />
    </div>
  );
}

export default ViewEmployee;

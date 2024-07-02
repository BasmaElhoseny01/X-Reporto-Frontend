import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import LineHeader from '../../../common/LineHeader/LineHeader';
import EditInfo from '../../../common/EditInfo/EditInfo';
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
// import ViewHistory from './ViewHistory';
import { ButtonContainer } from "./ViewPatient.Style";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { PlusOutlined } from "@ant-design/icons";
// ContainerOutlined
interface RouteParams extends Record<string, string | undefined> {
  Id: string;
}
function ViewPatient() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { Id } = useParams<RouteParams>(); // Replace with the actual ID value

  const [idValue, setIdValue] = useState<string>('');
  useEffect(() => {
    if (Id) {
      setIdValue(Id);
    }
  }, [Id]);

  const handleAddPatient = () => {
    // Perform any necessary actions before navigating
    // Example: Saving data, validation, etc.

    // Navigate to the desired route using history.push
    navigate('/patients/new'); // Replace with your actual route
  };


  return (
    <div>
      <Title level={2}>View Patient</Title>
      <LineHeader />
      <ButtonContainer>
        <PrimaryButton icon={<PlusOutlined />} onClick={handleAddPatient}>Add Patient</PrimaryButton>
        {/* <PrimaryButton danger icon={<ContainerOutlined />}>Archive Patient</PrimaryButton> */}
      </ButtonContainer>
      <Title level={4}>Patient Information</Title>
      <LineHeader />
      <EditInfo idValue={idValue} />

    </div>
  );
}

export default ViewPatient;

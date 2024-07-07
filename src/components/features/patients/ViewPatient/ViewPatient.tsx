import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

import { useParams } from "react-router-dom";
import axios from "../../../../services/apiService";

// Ant Design
import Title from "antd/es/typography/Title";
import { PlusOutlined, EditTwoTone } from "@ant-design/icons";
import { Result, Row } from "antd";

// Components
import LineHeader from "../../../common/LineHeader/LineHeader";
import EditInfo from "../../../common/EditInfo/EditInfo";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import ViewHistory from "../../../common/ViewHistory/ViewHistory";

// Styled Components
import { ButtonContainer, ViewContainer } from "./ViewPatient.Style";
import { useSelector } from "react-redux";
import { MainState } from "../../../../state";
import { reDirectToHome } from "../../../../pages/paths.utils";

interface RouteParams extends Record<string, string | undefined> {
  Id: string;
}

const fetchPatientData = async (id: string, token: string) => {
  try {
    const response = await axios.get(`api/v1/patients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw error;
  }
};
function ViewPatient() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Get the ID value from the URL
  const { Id } = useParams<RouteParams>(); // Replace with the actual ID value
  const token = useSelector((state: MainState) => state.token);

  // Use States
  const [patientData, setPatientData] = useState({} as any);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (Id) {
      // Get Patient Info
      fetchPatientData(Id, token)
        .then((response) => {
          console.log(response);
          setPatientData(response);
        })
        .catch((error) => {
          if (error.message.includes("404")) {
            console.error("Error: Patient data not found (404)");
            setPatientData(null);
          } else {
            console.error("Error fetching patient data:", error);
          }
        });
    }
  }, [Id]);

  const handleAddPatient = () => {
    // Perform any necessary actions before navigating
    // Example: Saving data, validation, etc.

    // Navigate to the desired route using history.push
    navigate("/patients/new"); // Replace with your actual route
  };

  return (
    <>
      {patientData ? (
        <ViewContainer>
          <Title level={2}>View Patient</Title>
          <LineHeader />
          <Row>
            <div style={{ display: "flex" }}>
              <Title level={4} style={{ margin: 0, marginRight: "10px" }}>
                Patient Information
              </Title>
              <EditTwoTone
                onClick={() => setIsEditing(true)}
                style={{ fontSize: "24px" }}
              />
            </div>
            <ButtonContainer>
              <PrimaryButton icon={<PlusOutlined />} onClick={handleAddPatient}>
                Add Patient
              </PrimaryButton>
            </ButtonContainer>
          </Row>
          <LineHeader />
          <EditInfo
            patient={patientData}
            setPatientData={setPatientData}
            edit={isEditing}
            setIsEditing={setIsEditing}
          />
          <ViewHistory api={`api/v1/patients/${Id}/studies/?`} />
        </ViewContainer>
      ) : (
        <Result
          status="404"
          title="404"
          subTitle="No Patient exists with this ID."
          extra={
            <PrimaryButton onClick={reDirectToHome}>Back Home</PrimaryButton>
          }
        />
      )}
    </>
  );
}

export default ViewPatient;

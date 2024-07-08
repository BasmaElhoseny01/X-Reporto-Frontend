/*eslint-disable */
import React, { useState, useEffect } from "react";

// Hooks
import { useParams } from "react-router-dom";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";

// Services
import axios from "../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../state";

// Ant Design
import { Result, Row, Spin } from "antd";
import Title from "antd/es/typography/Title";
import type { TabsProps } from "antd";

import { PlusOutlined, EditTwoTone } from "@ant-design/icons";

// Components
import LineHeader from "../../../common/LineHeader/LineHeader";
import EditInfo from "../../../common/EditInfo/EditInfo";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import ViewHistory from "../../../common/ViewHistory/ViewHistory";

// Styled Components
import {
  ButtonContainer,
  StyledTabs,
  ViewContainer,
} from "./ViewPatient.Style";

// Utils
import { reDirectToHome } from "../../../../pages/paths.utils";
import EditEmployeeInfo from "../../employee/ViewEmployee/EditEmployeeInfo/EditEmployeeInfo";
import EditPatientInfo from "./EditPatientInfo/EditPatientInfo";

// Interfaces
interface RouteParams extends Record<string, string | undefined> {
  Id: string;
}
// Server Fetch
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

const Header = () => <Title level={3}>Patient</Title>;

function ViewPatient() {
  // Get the ID value from the URL
  const { Id } = useParams<RouteParams>(); // Replace with the actual ID value

  // Navigation
  const { navigateToHome, navigateToPatients } = useCustomNavigate();

  // Redux States
  const token = useSelector((state: MainState) => state.token);
  const user = useSelector((state: MainState) => state.user);

  // Use States
  const [patientData, setPatientData] = useState({} as any);
  const [fetching, setFetching] = useState(true); // Initially set fetching to true
  const [error, setError] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (Id) {
      // Get Patient Info
      fetchPatientData(Id, token)
        .then((response) => {
          if (response) {
            setPatientData(response);
          } else {
            setError(true); // Set error state if response is null
          }
        })
        .catch(() => {
          setError(true); // Set error state on fetch failure
        })
        .finally(() => {
          setTimeout(() => {
            setFetching(false); // Set fetching to false after 0.5 seconds
          }, 1000); // 1 second delay
        });
    } else {
      setFetching(false); // Set fetching to false if Id is not provided
    }
  }, [Id, token]);

  const handleAddPatient = () => {
    // Perform any necessary actions before navigating
    // Example: Saving data, validation, etc.

    // Navigate to the desired route using history.push
    navigateToPatients("new");
  };

  /*eslint-disable-next-line*/
  const onChange = (key: string) => {
    // console.log(key);
  };

  const patientNavItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Info",
      children: (
        <EditInfo patient={patientData} />
        // <EditPatientInfo
        // employee={employeeData}
        // setEmployeeData={setEmployeeData}
        // type={props.type}
        // />
      ),
    },
    {
      key: "2",
      label: "History",
      // children: <ViewHistory api={`api/v1/employees/${Id}/studies/?`} />,
      children: <h1>History</h1>,
    },
  ];

  if (fetching) {
    return (
      <ViewContainer>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
          }}
        >
          {" "}
          <Spin tip="Loading" size="large">
            <div
              style={{
                padding: 50,
                // background: "rgba(0, 0, 0, 0.05)",
                borderRadius: 4,
              }}
            />
          </Spin>
        </div>
      </ViewContainer>
    );
  }

  if (error || !patientData) {
    return (
      <ViewContainer>
        <Header />
        <Result
          status="500"
          title="500"
          subTitle={"Sorry, something went wrong."}
          extra={
            <PrimaryButton onClick={navigateToHome}>Back Home</PrimaryButton>
          }
        />
      </ViewContainer>
    );
  }

  return (
    <ViewContainer>
      <Header />
      <StyledTabs
        defaultActiveKey="1"
        items={patientNavItems}
        onChange={onChange}
      />

      {/* {patientData ? (
        <ViewContainer>
          <Title level={2}>Patient</Title>
          <LineHeader />
          <Row>
            <div style={{ display: "flex" }}>
              <Title level={4} style={{ margin: 0, marginRight: "10px" }}>
                Patient Information
              </Title>
              {user?.type == "employee" && (
                <EditTwoTone
                  onClick={() => setIsEditing(true)}
                  style={{ fontSize: "24px" }}
                />
              )}
            </div>
            <ButtonContainer>
              {user?.type == "employee" && (
                <PrimaryButton
                  icon={<PlusOutlined />}
                  onClick={handleAddPatient}
                >
                  Add Patient
                </PrimaryButton>
              )}
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
      )}*/}
    </ViewContainer>
  );
}

export default ViewPatient;

/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Services
import axios from "../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../state/Reducers";

// Ant Design
import Title from "antd/es/typography/Title";
import { Alert, Result, Spin } from "antd";
import type { TabsProps } from "antd";

// Components
import EditEmployeeInfo from "./EditEmployeeInfo/EditEmployeeInfo";
import ViewHistory from "../../../common/ViewHistory/ViewHistory";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";

// Styled Components
import { StyledTabs, ViewContainer } from "./ViewEmployee.style";

//Types
import { EmployeeType } from "../../../../types/employee";

// Utils
import { reDirectToHome } from "../../../../utils";

// Interfaces
interface RouteParams extends Record<string, string | undefined> {
  Id: string;
}
interface ViewEmployeeProps {
  type: string;
}

// Server Fetch
const fetchEmployeeData = async (id: string, token: string) => {
  try {
    const response = await axios.get(`api/v1/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Employee data:", error);
    return null; // Return null on error
  }
};

const Header = ({ type }: { type: string }) => (
  <Title level={3}>{type === "doctors" ? "Doctor" : "Employee"}</Title>
);

function ViewEmployee(props: ViewEmployeeProps) {
  // Get the ID value from the URL
  const { Id } = useParams<RouteParams>(); // Replace with the actual ID value

  // Redux States
  const token = useSelector((state: MainState) => state.token);

  // Use States
  const [employeeData, setEmployeeData] = useState<EmployeeType | null>(null);
  const [fetching, setFetching] = useState(true); // Initially set fetching to true
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Id) {
      setError(false); // Reset error state
      // Get Employee Info
      fetchEmployeeData(Id, token)
        .then((response) => {
          if (response) {
            setEmployeeData(response);
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

  const onChange = (key: string) => {
    // console.log(key);
  };

  const employeeNavItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Info",
      children: (
        <EditEmployeeInfo
          employee={employeeData}
          setEmployeeData={setEmployeeData}
          type={props.type}
        />
      ),
    },
  ];

  const doctorNavItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Info",
      children: (
        <EditEmployeeInfo
          employee={employeeData}
          setEmployeeData={setEmployeeData}
          type={props.type}
        />
      ),
    },
    {
      key: "2",
      label: "History",
      children: <ViewHistory api={`api/v1/employees/${Id}/studies/?`} />,
    },
  ];

  if (fetching) {
    return (
      <ViewContainer>
        <Header type={props.type} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
          }}
        >
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

  if (error || !employeeData) {
    return (
      <ViewContainer>
        <Header type={props.type} />
        <Result
          status="404"
          title="404"
          subTitle={
            props.type === "doctors"
              ? "No Doctor exists with this ID."
              : "No Employee exists with this ID."
          }
          extra={
            <PrimaryButton onClick={reDirectToHome}>Back Home</PrimaryButton>
          }
        />
      </ViewContainer>
    );
  }

  return (
    <ViewContainer>
      <Header type={props.type} />
      <StyledTabs
        defaultActiveKey="1"
        items={props.type === "doctors" ? doctorNavItems : employeeNavItems}
        onChange={onChange}
      />
    </ViewContainer>
  );
}

export default ViewEmployee;

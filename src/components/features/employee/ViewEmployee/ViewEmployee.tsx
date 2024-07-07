import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

// Services
import axios from "../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../state/Reducers";

// Ant Design
import Title from "antd/es/typography/Title";
import { Result, Tabs } from "antd";
import type { TabsProps } from "antd";

// Components
import EditEmployeeInfo from "../../../common/EditEmployeeInfo/EditEmployeeInfo";
import ViewHistory from "../../../common/ViewHistory/ViewHistory";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";

// Styled Components
import { ViewContainer } from "./ViewEmployee.style";

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
  }
};

function ViewEmployee(props: ViewEmployeeProps) {
  // Get the ID value from the URL
  const { Id } = useParams<RouteParams>(); // Replace with the actual ID value

  // Redux States
  const token = useSelector((state: MainState) => state.token);

  // Use States
  const [employeeData, setEmployeeData] = useState<EmployeeType | null>(null);

  useEffect(() => {
    if (Id) {
      // Get Employee Info
      fetchEmployeeData(Id, token).then((response) => {
        console.log(response);
        setEmployeeData(response);
      });
    }
  }, [Id]);

  // const handleAddEmployee = () => {
  //   reDirectToEmployees("new");
  // };

  /* eslint-disable-next-line */
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

  return (
    <>
      {employeeData ? (
        <ViewContainer>
          {" "}
          <Title level={3}>
            {props.type == "doctors" ? "Doctor" : "Employee"}{" "}
          </Title>
          <Tabs
            defaultActiveKey="1"
            items={props.type == "doctors" ? doctorNavItems : employeeNavItems}
            onChange={onChange}
          />{" "}
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

export default ViewEmployee;

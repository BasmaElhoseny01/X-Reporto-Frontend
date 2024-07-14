/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

// Services
import axios from "../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../state/Reducers";

// Antd Design
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { message, Result, Spin } from "antd";

// Styled Components
import { ButtonContainer, ViewContainer } from "./ViewTemplate.style";

// Components
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import LineHeader from "../../../common/LineHeader/LineHeader";
// import EditInfoTemplate from "./EditInfoTemplate/EditInfoTemplate";

// Types
import { TemplateType } from "../../../../types/template";
import {
  reDirectToHome,
  reDirectToTemplates,
} from "../../../../pages/paths.utils";
import { EmployeeType } from "../../../../types/employee";
import EditInfoTemplate from "./EditInfoTemplate/EditInfoTemplate";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";

// Interfaces
interface RouteParams extends Record<string, string | undefined> {
  Id: string;
}

export interface TemplateObject {
  template: TemplateType;
  doctor: EmployeeType;
  content: string;
}

// Server Fetch
const fetchTemplateData = async (id: string, token: string) => {
  try {
    const response = await axios.get(`api/v1/templates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Template data:", error);
    throw error;
  }
};

const fetchTemplateDoctor = async (id: string, token: string) => {
  try {
    const response = await axios.get(`api/v1/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Doctor for Template:", error);
    return null; // Return null on error
  }
};

const downloadTemplateContent = async (id: string, token: string) => {
  try {
    const response = await axios.get(
      `api/v1/templates/${id}/download_template`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Downloading Template File:", error);
    return null; // Return null on error
  }
};

const deleteTemplate = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`api/v1/templates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error Deleting Template:", error);
    throw error;
  }
};

function ViewTemplate() {
  // Get the ID value from the URL
  const { Id } = useParams<RouteParams>();

  const { navigateToTemplates } = useCustomNavigate();

  // Redux States
  const token = useSelector((state: MainState) => state.token);

  // Use States
  const [templateData, setTemplateData] = useState<TemplateObject | null>(null);
  const [fetching, setFetching] = useState(true); // Initially set fetching to true
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (Id) {
        try {
          setError(false); // Reset error state
          setFetching(true); // Set fetching to true when starting data fetch

          // Fetch template data
          const templateResponse = await fetchTemplateData(Id, token);
          console.log("templateResponse", templateResponse);

          if (!templateResponse) {
            setError(true); // Set error state if template response is null
            return; // Exit early if template data fetch fails
          }

          // Fetch Template Doctor
          const doctorResponse = await fetchTemplateDoctor(
            templateResponse.doctor_id,
            token
          );
          console.log("doctorResponse", doctorResponse);

          if (!doctorResponse) {
            setError(true); // Set error state if doctor response is null
            return; // Exit early if template doctor fetch fails
          }

          // Fetch Template Content
          const contentResponse = await downloadTemplateContent(Id, token);
          console.log("contentResponse", contentResponse);

          if (!contentResponse) {
            throw new Error("Error fetching Template Content");
          }

          // Set Template Object
          setTemplateData({
            template: templateResponse,
            doctor: doctorResponse,
            content: contentResponse,
          });

          // Set fetching to false after all data is fetched
          setTimeout(() => {
            setFetching(false);
          }, 1000); // 1 second delay
        } catch (error) {
          console.error("Error fetching Template data:", error);
          setError(true); // Set error state on fetch failure
          setFetching(false); // Set fetching to false on error
        }
      }
    };

    if (Id) {
      fetchData(); // Call fetchData function if Id exists
    } else {
      setFetching(false); // Set fetching to false if Id is not provided
    }
  }, [Id, token]);

  const handleNewTemplate = () => {
    navigateToTemplates("new");
  };

  const handleDeleteTemplate = () => {
    if (Id) {
      deleteTemplate(Id, token)
        .then((response) => {
          if (response) {
            // setTemplateData(response);
            message.success("Template deleted successfully");
            // Redirect to Template
            navigateToTemplates("all");
          }
        })
        .catch(() => {
          message.error(`Failed to delete template`);
        });
      // .finally(() => {
      //   setTimeout(() => {
      //     // setFetching(false); // Set fetching to false after 0.5 seconds
      //   }, 1000); // 1 second delay
      // });
    } else {
      // setFetching(false); // Set fetching to false if Id is not provided
    }
  };

  if (fetching) {
    return (
      <ViewContainer>
        <Title level={3}>Template</Title>
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

  if (error || !templateData) {
    return (
      <ViewContainer>
        <Title level={3}>Template</Title>
        <Result
          status="404"
          title="404"
          subTitle="No Template exists with this ID."
          extra={
            <PrimaryButton onClick={reDirectToHome}>Back Home</PrimaryButton>
          }
        />
      </ViewContainer>
    );
  }

  return (
    <ViewContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Title level={3}>Template</Title>
        <ButtonContainer>
          <PrimaryButton icon={<PlusOutlined />} onClick={handleNewTemplate}>
            New Template
          </PrimaryButton>
          <PrimaryButton
            danger
            icon={<DeleteOutlined />}
            onClick={handleDeleteTemplate}
          >
            Delete Template
          </PrimaryButton>
        </ButtonContainer>
      </div>
      <LineHeader />

      <EditInfoTemplate template={templateData} />
    </ViewContainer>
  );
}

export default ViewTemplate;

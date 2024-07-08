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
import EditInfoTemplate from "./EditInfoTemplate/EditInfoTemplate";

// Types
import { TemplateType } from "../../../../types/template";
import {
  reDirectToHome,
  reDirectToTemplates,
} from "../../../../pages/paths.utils";

// Interfaces
interface RouteParams extends Record<string, string | undefined> {
  Id: string;
}

// interface TemplateObject {
//   template: TemplateType;
//   content: string;
//   createdBy: string;
// }

// Server Fetch
const fetchTemplateData = async (id: string, token: string) => {
  try {
    const response = await axios.get(`api/v1/templates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Template data:", error);
    return null; // Return null on error
  }
};

// const deleteTemplate = async (id: string, token: string) => {
//   try {
//     const response = await axios.get(`api/v1/templates/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error Deleting Template:", error);
//     throw error;
//   }
// };

function ViewTemplate() {
  // Get the ID value from the URL
  const { Id } = useParams<RouteParams>();

  // Redux States
  const token = useSelector((state: MainState) => state.token);

  // Use States
  const [templateData, setTemplateData] = useState<TemplateType | null>(null);
  const [fetching, setFetching] = useState(true); // Initially set fetching to true
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Id) {
      setError(false); // Reset error state
      // Get Employee Info
      fetchTemplateData(Id, token)
        .then((response) => {
          if (response) {
            setTemplateData(response);
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

  // // const handleNewTemplate = () => {
  // //   // Navigate to the desired route using history.push
  // //   navigate("/templates/new"); // Replace with your actual route
  // // };

  // const handleDeleteTemplate = () => {
  //   if (Id) {
  //     deleteTemplate(Id, token)
  //       .then((response) => {
  //         if (response) {
  //           // setTemplateData(response);
  //           message.success("Template deleted successfully");
  //           // Redirect to Template
  //           reDirectToTemplates("all");
  //         }
  //       })
  //       .catch(() => {
  //         message.error(`Failed to delete template`);
  //       });
  //     // .finally(() => {
  //     //   setTimeout(() => {
  //     //     // setFetching(false); // Set fetching to false after 0.5 seconds
  //     //   }, 1000); // 1 second delay
  //     // });
  //   } else {
  //     // setFetching(false); // Set fetching to false if Id is not provided
  //   }

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
    // <ViewTemplateContainer>
    <>
      <Title level={3}>Template</Title>
      <LineHeader />
      {/* <ButtonContainer>
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
      <EditInfoTemplate templateID={parseInt(templateID)} /> */}
    </>
    // </ViewTemplateContainer>
  );
}

export default ViewTemplate;

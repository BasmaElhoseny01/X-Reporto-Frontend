/*eslint-disable*/
import React from "react";

// Services
import axios from "../../../../../services/apiService";

// Context
import { useAnnotations } from "../AnnotationProvider";

// Ant Design
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";

// Styled Components
import {
  BBFindingsSectionContainer,
  BBFindingTitleContainer,
  BBFindingButtonsContainer,
  BBAllFindingsContainer,
  BBFindingContainer,
  StyledTextArea,
  ButtonContainer,
} from "./BBSection.Styles";

// Components
import LineHeader from "../../../../common/LineHeader/LineHeader";
import FindingText from "./FindingText/FindingText";
import SecondaryButton from "../../../../common/SecondaryButton/SecondaryButton";

// Assets
import BotBlue from "../../../../../assets/images/bot-blue.svg";
import BotRed from "../../../../../assets/images/bot-red.svg";
import BotGray from "../../../../../assets/images/bot-grey.svg";

import { Empty, Input, message } from "antd";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import { ResultType } from "../../../../../types/Result";
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state";
import { Region } from "../XRay.types";

// Interface
interface BBSectionProps {
  // Props Here
  useAI: boolean;
  toggleUseAI: () => void;
  bot_img_blue: string;
  bot_img_grey: string;

  lmResultData: ResultType;
  customResultData: ResultType;
  originalXRayPath: string | null;
  case_id: number | null;
}

// Server APIS
const createCustomResult = async (
  study_id: number,
  xray_path: string | null,
  token: string
): Promise<ResultType | null> => {
  try {
    const response = await axios.post(
      `api/v1/results`,
      {
        result_name: "Custom Result",
        type: "custom",
        xray_path: xray_path,
        study_id: study_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
          "Content-Type": "application/json", // Optional: Include if required by your API
        },
      }
    );
    console.log("Custom Result Created: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating custom result: ", error);
    return null;
  }
};

const uploadBBoxesFile = async (
  regions: Region[],
  resultId: string | number,
  token: string
) => {
  try {
    // console.log("Uploading BBoxes ......");
    // console.log("Text: ", regions);

    const text = regions
      .map((region, index) => {
        const { x, y, width, height } = region.box;
        return `${index} ${x} ${y} ${width} ${height}`;
      })
      .join("\n");
    // console.log("Text: ", text);

    const blob = new Blob([text], {
      type: "text/plain",
    });
    const formData = new FormData();
    formData.append("boxes", blob);

    const response = await axios.post(
      `api/v1/results/${resultId}/upload_boxes`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading BBoxes: ", error);
    return null;
  }
};

const uploadRegionSentences = async (
  Regions: Region[],
  resultId: string | number,
  token: string
) => {
  try {
    // console.log("Regions: ", Regions);
    const sentences = Regions.map((region) => region.finding).join("\n");
    // console.log("sentences: ", sentences);

    const blob = new Blob([sentences], {
      type: "text/plain",
    });
    const formData = new FormData();
    formData.append("sentences", blob);

    const response = await axios.post(
      `api/v1/results/${resultId}/upload_sentences`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading Region Sentences: ", error);
    return null;
  }
};

function BBSection(props: BBSectionProps) {
  const {
    useAI,
    toggleUseAI,
    bot_img_blue,
    bot_img_grey,
    lmResultData,
    customResultData,
    originalXRayPath,
    case_id,
  } = props;

  const token = useSelector((state: MainState) => state.token);

  const {
    selectedAnnotation,
    annotations,
    handleCEditAnnotationTitle,
    handleEditAnnotationFinding,
  } = useAnnotations();

  const handelSaveResult = async () => {
    try {
      let result: ResultType | null = customResultData;
      if (!customResultData || true) {
        // Create New Custom Result
        console.log("Creating New Custom");
        if (case_id) {
          const response = await createCustomResult(
            case_id,
            lmResultData ? lmResultData.xray_path : originalXRayPath,
            token
          );
          console.log("Response: ", response);
          result = response;
        } else {
          throw new Error("Case ID is null");
        }
      }
      // Upload BBoxes to the result
      console.log("Saving Result ......: ", result);
      if (result) {
        const BBoxesResponse = await uploadBBoxesFile(
          annotations,
          result.id,
          token
        );
        console.log("BBoxesResponse: ", BBoxesResponse);
        if (BBoxesResponse) {
          message.success("Result saved successfully");

          // Upload Region Sentences
          const SentencesResponse = await uploadRegionSentences(
            annotations,
            result.id,
            token
          );
          console.log("SentencesResponse: ", SentencesResponse);
        } else {
          throw new Error("Failed to upload BBoxes");
        }
      } else {
        throw new Error("Failed to create custom result");
      }
    } catch (error) {
      message.error("failed to save result");
      console.error("Error Saving Result: ", error);
    }
  };

  return (
    <BBFindingsSectionContainer>
      {/* All findings in 1 paragraph */}
      <BBAllFindingsContainer>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={3}>All Findings</Title>
          <img
            src={useAI ? bot_img_blue : bot_img_grey}
            alt="Bot"
            style={{ width: 40, height: 40, cursor: "pointer" }}
            onClick={toggleUseAI}
          />
        </div>
        <LineHeader />
        <Paragraph>
          {annotations.map((region) => (
            <FindingText
              key={region.id}
              region={region}
              selected={region.id == selectedAnnotation?.id}
            />
          ))}
        </Paragraph>
      </BBAllFindingsContainer>
      <BBFindingContainer>
        <Title level={3}>Region Finding</Title>
        <LineHeader />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            // backgroundColor: "grey",
          }}
        >
          <BBFindingTitleContainer>
            <label
              style={{
                width: "100%",
              }}
            >
              Region
              <Input
                value={selectedAnnotation?.title}
                disabled={!selectedAnnotation}
                onChange={(e) => {
                  if (selectedAnnotation) {
                    handleCEditAnnotationTitle(
                      selectedAnnotation?.id,
                      e.target.value
                    );
                  }
                }}
              />
            </label>
            {/* <img
              src={
                selectedAnnotation
                  ? selectedAnnotation?.ai
                    ? BotBlue
                    : BotRed
                  : BotGray
              }
            /> */}
          </BBFindingTitleContainer>
          <StyledTextArea
            value={selectedAnnotation?.finding}
            disabled={!selectedAnnotation}
            onChange={(e) => {
              if (selectedAnnotation) {
                handleEditAnnotationFinding(
                  selectedAnnotation.id,
                  e.target.value
                );
              }
            }}
            style={{
              fontSize: "18px",
              width: "100%",
            }}
          />
        </div>
      </BBFindingContainer>

      <ButtonContainer>
        <PrimaryButton onClick={handelSaveResult} size="large">
          Save
        </PrimaryButton>
      </ButtonContainer>
    </BBFindingsSectionContainer>
  );
}

export default BBSection;

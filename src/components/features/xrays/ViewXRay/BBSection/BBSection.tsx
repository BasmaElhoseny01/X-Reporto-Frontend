/* eslint-disable*/
import React, { useEffect } from "react";

// Services
import axios from "../../../../../services/apiService";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../../state";

// Context
import { useAnnotations } from "../AnnotationProvider";

// Ant Design
import Title from "antd/es/typography/Title";
import { message, Select } from "antd";

// Styled Components
import {
  BBFindingsSectionContainer,
  BBFindingTitleContainer,
  BBAllFindingsContainer,
  BBFindingContainer,
  StyledTextArea,
  ButtonContainer,
  StyledParagraph,
} from "./BBSection.Styles";

// Components
import LineHeader from "../../../../common/LineHeader/LineHeader";
import FindingText from "./FindingText/FindingText";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";

// Types
import { ResultType } from "../../../../../types/Result";
import { Region } from "../XRay.types";

// Server Fetch
import {
  createCustomResult,
  GenerateReport,
  updateCustomResult,
} from "../ViewXRay.Server";

// Constants
import {
  anatomicalRegions,
  anatomicalRegionsIndexToKey,
} from "../../../../../constants/anatomicalRegions";

// Interface
interface BBSectionProps {
  // Props Here
  useAI: boolean;
  setUseAITrue: () => void;
  toggleUseAI: () => void;
  botImgBlue: string;
  botImgGrey: string;

  llmResultData: ResultType;
  customResultData: ResultType;
  setLmResultData: (data: ResultType) => void;
  setCustomResultData: (data: ResultType) => void;
  // originalXRayPath: string | null;
  xRayPath: string | null;
  caseId: number | null;
}

// Server APIS
const uploadBBoxesFile = async (
  regions: Region[],
  resultId: string | number,
  token: string
) => {
  try {
    // console.log("Uploading BBoxes ......");
    // console.log("Text: ", regions);

    const text = regions
      .map((region) => {
        const { x, y, width, height } = region.box;
        const regionId = region.title_id;
        return `${regionId} ${x} ${y} ${width} ${height}`;
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
      `api/v1/results/${resultId}/upload_boxes_sentences`,
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
    setUseAITrue, // use this only after saving llm result
    toggleUseAI,
    botImgBlue,
    botImgGrey,
    llmResultData,
    customResultData,
    setLmResultData,
    setCustomResultData,
    xRayPath,
    caseId,
  } = props;

  const token = useSelector((state: MainState) => state.token);

  const {
    selectedAnnotation,
    annotations,
    // handleCEditAnnotationTitle,
    handleEditAnnotationRegionMapping,
    handleEditAnnotationFinding,
    handleSelectAnnotation,
    existUnassigned,
  } = useAnnotations();

  useEffect(() => {
    console.log("BBSection....");
    // console.log("BBSection ", props);

    // Deselect Annotation when switching between AI and Custom
    handleSelectAnnotation(null);
  }, [useAI, llmResultData, customResultData]);

  const handelSaveResult = async () => {
    try {
      // check if there exist unassigned regions
      if (existUnassigned()) {
        message.error("Some boxes are not assigned to any region");
        return;
      }
      let result: ResultType | null = customResultData;

      if (!result) {
        // Create New Custom Result
        console.log("Creating New Custom With image_path: ", xRayPath);

        if (!caseId) throw new Error("Case ID is null");
        const resultResponse = await createCustomResult(
          caseId,
          xRayPath,
          token
        );
        console.log("resultResponse: ", resultResponse);
        if (!resultResponse) throw new Error("Failed to create custom result");
        result = resultResponse;
      }
      if (result.xray_path != xRayPath) {
        console.log("Updating XRay Path");
        console.log("Old XRay Path: ", result.xray_path);
        console.log("New XRay Path: ", xRayPath);
        console.log("Result ID: ", result.id);

        // need to update the xray path
        if (!caseId) throw new Error("Case ID is null");
        const updatedResult = await updateCustomResult(
          // case_id,
          result.id,
          xRayPath,
          token
        );
        console.log("updatedResult: ", updatedResult);
        if (!updatedResult) throw new Error("Failed to update custom result");
        result = updatedResult;
      } else {
        console.log("Same XRay Path");
      }
      // (1) Upload BBoxes to the result
      console.log("Saving to Custom Result ......: ", result);
      const BBoxesResponse = await uploadBBoxesFile(
        annotations,
        result.id,
        token
      );
      console.log("BBoxesResponse: ", BBoxesResponse);
      if (!BBoxesResponse) throw new Error("Failed to upload BBoxes");
      // (2) Upload Region Sentences to the result
      const SentencesResponse = await uploadRegionSentences(
        annotations,
        result.id,
        token
      );
      console.log("SentencesResponse: ", SentencesResponse);
      if (!SentencesResponse) new Error("Failed to upload Sentences");
      setCustomResultData(SentencesResponse);
      message.success("Result saved successfully");
    } catch (error) {
      message.error("failed to save result");
      console.error("Error in handelSaveResult(): ", error);
    }
  };

  type OptionType = {
    value: number;
    label: string;
    disabled?: boolean;
  };

  const regionSelectOptions: OptionType[] = Object.entries(
    anatomicalRegions
  ).map(([region_name, region_index]) => ({
    value: region_index,
    label: region_name,
    disabled: annotations.some(
      (annotation) => annotation.title_id === region_index
    ),
  }));

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
            src={useAI ? botImgBlue : botImgGrey}
            alt="Bot"
            style={{ width: 40, height: 40, cursor: "pointer" }}
            onClick={toggleUseAI}
          />
        </div>
        <LineHeader />
        <StyledParagraph>
          {annotations.map((region) => (
            <FindingText
              key={region.id}
              region={region}
              selected={region.id == selectedAnnotation?.id}
            />
          ))}
        </StyledParagraph>
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
            <label>Region</label>
            <Select
              showSearch
              value={
                selectedAnnotation && selectedAnnotation?.title_id != -1
                  ? anatomicalRegionsIndexToKey[selectedAnnotation?.title_id]
                  : undefined
              }
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              disabled={!selectedAnnotation}
              options={regionSelectOptions}
              /*eslint-disable-next-line*/
              onChange={(value, option) => {
                if (selectedAnnotation) {
                  // console.log("Selected: ", value);
                  // console.log("Option: ", option);
                  handleEditAnnotationRegionMapping(
                    selectedAnnotation.id,
                    Number(value)
                  );
                }
              }}
            />
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
        </PrimaryButton>{" "}
        <PrimaryButton
          onClick={() =>
            GenerateReport(caseId, token, setLmResultData, setUseAITrue)
          }
          size="large"
        >
          Generate Report
        </PrimaryButton>
      </ButtonContainer>
    </BBFindingsSectionContainer>
  );
}

export default BBSection;

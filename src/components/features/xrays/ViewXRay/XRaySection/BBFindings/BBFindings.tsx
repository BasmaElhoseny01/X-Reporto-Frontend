import React from "react";
/* eslint-disable @typescript-eslint/no-unused-vars */

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
} from "./BBFindings.Styles";

// Components
import LineHeader from "../../../../../common/LineHeader/LineHeader";
import FindingText from "./FindingText/FindingText";
import SecondaryButton from "../../../../../common/SecondaryButton/SecondaryButton";

// Assets
import BotBlue from "../../../../../../assets/images/bot-blue.svg";
import BotRed from "../../../../../../assets/images/bot-red.svg";
import { Empty } from "antd";

function BBFindings() {
  const {
    selectedAnnotation,
    annotations,
    handleCEditAnnotationTitle,
    handleEditAnnotationFinding,
  } = useAnnotations();

  return (
    <BBFindingsSectionContainer>
      <Title level={2}>Region Findings</Title>
      <BBFindingContainer>
        {selectedAnnotation && (
          <>
            <BBFindingTitleContainer>
              <Title
                level={3}
                editable={{
                  onChange: (newTitle) =>
                    handleCEditAnnotationTitle(selectedAnnotation.id, newTitle),
                }}
              >
                {selectedAnnotation.title}
              </Title>
              <img src={selectedAnnotation.ai ? BotBlue : BotRed} />
            </BBFindingTitleContainer>
            <LineHeader />
            <Text
              editable={{
                onChange: (newFinding) =>
                  handleEditAnnotationFinding(
                    selectedAnnotation.id,
                    newFinding
                  ),
              }}
              style={{
                fontSize: "18px",
              }}
            >
              {selectedAnnotation.finding}
            </Text>
            <BBFindingButtonsContainer>
              <SecondaryButton
                onClick={() => console.log("Reset Finding")}
                disabled={selectedAnnotation.ai}
              >
                Reset AI
              </SecondaryButton>
            </BBFindingButtonsContainer>
          </>
        )}

        {!selectedAnnotation && (
          <Empty
            style={{ width: "100%", height: "100%" }}
            description="No Region Selected"
          />
        )}
      </BBFindingContainer>
      {/* All findings in 1 paragraph */}
      <BBAllFindingsContainer>
        <Title level={3}>All Findings</Title>
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
    </BBFindingsSectionContainer>
  );
}

export default BBFindings;

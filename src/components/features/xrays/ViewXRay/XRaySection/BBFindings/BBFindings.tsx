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

function BBFindings() {
  const { selectedAnnotation, annotations } = useAnnotations();

  return (
    <BBFindingsSectionContainer>
      <BBFindingContainer>
        {selectedAnnotation && (
          <>
            <BBFindingTitleContainer>
              <Title
                level={4}
                editable={{ onChange: () => console.log("Editing") }}
              >
                {selectedAnnotation.title}
              </Title>
              <img src={selectedAnnotation.ai ? BotBlue : BotRed} />
            </BBFindingTitleContainer>
            <LineHeader />
            <Text
              editable={{ onChange: () => console.log("Editing Findings") }}
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
          <>
            <Title level={4}>No Findings</Title>
            <LineHeader />
            <Paragraph>
              No findings have been added. Please click on the image to add
              findings.
            </Paragraph>
          </>
        )}
      </BBFindingContainer>

      {/* All findings in 1 paragraph */}
      <BBAllFindingsContainer>
        <Title level={4}>All Findings</Title>
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

import React from "react";
/* eslint-disable @typescript-eslint/no-unused-vars */

// Ant Design
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";

// Styled Components
import { BBFindingsContainer } from "./BBFindings.Styles";

// Components
import LineHeader from "../../../../../common/LineHeader/LineHeader";
import FindingText from "./FindingText/FindingText";

// Context
import { useAnnotations } from "../AnnotationProvider";

type BBFindingsProps = {
  //   region: string;
  //   setRegion: (value: string) => void;
  //   finding: string;
  //   setFinding: (value: string) => void;
};

type Region = {
  id: string;
  title: string;
  finding: string;
};

function BBFindings(props: BBFindingsProps) {
  //   const { region, setRegion, finding, setFinding } = props;
  //   const [editableStr, setEditableStr] = useState<string>(
  //     "lung volumes are slightly lower with associated crowding of bronchovascular structures."
  //   );

  const { selectedAnnotation, handleSelectAnnotation, annotations } =
    useAnnotations();

  return (
    <BBFindingsContainer>
      {selectedAnnotation && (
        <>
          <Title
            level={4}
            editable={{ onChange: () => console.log("Editing") }}
          >
            {selectedAnnotation.title}
          </Title>
          <LineHeader />
          <Text
            editable={{ onChange: () => console.log("Editing Findings") }}
            style={{
              fontSize: "18px",
            }}
          >
            {selectedAnnotation.finding}
          </Text>
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

      {/* All findings in 1 paragraph */}
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
        {/* {allFindings.map((item) => (
          <FindingText key={item.id} {...item} />
        ))} */}
      </Paragraph>
    </BBFindingsContainer>
  );
}

export default BBFindings;

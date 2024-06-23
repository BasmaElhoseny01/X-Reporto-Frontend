import React, { useState } from "react";
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
  const [region, setRegion] = useState<string>("Lung");
  const [finding, setFinding] = useState<string>(
    "Lung volumes are slightly lower with associated crowding of bronchovascular structures."
  );

  const [allFindings, setAllFindings] = useState<Region[]>([
    {
      id: "1",
      title: "Lung",
      finding:
        "Lung volumes are slightly lower with associated crowding of bronchovascular structures.",
    },
    {
      id: "2",
      title: "Heart",
      finding: "Heart is normal in size and shape.",
    },
    {
      id: "3",
      title: "Diaphragm",
      finding: "Diaphragm is normal in shape and position.",
    },
  ]);

  return (
    <BBFindingsContainer>
      <Title level={4} editable={{ onChange: setRegion }}>
        {region}
      </Title>
      <LineHeader />
      <Text
        editable={{ onChange: setFinding }}
        style={{
          fontSize: "18px",
        }}
      >
        {finding}
      </Text>

      {/* All findings in 1 paragraph */}
      <Title level={4}>All Findings</Title>
      <LineHeader />
      <Paragraph>
        {allFindings.map((item) => (
          <FindingText key={item.id} {...item} />
        ))}
      </Paragraph>
    </BBFindingsContainer>
  );
}

export default BBFindings;

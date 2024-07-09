import React from "react";

import { HeatMapSectionContainer } from "./HeatMapSection.Styles";
import { LineHeader, Title } from "./HeatMapSection.Styles";

import InputRow from "./InputRow";
import { ResultType } from "../../../../../types/study";

// Interface for HeatMapSection
interface HeatMapSectionProps {
  // Props Here
  templateResultData: ResultType;
}
function HeatMapSection(props: HeatMapSectionProps) {
  console.log("HeatMapSection Props: ", props);
  // const { templateResultData } = props;

  return (
    <HeatMapSectionContainer>
      <Title justify="flex-start">Findings</Title>
      <LineHeader />
      <InputRow />
    </HeatMapSectionContainer>
  );
}

export default HeatMapSection;

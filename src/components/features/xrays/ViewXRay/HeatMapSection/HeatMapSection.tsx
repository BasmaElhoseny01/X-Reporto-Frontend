import React from "react";

import { HeatMapSectionContainer } from "./HeatMapSection.Styles";
import { LineHeader, Title } from "./HeatMapSection.Styles";

import InputRow from "./InputRow";
import { ResultType } from "../../../../../types/Result";

// Interface for HeatMapSection
interface HeatMapSectionProps {
  // Props Here
  templateResultData: ResultType;
  setTemplateResultData: (value: ResultType) => void;
}
function HeatMapSection(props: HeatMapSectionProps) {
  console.log("HeatMapSection Props: ", props);
  // const { templateResultData,setTemplateResultData } = props;

  return (
    <HeatMapSectionContainer>
      <Title justify="flex-start">Findings</Title>
      <LineHeader />
      <InputRow />
    </HeatMapSectionContainer>
  );
}

export default HeatMapSection;

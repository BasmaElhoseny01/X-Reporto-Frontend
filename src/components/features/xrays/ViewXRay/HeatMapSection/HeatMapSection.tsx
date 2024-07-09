import React from "react";

import { HeatMapSectionContainer } from "./HeatMapSection.Styles";
import { LineHeader, Title } from "./HeatMapSection.Styles";

import InputRow from "./InputRow";
import { ResultType } from "../../../../../types/Result";

// Interface for HeatMapSection
interface HeatMapSectionProps {
  // Props Here
  useAI: boolean;
  toggleUseAI: () => void;
  bot_img_blue: string;
  bot_img_grey: string;

  templateResultData: ResultType;
  customResultData: ResultType;
  case_id: number | null;
}
function HeatMapSection(props: HeatMapSectionProps) {
  console.log("HeatMapSection Props: ", props);
  const {
    useAI,
    toggleUseAI,
    bot_img_blue,
    bot_img_grey,
    templateResultData,
    customResultData,
    case_id,
  } = props;
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

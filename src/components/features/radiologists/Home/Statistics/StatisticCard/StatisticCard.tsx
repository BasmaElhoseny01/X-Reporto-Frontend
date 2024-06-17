import React from "react";

// Styled Components
import { StatisticCardContainer } from "./StatisticCard.Styles";

// Antd Components
import { Badge } from "antd";

// Third Party Components
import CountUp from "react-countup";

// Components
import PrimaryButton from "../../../../../common/PrimaryButton/PrimaryButton";

// Interface props for StatisticCard
interface StatisticCardProps {
  // Define props here

  status:
    | "your_pending"
    | "your_submitted"
    | "all_pending"
    | "all_new"
    | "all_submitted";

  text: string;

  count: number;

  action: () => void;
}

function StatisticCard(props: StatisticCardProps) {
  const { text, count, action } = props;
  return (
    <StatisticCardContainer>
      <Badge status="error" text={text} />
      <CountUp end={count} duration={3} style={{ fontSize: "24px" }} />
      <PrimaryButton onClick={action}>Check</PrimaryButton>
    </StatisticCardContainer>
  );
}

export default StatisticCard;

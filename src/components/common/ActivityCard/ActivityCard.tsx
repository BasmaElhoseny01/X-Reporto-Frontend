import React from "react";

// Ant Design

// Components
import SubmitActivityCard from "./SubmitActivityCard/SubmitActivityCard";
import ViewActivityCard from "./ViewActivityCard/ViewActivityCard";
import DraftActivityCard from "./DraftActivityCard/DraftActivityCard";

// Styled Components
import { ActivityCardContainer } from "./ActivityCard.Styles";

// Assets

// Interface props for ActivityCard
interface ActivityCardProps {
  // Define props here
  type: "submit" | "view" | "draft";
}
function ActivityCard(props: ActivityCardProps) {
  const { type } = props;

  return (
    <ActivityCardContainer>
      {type === "submit" ? (
        <SubmitActivityCard />
      ) : type === "view" ? (
        <ViewActivityCard />
      ) : type === "draft" ? (
        <DraftActivityCard />
      ) : (
        <h1>Incorrect Type</h1>
      )}
    </ActivityCardContainer>
  );
}

export default ActivityCard;

import React from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../state/Reducers";

// Ant Design

// Components
// import SubmitActivityCard from "./SubmitActivityCard/SubmitActivityCard";
// import ViewActivityCard from "./ViewActivityCard/ViewActivityCard";
// import DraftActivityCard from "./DraftActivityCard/DraftActivityCard";

// Styled Components
import { ActivityCardContainer } from "./ActivityCard.Styles";
import { ActivityType } from "../../../types/activity";

// Assets

// Interface props for ActivityCard
interface ActivityCardProps {
  // Define props here
  type: ActivityType;
}
function ActivityCard(props: ActivityCardProps) {
  const { type } = props;

  const currentTheme = useSelector((state: RootState) => state.theme);

  return (
    <ActivityCardContainer isDarkTheme={currentTheme == "dark"}>
      <h1>{type}</h1>
      {/* {type === "submit" ? (
        <SubmitActivityCard />
      ) : type === "view" ? (
        <ViewActivityCard />
      ) : type === "draft" ? (
        <DraftActivityCard />
      ) : (
        <h1>Incorrect Type</h1>
      )} */}
    </ActivityCardContainer>
  );
}

export default ActivityCard;

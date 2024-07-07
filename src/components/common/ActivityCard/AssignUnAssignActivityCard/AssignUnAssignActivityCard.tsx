import React from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/Reducers";

// Ant Design
import { Typography } from "antd";

// Components
import LinkButton from "../../LinkButton/LinkButton";

// Styled Components
import { ActivityCardMiddleContainer, Link } from "../ActivityCard.Styles";

// Assets
import Draft from "../../../../assets/images/draft.svg";
import DraftDark from "../../../../assets/images/draft-dark.svg";
import { Activity } from "../../../../types/activity";

interface AssignUnAssignActivityCardProps {
  activity: Activity;

  assign?: boolean; // true if assign, false if unassign
}
function AssignUnAssignActivityCard(props: AssignUnAssignActivityCardProps) {
  const { assign, activity } = props;
  const currentTheme = useSelector((state: RootState) => state.theme);
  return assign ? (
    <>
      {/* Icon */}
      <img
        src={currentTheme === "light" ? Draft : DraftDark}
        alt="Submit"
        width={"30px"}
      />

      {/* Body */}
      <ActivityCardMiddleContainer>
        <Typography>
          You Assigned Case <Link>{activity.id}</Link> at {activity.created_at}
        </Typography>
        <Typography className="grey-color">7 days ago</Typography>
      </ActivityCardMiddleContainer>

      {/* View Button */}
      <LinkButton onClick={() => console.log("view")}>View</LinkButton>
    </>
  ) : (
    <h1>unass</h1>
  );
}

export default AssignUnAssignActivityCard;

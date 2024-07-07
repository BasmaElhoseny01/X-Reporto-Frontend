/*eslint-disable*/
import React from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../state/Reducers";

// Ant Design
import { Typography } from "antd";

// Components
import LinkButton from "../LinkButton/LinkButton";

// Styled Components
import {
  ActivityCardContainer,
  ActivityCardMiddleContainer,
  Link,
} from "./ActivityCard.Styles";
import { Activity } from "../../../types/activity";

// Utils
import { formatDate, timeAgo } from "../../../utils/dateUtils";
import { reDirectToCases } from "../../../pages/paths.utils";

// Assets
import View from "../../../assets/images/view.svg";
import ViewDark from "../../../assets/images/view-dark.svg";
import Assign from "../../../assets/images/assign.svg";
import AssignDark from "../../../assets/images/assign-dark.svg";
import UnAssign from "../../../assets/images/unassign.svg";
import UnAssignDark from "../../../assets/images/unassign-dark.svg";
import Submit from "../../../assets/images/submit.svg";
import SubmitDark from "../../../assets/images/submit-dark.svg";
import Archive from "../../../assets/images/archive.svg";
import ArchiveDark from "../../../assets/images/archive-dark.svg";
import Restore from "../../../assets/images/restore.svg";
import RestoreDark from "../../../assets/images/restore-dark.svg";

// Interface props for ActivityCard
interface ActivityCardProps {
  activity: Activity;
}

function ActivityCard(props: ActivityCardProps) {
  const { activity } = props;

  const currentTheme = useSelector((state: RootState) => state.theme);

  const Icon = () => {
    if (activity.activity_type === "view") {
      return (
        <img
          src={currentTheme === "light" ? View : ViewDark}
          alt="View"
          width={"25px"}
        />
      );
    } else if (activity.activity_type === "assign") {
      return (
        <img
          src={currentTheme === "light" ? Assign : AssignDark}
          alt="Assign"
          width={"25px"}
        />
      );
    } else if (activity.activity_type === "unassign") {
      return (
        <img
          src={currentTheme === "light" ? UnAssign : UnAssignDark}
          alt="UnAssign"
          width={"25px"}
        />
      );
    } else if (activity.activity_type === "submit") {
      return (
        <img
          src={currentTheme === "light" ? Submit : SubmitDark}
          alt="Submit"
          width={"25px"}
        />
      );
    } else if (activity.activity_type === "archive") {
      return (
        <img
          src={currentTheme === "light" ? Archive : ArchiveDark}
          alt="Archive"
          width={"25px"}
        />
      );
    } else if (activity.activity_type === "unarchive") {
      return (
        <img
          src={currentTheme === "light" ? Restore : RestoreDark}
          alt="Restore"
          width={"25px"}
        />
      );
    }
    return <h1>Incorrect Type {activity.activity_type}</h1>;
  };

  const ActionText = () => {
    if (activity.activity_type === "view") {
      return "Viewed";
    } else if (activity.activity_type === "assign") {
      return "Assigned";
    } else if (activity.activity_type === "unassign") {
      return "Unassigned";
    } else if (activity.activity_type === "submit") {
      return "Submitted";
    } else if (activity.activity_type == "archive") {
      return "Archived";
    } else if (activity.activity_type == "unarchive") {
      return "Restored";
    } else {
      return "Error";
    }
  };

  return (
    <ActivityCardContainer
      isDarkTheme={currentTheme == "dark"}
      onClick={() => reDirectToCases("view", activity.study_id)}
    >
      {/* Icon */}
      <Icon />
      {/* Body */}
      <ActivityCardMiddleContainer>
        <Typography>
          {/* You <ActionText /> X-Ray <Link>{activity.study_id}</Link> at {12-03-2024 04:00PM} */}
          You <ActionText /> Study Case{" "}
          <Link onClick={() => reDirectToCases("view", activity.study_id)}>
            {activity.study_id}
          </Link>{" "}
          at {formatDate(activity.created_at)}
        </Typography>
        <Typography>{timeAgo(activity.created_at)}</Typography>
      </ActivityCardMiddleContainer>

      {/* View Button */}
      <LinkButton onClick={() => reDirectToCases("view", activity.study_id)}>
        View
      </LinkButton>
    </ActivityCardContainer>
  );
}

export default ActivityCard;

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

// Interface props for SubmitActivityCard
// interface SubmitActivityCardProps {
//   // Define props here
// }

function DraftActivityCard() {
  const currentTheme = useSelector((state: RootState) => state.theme);

  return (
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
          You Drafted X-Ray <Link>123456666</Link> at 12-03-2024 04:00PM
        </Typography>
        <Typography className="grey-color">7 days ago</Typography>
      </ActivityCardMiddleContainer>

      {/* View Button */}
      <LinkButton onClick={() => console.log("view")}>View</LinkButton>
    </>
  );
}

export default DraftActivityCard;

import React from "react";

// Antd Components
import { Popover } from "antd";
import Text from "antd/es/typography/Text";
import { palette } from "../../../../../../../styles/theme";

// props
type FindingTextProps = {
  id: string;
  title: string;
  finding: string;
  selected?: boolean;
};

const handleTextHover = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
  const target = e.target as HTMLSpanElement;
  target.style.color = `${palette.primary}`;
  target.style.backgroundColor = `${palette.grey_light}`;
};

const handleTextLeave = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
  const target = e.target as HTMLSpanElement;
  target.style.color = "";
  target.style.backgroundColor = "";
};

function FindingText(props: FindingTextProps) {
  const { title, finding, selected } = props;
  return (
    <Popover title={title} trigger="hover" placement="bottom">
      <Text
        mark={selected}
        onClick={() => console.log("Clicked")}
        style={{
          cursor: "pointer",
          transition: "color 0.3s",
          fontSize: "18px",
        }}
        onMouseOver={handleTextHover}
        onMouseOut={handleTextLeave}
      >
        {finding}
      </Text>
    </Popover>
  );
}

export default FindingText;

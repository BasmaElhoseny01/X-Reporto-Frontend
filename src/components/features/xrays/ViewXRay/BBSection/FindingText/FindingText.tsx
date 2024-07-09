import React from "react";

// Antd Components
import { Popover } from "antd";
import Text from "antd/es/typography/Text";

// Types
import { Region } from "../../XRay.types";

// Theme
import { palette } from "../../../../../../styles/theme";
import { useAnnotations } from "../../AnnotationProvider";

// props
type FindingTextProps = {
  region: Region;
  selected: boolean;
};

function FindingText(props: FindingTextProps) {
  const { region, selected } = props;

  const { handleSelectAnnotation } = useAnnotations();

  const handleTextHover = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = e.target as HTMLSpanElement;
    target.style.color = selected ? `${palette.black}` : `${palette.primary}`;
    target.style.backgroundColor = selected
      ? `${palette.warn}`
      : `${palette.grey_light}`;
  };

  const handleTextLeave = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = e.target as HTMLSpanElement;
    target.style.color = "";
    target.style.backgroundColor = selected ? `${palette.warn}` : "";
  };

  return (
    <Popover
      //   title={region.title}
      trigger="hover"
      placement="bottom"
      content={<Text>{region.title}</Text>}
    >
      <Text
        onClick={() => handleSelectAnnotation(region.id)}
        style={{
          cursor: "pointer",
          transition: "color 0.3s",
          fontSize: "18px",
          backgroundColor: selected ? `${palette.warn}` : "",
        }}
        onMouseOver={handleTextHover}
        onMouseOut={handleTextLeave}
      >
        {region.finding}
      </Text>
    </Popover>
  );
}

export default FindingText;

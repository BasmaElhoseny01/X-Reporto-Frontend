import React from "react";

// Antd Components
import { Tooltip } from "antd";

// Styled Components
import { ToolBarIconButton } from "./ToolBarIcon.Styles";

// Props Types
type ToolBarIconProps = {
  img: string;
  tip: string;
  selected?: boolean;
  onClick?: () => void;
};

function ToolBarIcon(props: ToolBarIconProps) {
  const { img, tip, selected, onClick } = props;
  return (
    <Tooltip title={tip} placement="bottom">
      <ToolBarIconButton isSelected={selected} onClick={onClick}>
        <img src={img} />
      </ToolBarIconButton>
    </Tooltip>
  );
}

export default ToolBarIcon;

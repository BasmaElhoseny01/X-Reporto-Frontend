import React from "react";

// Styled Components
import { ToolBarContainer } from "./ToolBar.Styles";

// Components
import ToolBarIcon from "../../../../../common/ToolBarIcon/ToolBarIcon";

// Types
import { Tools } from "../XRaySection.types";

// Assets
import Select from "../../../../../../assets/images/select.svg";
import SelectSelected from "../../../../../../assets/images/select-selected.svg";
import Draw from "../../../../../../assets/images/draw.svg";
import DrawSelected from "../../../../../../assets/images/draw-selected.svg";
import Move from "../../../../../../assets/images/move.svg";
import MoveSelected from "../../../../../../assets/images/move-selected.svg";

type ToolBarProps = {
  tools: Tools;
  setTools: React.Dispatch<React.SetStateAction<Tools>>;
};

function ToolBar(props: ToolBarProps) {
  const { tools, setTools } = props;

  const updateNavTool = (tool: string) => {
    console.log("tool", tool);
    setTools({ ...tools, navTool: tool as "select" | "draw" | "move" });
  };
  return (
    <ToolBarContainer>
      <ToolBarIcon
        img={tools.navTool == "select" ? SelectSelected : Select}
        tip="select"
        selected={tools.navTool == "select"}
        onClick={() => updateNavTool("select")}
      />
      <ToolBarIcon
        img={tools.navTool == "draw" ? DrawSelected : Draw}
        tip="draw"
        selected={tools.navTool == "draw"}
        onClick={() => updateNavTool("draw")}
      />
      <ToolBarIcon
        img={tools.navTool == "move" ? MoveSelected : Move}
        tip="move"
        selected={tools.navTool == "move"}
        onClick={() => updateNavTool("move")}
      />

      {/* Vertical Divider */}
      <div
        style={{
          height: "80%",
          borderLeft: "2px solid #e8e8e8",
          margin: "0 10px",
        }}
      />
    </ToolBarContainer>
  );
}

export default ToolBar;

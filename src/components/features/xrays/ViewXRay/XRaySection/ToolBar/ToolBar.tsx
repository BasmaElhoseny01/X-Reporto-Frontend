import React from "react";

// Context
import { useTools } from "../ToolProvider";

// Styled Components
import { ToolBarContainer } from "./ToolBar.Styles";
import { useAnnotations } from "../AnnotationProvider";

// Components
import ToolBarIcon from "../../../../../common/ToolBarIcon/ToolBarIcon";

// Assets
import Select from "../../../../../../assets/images/select.svg";
import SelectSelected from "../../../../../../assets/images/select-selected.svg";
import Draw from "../../../../../../assets/images/draw.svg";
import DrawSelected from "../../../../../../assets/images/draw-selected.svg";
import Move from "../../../../../../assets/images/move.svg";
import MoveSelected from "../../../../../../assets/images/move-selected.svg";
import Delete from "../../../../../../assets/images/delete.svg";

function ToolBar() {
  const { navTool, handleChangeNavTool } = useTools();
  const { selectedAnnotation, handleSelectAnnotation, handleRemoveAnnotation } =
    useAnnotations();

  const updateNavTool = (tool: string) => {
    console.log("tool", tool);
    handleChangeNavTool(tool as "select" | "draw" | "move");
  };
  return (
    <ToolBarContainer>
      <ToolBarIcon
        img={navTool == "select" ? SelectSelected : Select}
        tip="select"
        selected={navTool == "select"}
        onClick={() => updateNavTool("select")}
      />
      <ToolBarIcon
        img={navTool == "draw" ? DrawSelected : Draw}
        tip="draw"
        selected={navTool == "draw"}
        onClick={() => updateNavTool("draw")}
      />
      <ToolBarIcon
        img={navTool == "move" ? MoveSelected : Move}
        tip="move"
        selected={navTool == "move"}
        onClick={() => {
          // Deselect annotation
          handleSelectAnnotation(null);
          updateNavTool("move");
        }}
      />

      {/* Vertical Divider */}
      <div
        style={{
          height: "80%",
          borderLeft: "2px solid #e8e8e8",
          margin: "0 10px",
        }}
      />
      <ToolBarIcon
        img={Delete}
        tip="delete"
        selected={false}
        onClick={() => {
          if (selectedAnnotation) {
            handleRemoveAnnotation(selectedAnnotation);
          }
        }}
      />
    </ToolBarContainer>
  );
}

export default ToolBar;

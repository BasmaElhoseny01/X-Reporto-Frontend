import React from "react";

// Context
import { useTools } from "../ToolProvider";

// Styled Components
import { ToolBarContainer, VerticalDivider } from "./ToolBar.Styles";
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

import HideBoxes from "../../../../../../assets/images/hide-boxes.svg";
import HideBoxesSelected from "../../../../../../assets/images/hide-boxes-selected.svg";

function ToolBar() {
  const { navTool, handleChangeNavTool, hideBoxes, handleToggleHideBoxes } =
    useTools();
  const { selectedAnnotation, handleSelectAnnotation, handleRemoveAnnotation } =
    useAnnotations();

  const updateNavTool = (tool: string) => {
    console.log("tool", tool);
    handleChangeNavTool(tool as "select" | "draw" | "move");
  };
  return (
    <ToolBarContainer>
      {/* NavTools Section */}
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
        onClick={() => {
          // Deselect annotation
          handleSelectAnnotation(null);
          updateNavTool("draw");
        }}
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

      <VerticalDivider />

      {/* Section */}
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

      <VerticalDivider />

      {/* ViewTools Section */}
      <ToolBarIcon
        img={hideBoxes ? HideBoxesSelected : HideBoxes}
        tip="hide boxes"
        selected={false}
        onClick={() => {
          handleToggleHideBoxes();
        }}
      />
    </ToolBarContainer>
  );
}

export default ToolBar;

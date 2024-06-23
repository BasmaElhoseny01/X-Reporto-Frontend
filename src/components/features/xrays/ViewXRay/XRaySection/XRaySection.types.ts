export type NavTools = "select" | "zoom" | "draw" | "move";

export type Tools = {
  navTool: NavTools;
  hideBoxes: boolean;
};

export type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
};

export type stagePropertiesType = {
  stageScale: number;
  stageX: number;
  stageY: number;
};

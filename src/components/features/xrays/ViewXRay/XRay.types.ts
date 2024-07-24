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
};

export type Region = {
  id: string;
  // title: string;
  title_id: number;
  finding?: string;
  box: Box;
};

export type stagePropertiesType = {
  stageScale: number;
  stageX: number;
  stageY: number;
};

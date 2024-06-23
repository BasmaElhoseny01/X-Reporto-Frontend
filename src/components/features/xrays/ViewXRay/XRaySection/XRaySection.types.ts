export type Tools = {
  navTool: "select" | "draw" | "move";
  hideBoxes: boolean;
};

export type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
};

import { ActionType } from "../ActionType";
interface Token {
  type: ActionType.CHANGE_TOKEN;
  payload: string;
}
interface UserName {
  type: ActionType.CHANGE_USERNAME;
  payload: string;
}

interface Id {
  type: ActionType.CHANGE_ID;
  payload: number;
}

interface Drawer{
  type: ActionType.CHANGE_DRAWER;
  payload: number;
}

interface Theme {
  type: ActionType.CHANGE_THEME;
  payload: string;
}

export type Action = Token | UserName | Id | Theme|Drawer;

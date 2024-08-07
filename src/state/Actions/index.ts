import { ActionType } from "../ActionType";
import { UserType } from "../../types/user";
import { CaseType } from "../../types/case";

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

interface User {
  type: ActionType.CHANGE_USER;
  payload: UserType;
}

interface Case {
  type: ActionType.CHANGE_CASE;
  payload: CaseType;
}

interface Drawer {
  type: ActionType.CHANGE_DRAWER;
  payload: string;
}

interface Theme {
  type: ActionType.CHANGE_THEME;
  payload: string;
}

interface TableSearch {
  type: ActionType.CHANGE_TABLE_SEARCH;
  payload: string;
}

export type Action =
  | Token
  | UserName
  | Id
  | Theme
  | Drawer
  | TableSearch
  | User
  | Case;

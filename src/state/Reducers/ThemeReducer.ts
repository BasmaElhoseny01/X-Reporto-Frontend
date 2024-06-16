import { Action } from "../Actions/index";
import { ActionType } from "../ActionType";

const initialState: "light" | "dark" = "light"; // or whatever your default theme is

const themeReducer = (
  state: "light" | "dark" = initialState,
  action: Action
): string => {
  switch (action.type) {
    case ActionType.CHANGE_THEME:
      return action.payload;
    default:
      return state;
  }
};
export default themeReducer;

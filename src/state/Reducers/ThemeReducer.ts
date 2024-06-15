import { Action } from "../Actions/index";
import { ActionType } from "../ActionType";

const initialState: string = "dark"; // or whatever your default theme is

const themeReducer = (state: string = initialState, action: Action): string => {
  switch (action.type) {
    case ActionType.CHANGE_THEME:
      return action.payload;
    default:
      return state;
  }
};
export default themeReducer;

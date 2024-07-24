import { Action } from "../Actions/index";
import { ActionType } from "../ActionType";

const reducer = (state: string="Home" , action: Action): string => {
  switch (action.type) {
    case ActionType.CHANGE_DRAWER:
      return action.payload;
    default:
      return state;
  }
};
export default reducer;
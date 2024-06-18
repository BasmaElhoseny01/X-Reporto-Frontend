import { Action } from "../Actions/index";
import { ActionType } from "../ActionType";

const reducer = (state: string="" , action: Action): string => {
  switch (action.type) {
    case ActionType.CHANGE_TABLE_SEARCH:
      return action.payload;
    default:
      return state;
  }
};
export default reducer;
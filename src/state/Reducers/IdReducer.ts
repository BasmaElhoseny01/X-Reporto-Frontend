import { Action } from "../Actions/index";
import { ActionType } from "../ActionType";

const reducer = (state: number=0 , action: Action): number => {
  switch (action.type) {
    case ActionType.CHANGE_ID:
      return action.payload;
    default:
      return state;
  }
};
export default reducer;
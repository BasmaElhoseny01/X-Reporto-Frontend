import { CaseType } from "../../types/case";
import { Action } from "../Actions/index";
import { ActionType } from "../ActionType";

const initialState = null;

const CaseReducer = (
  state: CaseType = initialState,
  action: Action
): CaseType => {
  switch (action.type) {
    case ActionType.CHANGE_CASE:
      return action.payload;
    default:
      return state;
  }
};
export default CaseReducer;

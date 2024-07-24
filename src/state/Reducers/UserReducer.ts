import { UserType } from "../../types/user";
import { Action } from "../Actions/index";
import { ActionType } from "../ActionType";

// reducers/userReducer.js or reducers/userReducer.ts
const initialState = null;

const userReducer = (
  state: UserType = initialState,
  action: Action
): UserType => {
  switch (action.type) {
    case ActionType.CHANGE_USER:
      return action.payload;
    default:
      return state;
  }
};
export default userReducer;

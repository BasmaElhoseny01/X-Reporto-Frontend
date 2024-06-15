import { combineReducers } from "redux";
import TokenReducer from "./TokenReducer";
import UserNameReducer from "./UserNameReducer";
import IdReducer from "./IdReducer";
const rootReducer = combineReducers({
  token: TokenReducer,
  username: UserNameReducer,
  id: IdReducer,
});

export default rootReducer;

export type MainState = ReturnType<typeof rootReducer>;

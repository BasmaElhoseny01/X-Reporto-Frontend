import { combineReducers } from "redux";
import TokenReducer from "./TokenReducer";
import UserNameReducer from "./UserNameReducer";
import IdReducer from "./IdReducer";
import DrawerReducer from "./DrawerReducer";
const rootReducer = combineReducers({
  token: TokenReducer,
  username: UserNameReducer,
  id: IdReducer,
  drawer: DrawerReducer,
});

export default rootReducer;

export type MainState = ReturnType<typeof rootReducer>;

import { combineReducers } from "redux";

// All reducers
import TokenReducer from "./TokenReducer";
import UserNameReducer from "./UserNameReducer";
import ThemeReducer from "./ThemeReducer";
import IdReducer from "./IdReducer";
import DrawerReducer from "./DrawerReducer";

// Define RootState interface by combining all state slices
export interface RootState {
  theme: string;
  user: {
    username: string;
    id: string;
    token: string;
  };
  // Add more state slices as needed
}

const rootReducer = combineReducers({
  token: TokenReducer,
  username: UserNameReducer,
  id: IdReducer,
  drawer: DrawerReducer,
  theme: ThemeReducer,
});

export default rootReducer;

export type MainState = ReturnType<typeof rootReducer>;

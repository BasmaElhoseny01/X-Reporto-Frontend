import { ActionType } from "../ActionType";
import { Dispatch } from "redux";
import { Action } from "../Actions";

export const ChangeToken = (state: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CHANGE_TOKEN,
      payload: state,
    });
  };
};

export const ChangeUserName = (state: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CHANGE_USERNAME,
      payload: state,
    });
  };
};

export const ChangeId = (state: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CHANGE_ID,
      payload: state,
    });
  };
};


export const ChangeTheme = (state: "light" | "dark") => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CHANGE_THEME,
      payload: state,
    });
  };
};

export const ChangeDrawer = (state:string) => {
    return (dispatch : Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_DRAWER,
            payload: state,
        });
    };
};

export const ChangeTableSearch = (state:string) => {
    return (dispatch : Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_TABLE_SEARCH,
            payload: state,
        });
    };
};


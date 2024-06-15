import { ActionType } from "../ActionType";
interface Token{
    type: ActionType.CHANGE_TOKEN; 
    payload: string; 
}
interface UserName{
    type: ActionType.CHANGE_USERNAME; 
    payload: string; 
}

interface Id{
    type: ActionType.CHANGE_ID; 
    payload: number; 
}

export type Action = Token|UserName|Id;
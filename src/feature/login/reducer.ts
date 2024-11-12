import { ActionType } from "../../data/dto/action_type";

export interface LoginStateType {
  email: string;
  password: string;
}
export const loginInitialState: LoginStateType = {
  email: "",
  password: "",
};

export const loginFormReducer = (
  state: LoginStateType = loginInitialState,
  action: ActionType
) => {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
};

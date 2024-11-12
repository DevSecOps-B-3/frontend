import { ActionType } from "../../data/dto/action_type";

export interface RegisterStateType {
  email: string;
  name: string;
  password: string;
  retypePassword: string;
  error: Record<string, boolean>;
}
export const registerInitialState: RegisterStateType = {
  email: "",
  name: "",
  password: "",
  retypePassword: "",
  error: {
    length: true,
    number: true,
    specialChar: true,
    retype: true,
  },
};

export const registerFormReducer = (
  state: RegisterStateType = registerInitialState,
  action: ActionType
) => {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "UPDATE_RETYPE_PASSWORD":
      if (action.payload === state.password) {
        delete state.error.retype;
        return {
          ...state,
          retypePassword: action.payload,
        };
      }
      return {
        ...state,
        retypePassword: action.payload,
        error: {
          retype: state.password !== action.payload,
        },
      };
    default:
      return state;
  }
};

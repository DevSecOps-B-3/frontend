import { ActionType } from '../../data/dto/action_type';
import { passwordChecker } from '../../utils/form';

export interface RegisterStateType {
  email: string;
  name: string;
  password: string;
  retypePassword: string;
  error: Record<string, boolean>;
}
export const registerInitialState: RegisterStateType = {
  email: '',
  name: '',
  password: '',
  retypePassword: '',
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
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'UPDATE_PASSWORD': {
      const password = action.payload;
      const error: Record<string, boolean> = passwordChecker(password);
      if (state.retypePassword !== password) {
        error.retype = true;
      } else {
        delete error.retype;
      }
      if (Object.keys(error).length !== 0) {
        return {
          ...state,
          password,
          error: { ...error },
        };
      }
      return {
        ...state,
        password: action.payload,
        error,
      };
    }
    case 'UPDATE_RETYPE_PASSWORD': {
      const retypePassword = action.payload;
      if (retypePassword === state.password) {
        delete state.error.retype;
        return {
          ...state,
          retypePassword,
        };
      }
      return {
        ...state,
        retypePassword,
        error: {
          ...state.error,
          retype: state.password !== retypePassword,
        },
      };
    }
    default:
      return state;
  }
};

import {LOGIN, LOGOUT} from './constants';
import {initialStateGlobalAuth} from './interface';

const initialState: initialStateGlobalAuth = {
  token: null,
  userData: {},
  anyData: [],
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
      };

    default:
      return state;
  }
}

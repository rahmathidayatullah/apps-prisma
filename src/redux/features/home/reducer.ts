import {ON_PRESS_MENU_ITEM, RESET_VALUE_BOTTOM_SHEET} from './constants';
import {initialStateGlobalHome} from './interface';

const initialState: initialStateGlobalHome = {
  isShowMenuItem: {
    cuti: false,
    lembur: false,
    izin: false,
  },
};

export default function homeReducer(state = initialState, action: any) {
  switch (action.type) {
    case ON_PRESS_MENU_ITEM:
      return {
        ...state,
        isShowMenuItem: action.payload,
      };
    case RESET_VALUE_BOTTOM_SHEET:
      return {
        ...state,
        isShowMenuItem: {
          cuti: false,
          lembur: false,
          izin: false,
        },
      };

    default:
      return state;
  }
}

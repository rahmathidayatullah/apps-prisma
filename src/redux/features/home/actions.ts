import {ON_PRESS_MENU_ITEM, RESET_VALUE_BOTTOM_SHEET} from './constants';
import {itemShowMenuItem} from './interface';

export const onPressMenuItem = (menuItem: any) => {
  return (dispatch: any, getState: any) => {
    const isShowMenuItem = getState().home.isShowMenuItem;

    const payload = {
      ...Object.fromEntries(
        Object.keys(isShowMenuItem).map(key => [key, key === menuItem]),
      ),
    };
    dispatch(successPressMenuItem(payload));
  };
};

export const successPressMenuItem = (payload: itemShowMenuItem) => {
  return {
    type: ON_PRESS_MENU_ITEM,
    payload,
  };
};
export const resetValueBottomSheet = () => {
  return {
    type: RESET_VALUE_BOTTOM_SHEET,
  };
};

import moment from 'moment';
import {
  ON_PRESS_MENU_ITEM,
  RESET_VALUE_BOTTOM_SHEET,
  // cuti
  TOOGLE_PICKER_END_DATE,
  ONCHANGE_TEXT_END_DATE,
  CONFIRM_END_DATE,
  ONCHANGE_DEFAULT_VALUE_END_DATE,
  TOOGLE_PICKER_START_DATE,
  CONFIRM_START_DATE,
  ONCHANGE_DEFAULT_VALUE_START_DATE,
  ONCHANGE_TEXT_START_DATE,
  // izin
  TOOGLE_PICKER_END_DATE_PERMISSION,
  ONCHANGE_TEXT_END_DATE_PERMISSION,
  CONFIRM_END_DATE_PERMISSION,
  ONCHANGE_DEFAULT_VALUE_END_DATE_PERMISSION,
  TOOGLE_PICKER_START_DATE_PERMISSION,
  CONFIRM_START_DATE_PERMISSION,
  ONCHANGE_DEFAULT_VALUE_START_DATE_PERMISSION,
  ONCHANGE_TEXT_START_DATE_PERMISSION,
  ONCHANGE_REASON_PERMISSION,
  CLOCK_IN,
  CLOCK_OUT,
  CLOCK_IN_OVERTIME,
  CLOCK_OUT_OVERTIME,
} from './constants';
import {itemShowMenuItem} from './interface';

export const onPressMenuItem = (menuItem: any) => {
  return (dispatch: any, getState: any) => {
    const isShowMenuItem = getState().home.isShowMenuItem;

    const payload = {
      ...Object.fromEntries(
        Object.keys(isShowMenuItem).map(key => [key, key === menuItem]),
      ),
    };
    console.log('payload', payload);
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

// ========================================== izin
export const tooglePickerEndDatePermission = (valuePermission: boolean) => {
  return {
    type: TOOGLE_PICKER_END_DATE_PERMISSION,
    valuePermission,
  };
};

export const onChangePickerEndDatePermission = (
  type: string,
  platform: any,
  selectedDate: any,
) => {
  return (dispatch: any, getState: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      if (platform.OS === 'android') {
        dispatch({
          type: CONFIRM_END_DATE_PERMISSION,
          valueDefaultEndDatePermission: currentDate,
          valueEndDatePermission: moment(selectedDate).format('DD-MM-YYYY'),
        });
      }
      if (platform.OS === 'ios') {
        dispatch({
          type: ONCHANGE_DEFAULT_VALUE_END_DATE_PERMISSION,
          valueDefaultEndDatePermission: currentDate,
        });
      }
    } else {
      dispatch(tooglePickerEndDatePermission(false));
    }
  };
};

export const confirmIOSEndDatePermission = () => {
  return (dispatch: any, getState: any) => {
    const valueDefaultEndDatePermission =
      getState().home.valueDefaultEndDatePermission;
    dispatch({
      type: CONFIRM_END_DATE_PERMISSION,
      valueEndDatePermission: moment(valueDefaultEndDatePermission).format(
        'DD-MM-YYYY',
      ),
    });
  };
};

export const onChangeTextEndDatePermission = () => {
  return {
    type: ONCHANGE_TEXT_END_DATE_PERMISSION,
  };
};

export const tooglePickerStartDatePermission = (valuePermission: boolean) => {
  return {
    type: TOOGLE_PICKER_START_DATE_PERMISSION,
    valuePermission,
  };
};

export const onChangePickerStartDatePermission = (
  type: string,
  platform: any,
  selectedDate: any,
) => {
  return (dispatch: any, getState: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      if (platform.OS === 'android') {
        dispatch({
          type: CONFIRM_START_DATE_PERMISSION,
          valueDefaultStartDatePermission: currentDate,
          valueStartDatePermission: moment(selectedDate).format('DD-MM-YYYY'),
        });
      }
      if (platform.OS === 'ios') {
        dispatch({
          type: ONCHANGE_DEFAULT_VALUE_START_DATE_PERMISSION,
          valueDefaultStartDatePermission: currentDate,
        });
      }
    } else {
      dispatch(tooglePickerStartDatePermission(false));
    }
  };
};

export const confirmIOSStartDatePermission = () => {
  return (dispatch: any, getState: any) => {
    const valueDefaultStartDatePermission =
      getState().home.valueDefaultStartDatePermission;
    dispatch({
      type: CONFIRM_START_DATE_PERMISSION,
      valueStartDatePermission: moment(valueDefaultStartDatePermission).format(
        'DD-MM-YYYY',
      ),
    });
  };
};

export const onChangeTextStartDatePermission = () => {
  return {
    type: ONCHANGE_TEXT_START_DATE_PERMISSION,
  };
};

// ========================================== cuti
export const tooglePickerEndDate = (value: boolean) => {
  return {
    type: TOOGLE_PICKER_END_DATE,
    value,
  };
};

export const onChangePickerEndDate = (
  type: string,
  platform: any,
  selectedDate: any,
) => {
  return (dispatch: any, getState: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      if (platform.OS === 'android') {
        dispatch({
          type: CONFIRM_END_DATE,
          valueDefaultEndDate: currentDate,
          valueEndDate: moment(selectedDate).format('DD-MM-YYYY'),
        });
      }
      if (platform.OS === 'ios') {
        dispatch({
          type: ONCHANGE_DEFAULT_VALUE_END_DATE,
          valueDefaultEndDate: currentDate,
        });
      }
    } else {
      dispatch(tooglePickerEndDate(false));
    }
  };
};

export const confirmIOSEndDate = () => {
  return (dispatch: any, getState: any) => {
    const valueDefaultEndDate = getState().home.valueDefaultEndDate;
    dispatch({
      type: CONFIRM_END_DATE,
      valueEndDate: moment(valueDefaultEndDate).format('DD-MM-YYYY'),
    });
  };
};

export const onChangeTextEndDate = () => {
  return {
    type: ONCHANGE_TEXT_END_DATE,
  };
};

export const tooglePickerStartDate = (value: boolean) => {
  return {
    type: TOOGLE_PICKER_START_DATE,
    value,
  };
};

export const onChangePickerStartDate = (
  type: string,
  platform: any,
  selectedDate: any,
) => {
  return (dispatch: any, getState: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      if (platform.OS === 'android') {
        dispatch({
          type: CONFIRM_START_DATE,
          valueDefaultStartDate: currentDate,
          valueStartDate: moment(selectedDate).format('DD-MM-YYYY'),
        });
      }
      if (platform.OS === 'ios') {
        dispatch({
          type: ONCHANGE_DEFAULT_VALUE_START_DATE,
          valueDefaultStartDate: currentDate,
        });
      }
    } else {
      dispatch(tooglePickerStartDate(false));
    }
  };
};

export const confirmIOSStartDate = () => {
  return (dispatch: any, getState: any) => {
    const valueDefaultStartDate = getState().home.valueDefaultStartDate;
    dispatch({
      type: CONFIRM_START_DATE,
      valueStartDate: moment(valueDefaultStartDate).format('DD-MM-YYYY'),
    });
  };
};

export const onChangeTextStartDate = () => {
  return {
    type: ONCHANGE_TEXT_START_DATE,
  };
};
export const onChangeTextPermission = (value: string) => {
  return {
    type: ONCHANGE_REASON_PERMISSION,
    value,
  };
};

export const submitClockIn = () => {
  return {
    type: CLOCK_IN,
  };
};
export const submitClockOut = () => {
  return {
    type: CLOCK_OUT,
  };
};
export const submitClockInOvertime = () => {
  return {
    type: CLOCK_IN_OVERTIME,
  };
};
export const submitClockOutOvertime = () => {
  return {
    type: CLOCK_OUT_OVERTIME,
  };
};

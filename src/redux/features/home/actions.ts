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
  // izin/permission
  TOOGLE_PICKER_END_DATE_PERMISSION,
  ONCHANGE_TEXT_END_DATE_PERMISSION,
  CONFIRM_END_DATE_PERMISSION,
  ONCHANGE_DEFAULT_VALUE_END_DATE_PERMISSION,
  TOOGLE_PICKER_START_DATE_PERMISSION,
  CONFIRM_START_DATE_PERMISSION,
  ONCHANGE_DEFAULT_VALUE_START_DATE_PERMISSION,
  ONCHANGE_TEXT_START_DATE_PERMISSION,
  ONCHANGE_REASON_PERMISSION,
  // clock in out
  START_CLOCK_IN,
  ERROR_CLOCK_IN,
  SUCCESS_CLOCK_IN,
  //
  CLOCK_OUT,
  CLOCK_IN_OVERTIME,
  CLOCK_OUT_OVERTIME,
  //
  TOOGLE_PICKER_END_DATE_SUBMISSION,
  CONFIRM_END_DATE_SUBMISSION,
  ONCHANGE_DEFAULT_VALUE_END_DATE_SUBMISSION,
  TOOGLE_PICKER_START_DATE_SUBMISSION,
  CONFIRM_START_DATE_SUBMISSION,
  ONCHANGE_DEFAULT_VALUE_START_DATE_SUBMISSION,
  ONCHANGE_DESCRIPTION_SUBMISSION,
  CONFIRM_END_TIME_SUBMISSION,
  CONFIRM_START_TIME_SUBMISSION,
  CHANGE_CATEOGRY_SUBMISSION,
  CHANGE_FILE1_SUBMISSION,
  CHANGE_FILE2_SUBMISSION,
  START_SUBMIT_SUBMISSION,
  SUCCESS_SUBMIT_SUBMISSION,
  ERROR_SUBMIT_SUBMISSION,

  // lembur/overtime
  TOOGLE_PICKER_END_DATE_OVERTIME,
  TOOGLE_PICKER_START_DATE_OVERTIME,
  ONCHANGE_DEFAULT_VALUE_END_DATE_OVERTIME,
  ONCHANGE_DEFAULT_VALUE_START_DATE_OVERTIME,
  ONCHANGE_DESCRIPTION_OVERTIME,
  ONCHANGE_DEFAULT_VALUE_END_TIME_OVERTIME,
  CONFIRM_START_DATE_OVERTIME,
  CONFIRM_END_DATE_OVERTIME,
  CONFIRM_END_TIME_OVERTIME,
  CONFIRM_START_TIME_OVERTIME,
  CHANGE_CATEOGRY_OVERTIME,
  CHANGE_FILE1_OVERTIME,
  REMOVE_FILE1_OVERTIME,
  CHANGE_DEFAULT_VALUE_END_TIME,
  CHANGE_DEFAULT_VALUE_START_TIME,
  START_SUBMIT_OVERTIME,
  ERROR_SUBMIT_OVERTIME,
  SUCCESS_SUBMIT_OVERTIME,
} from './constants';
import {itemShowMenuItem} from './interface';
import {postClockIn, postClockOut, postOvertime} from '../../../api/home';
import {Alert} from 'react-native';
import {SUCCESS_LOGOUT} from '../auth/constants';
import {fetchProfile} from '../profile/actions';

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

// ========================================== izin/permission
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

export const submitClockIn = (payload: any, clockIn: boolean) => {
  return async (dispatch: any) => {
    dispatch({
      type: START_CLOCK_IN,
    });
    // const nameFileImage = payload.imageSelfie.path.split('/');
    // const fileName = nameFileImage[nameFileImage.length - 1];
    try {
      if (clockIn) {
        const newPayloadClockIn = {
          clockInPhoto: `data:${payload.imageSelfie.mime};base64,${payload.imageSelfie.data}`,
          clockInLongitude: `${payload.longitude ?? ''}`,
          clockInLatitude: `${payload.latitude ?? ''}`,
          description: `${payload.description}`,
        };
        const res = await postClockIn(newPayloadClockIn);
        console.log('success submitClockIn', res);
        dispatch(fetchProfile());
      } else {
        const newPayloadClockOut = {
          clockOutPhoto: `data:${payload.imageSelfie.mime};base64,${payload.imageSelfie.data}`,
          clockOutLongitude: `${payload.longitude ?? ''}`,
          clockOutLatitude: `${payload.latitude ?? ''}`,
          description: `${payload.description}`,
        };
        console.log('newPayloadClockOut', newPayloadClockOut);
        const res = await postClockOut(newPayloadClockOut);
        console.log('success submitClockOut', res);
        dispatch(fetchProfile());
      }
      dispatch({type: SUCCESS_CLOCK_IN});
    } catch (error: any) {
      console.log('error submitClockIn', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({type: ERROR_CLOCK_IN});
      }
    }
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

// ========================================== pengajuan/submission
export const tooglePickerEndDateSubmission = (valueSubmission: boolean) => {
  return {
    type: TOOGLE_PICKER_END_DATE_SUBMISSION,
    valueSubmission,
  };
};

export const onChangePickerEndDateSubmission = (
  type: string,
  platform: any,
  selectedDate: any,
) => {
  return (dispatch: any, getState: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      if (platform.OS === 'android') {
        dispatch({
          type: CONFIRM_END_DATE_SUBMISSION,
          valueDefaultEndDateSubmission: currentDate,
          valueEndDateSubmission: moment(selectedDate).format('DD-MM-YYYY'),
        });
      }
      if (platform.OS === 'ios') {
        dispatch({
          type: ONCHANGE_DEFAULT_VALUE_END_DATE_SUBMISSION,
          valueDefaultEndDateSubmission: currentDate,
        });
      }
    } else {
      dispatch(tooglePickerEndDateSubmission(false));
    }
  };
};

export const confirmIOSEndDateSubmission = () => {
  return (dispatch: any, getState: any) => {
    const valueDefaultEndDateSubmission =
      getState().home.valueDefaultEndDateSubmission;
    dispatch({
      type: CONFIRM_END_DATE_SUBMISSION,
      valueEndDateSubmission: moment(valueDefaultEndDateSubmission).format(
        'DD-MM-YYYY',
      ),
    });
  };
};

export const onChangeDescriptionSubmission = (
  descriptionSubmission: string,
) => {
  return {
    type: ONCHANGE_DESCRIPTION_SUBMISSION,
    descriptionSubmission,
  };
};

export const tooglePickerStartDateSubmission = (valueSubmission: boolean) => {
  return {
    type: TOOGLE_PICKER_START_DATE_SUBMISSION,
    valueSubmission,
  };
};

export const onChangePickerStartDateSubmission = (
  type: string,
  platform: any,
  selectedDate: any,
) => {
  return (dispatch: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      if (platform.OS === 'android') {
        dispatch({
          type: CONFIRM_START_DATE_SUBMISSION,
          valueDefaultStartDateSubmission: currentDate,
          valueStartDateSubmission: moment(selectedDate).format('DD-MM-YYYY'),
        });
      }
      if (platform.OS === 'ios') {
        dispatch({
          type: ONCHANGE_DEFAULT_VALUE_START_DATE_SUBMISSION,
          valueDefaultStartDateSubmission: currentDate,
        });
      }
    } else {
      dispatch(tooglePickerStartDateSubmission(false));
    }
  };
};

export const confirmIOSStartDateSubmission = () => {
  return (dispatch: any, getState: any) => {
    const valueDefaultStartDateSubmission =
      getState().home.valueDefaultStartDateSubmission;
    dispatch({
      type: CONFIRM_START_DATE_SUBMISSION,
      valueStartDateSubmission: moment(valueDefaultStartDateSubmission).format(
        'DD-MM-YYYY',
      ),
    });
  };
};

export const onChangeEndTimeSubmission = (timeEnd: string) => {
  return (dispatch: any, getState: any) => {
    const valueEndDateSubmission = getState().home.valueEndDateSubmission;
    const endDateTimeSubmission = valueEndDateSubmission + ' ' + timeEnd;

    dispatch({
      type: CONFIRM_END_TIME_SUBMISSION,
      endDateTimeSubmission,
      endTimeSubmission: timeEnd,
    });
  };
};
export const onChangeStartTimeSubmission = (timeStart: string) => {
  return (dispatch: any, getState: any) => {
    const valueStartDateSubmission = getState().home.valueStartDateSubmission;
    const startDateTimeSubmission = valueStartDateSubmission + ' ' + timeStart;

    dispatch({
      type: CONFIRM_START_TIME_SUBMISSION,
      startDateTimeSubmission,
      startTimeSubmission: timeStart,
    });
  };
};

export const changeCategorySubmission = (value: string) => {
  return {
    type: CHANGE_CATEOGRY_SUBMISSION,
    value,
  };
};

export const changeFile1Submission = (file: any) => {
  return {
    type: CHANGE_FILE1_SUBMISSION,
    file,
  };
};
export const changeFile2Submission = (file: any) => {
  return {
    type: CHANGE_FILE2_SUBMISSION,
    file,
  };
};

export const submitSubmission = (payload: any) => {
  // return async (dispatch: any, getState: any) => {
  //   dispatch({
  //     type: START_SUBMIT_SUBMISSION,
  //   });
  //   try {
  //     const res = await
  //     dispatch({
  //       type: SUCCESS_SUBMIT_SUBMISSION,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: ERROR_SUBMIT_SUBMISSION,
  //     });
  //   }
  // };
};

// ========================================== lembur/overtime
export const tooglePickerEndDateOvertime = (valueOvertime: boolean) => {
  return {
    type: TOOGLE_PICKER_END_DATE_OVERTIME,
    valueOvertime,
  };
};

export const onChangePickerEndDateOvertime = (
  type: string,
  platform: any,
  selectedDate: any,
) => {
  return (dispatch: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      if (platform.OS === 'android') {
        dispatch({
          type: CONFIRM_END_DATE_OVERTIME,
          valueDefaultEndDateOvertime: currentDate,
          valueEndDateOvertime: moment(selectedDate).format('DD-MM-YYYY'),
        });
      }
      if (platform.OS === 'ios') {
        dispatch({
          type: ONCHANGE_DEFAULT_VALUE_END_DATE_OVERTIME,
          valueDefaultEndDateOvertime: currentDate,
        });
      }
    } else {
      dispatch(tooglePickerEndDateOvertime(false));
    }
  };
};

export const confirmIOSEndDateOvertime = () => {
  return (dispatch: any, getState: any) => {
    const valueDefaultEndDateOvertime =
      getState().home.valueDefaultEndDateOvertime;
    dispatch({
      type: CONFIRM_END_DATE_OVERTIME,
      valueEndDateOvertime: moment(valueDefaultEndDateOvertime).format(
        'DD-MM-YYYY',
      ),
    });
  };
};

export const onChangeDescriptionOvertime = (descriptionOvertime: string) => {
  return {
    type: ONCHANGE_DESCRIPTION_OVERTIME,
    descriptionOvertime,
  };
};

export const tooglePickerStartDateOvertime = (valueOvertime: boolean) => {
  return {
    type: TOOGLE_PICKER_START_DATE_OVERTIME,
    valueOvertime,
  };
};

export const onChangePickerStartDateOvertime = (
  type: string,
  platform: any,
  selectedDate: any,
) => {
  return (dispatch: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      if (platform.OS === 'android') {
        dispatch({
          type: CONFIRM_START_DATE_OVERTIME,
          valueDefaultStartDateOvertime: currentDate,
          valueStartDateOvertime: moment(selectedDate).format('DD-MM-YYYY'),
        });
      }
      if (platform.OS === 'ios') {
        dispatch({
          type: ONCHANGE_DEFAULT_VALUE_START_DATE_OVERTIME,
          valueDefaultStartDateOvertime: currentDate,
        });
      }
    } else {
      dispatch(tooglePickerStartDateOvertime(false));
    }
  };
};

export const confirmIOSStartDateOvertime = () => {
  return (dispatch: any, getState: any) => {
    const valueDefaultStartDateOvertime =
      getState().home.valueDefaultStartDateOvertime;
    dispatch({
      type: CONFIRM_START_DATE_OVERTIME,
      valueStartDateOvertime: moment(valueDefaultStartDateOvertime).format(
        'DD-MM-YYYY',
      ),
    });
  };
};

export const onChangeEndTimeOvertime = (timeEnd: string, platform: any) => {
  return (dispatch: any, getState: any) => {
    const valueEndDateOvertime = getState().home.valueEndDateOvertime;
    const endDateTimeOvertime =
      valueEndDateOvertime + ' ' + moment(timeEnd).format('hh:mm:ss');

    if (platform.OS === 'android') {
      dispatch({
        type: CONFIRM_END_TIME_OVERTIME,
        endDateTimeOvertime,
        endTimeOvertime: moment(timeEnd).format('hh:mm:ss'),
      });
    }
    dispatch({
      type: CHANGE_DEFAULT_VALUE_END_TIME,
      valueDefaultEndTimeOvertime: timeEnd,
    });
  };
};

export const onChangeStartTimeOvertime = (timeStart: string, platform: any) => {
  return (dispatch: any, getState: any) => {
    const valueStartDateOvertime = getState().home.valueStartDateOvertime;
    const startDateTimeOvertime =
      valueStartDateOvertime + ' ' + moment(timeStart).format('hh:mm:ss');

    if (platform.OS === 'android') {
      dispatch({
        type: CONFIRM_START_TIME_OVERTIME,
        startDateTimeOvertime,
        startTimeOvertime: moment(timeStart).format('hh:mm:ss'),
      });
    }
    dispatch({
      type: CHANGE_DEFAULT_VALUE_START_TIME,
      valueDefaultStartTimeOvertime: timeStart,
    });
  };
};

export const confirmIOSEndTimeOvertime = () => {
  return (dispatch: any, getState: any) => {
    const valueEndDateOvertime = getState().home.valueEndDateOvertime;
    const valueDefaultEndTimeOvertime =
      getState().home.valueDefaultEndTimeOvertime;

    const endDateTimeOvertime =
      valueEndDateOvertime +
      ' ' +
      moment(valueDefaultEndTimeOvertime).format('hh:mm:ss');

    dispatch({
      type: CONFIRM_END_TIME_OVERTIME,
      endDateTimeOvertime,
      endTimeOvertime: valueDefaultEndTimeOvertime,
    });
  };
};

export const confirmIOSStartTimeOvertime = () => {
  return (dispatch: any, getState: any) => {
    const valueStartDateOvertime = getState().home.valueStartDateOvertime;
    const valueDefaultStartTimeOvertime =
      getState().home.valueDefaultStartTimeOvertime;

    const startDateTimeOvertime =
      valueStartDateOvertime +
      ' ' +
      moment(valueDefaultStartTimeOvertime).format('hh:mm:ss');

    dispatch({
      type: CONFIRM_START_TIME_OVERTIME,
      startDateTimeOvertime,
      startTimeOvertime: valueDefaultStartTimeOvertime,
    });
  };
};

export const changeFile1Overtime = (file: any) => {
  return {
    type: CHANGE_FILE1_OVERTIME,
    file,
  };
};

export const submitOvertime = (payload: any) => {
  return async (dispatch: any, getState: any) => {
    const newPayloadClockIn = {
      overtimeFile: `data:${payload.file1Overtime.mime};base64,${payload.file1Overtime.data}`,
      otherOvertimeFile: '',
      startTime: `${payload.valueStartDateOvertime}`,
      endtTime: `${payload.valueEndDateOvertime}`,
      description: `${payload.description}`,
    };
    dispatch({
      type: START_SUBMIT_OVERTIME,
    });
    try {
      const res = await postOvertime(newPayloadClockIn);
      console.log('success submitOvertime', res);
      dispatch(fetchProfile());
      dispatch({
        type: SUCCESS_SUBMIT_OVERTIME,
      });
    } catch (error: any) {
      console.log('error submitOvertime', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_SUBMIT_OVERTIME,
        });
      }
    }
  };
};

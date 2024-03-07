import moment from 'moment';
import {
  ON_PRESS_MENU_ITEM,
  RESET_VALUE_BOTTOM_SHEET,
  // cuti
  TOOGLE_PICKER_END_DATE,
  ONCHANGE_TEXT_END_DATE,
  CONFIRM_END_DATE,
  ONCHANGE_DEFAULT_VALUE_END_DATE,
  ONCHANGE_DEFAULT_VALUE_START_DATE,
  CONFIRM_START_DATE,
  TOOGLE_PICKER_START_DATE,
  ONCHANGE_TEXT_START_DATE,
  // izin
  TOOGLE_PICKER_END_DATE_PERMISSION,
  ONCHANGE_TEXT_END_DATE_PERMISSION,
  CONFIRM_END_DATE_PERMISSION,
  ONCHANGE_DEFAULT_VALUE_END_DATE_PERMISSION,
  ONCHANGE_DEFAULT_VALUE_START_DATE_PERMISSION,
  CONFIRM_START_DATE_PERMISSION,
  TOOGLE_PICKER_START_DATE_PERMISSION,
  ONCHANGE_TEXT_START_DATE_PERMISSION,
  ONCHANGE_REASON_PERMISSION,
  CLOCK_IN,
  CLOCK_OUT,
} from './constants';
import {initialStateGlobalHome} from './interface';

const initialState: initialStateGlobalHome = {
  isShowMenuItem: {
    cuti: false,
    lembur: false,
    izin: false,
    clockIn: false,
    clockOut: false,
    clockInOvertime: false,
    clockOutOvertime: false,
  },

  dateClockIn: null, // "07-03-2024 08:00:00" | "- : -"
  dateClockOut: null, // "07-03-2024 17:00:00" | "- : -"
  dateClockInOvertime: null, // "07-03-2024 18:00:00" | "- : -"
  dateClockOutOvertime: null, // "07-03-2024 20:00:00" | "- : -"

  name: 'Rahmat Hidayatullah',
  role: 'Karyawan',
  imageProfile: 'https://picsum.photos/seed/696/3000/2000',
  timeWork: '08:00 - 17:00', // "08:00 - 17:00" | "Day Off"
  statusWork: 'Work Shift', // "Work Shift" | "Day Off" | "Overtime",

  // payload clockIn clockOut overtime
  imageSelfie: '',
  latitide: '',
  longitude: '',
  // payload clockIn clockOut

  // cuti
  valueDefaultEndDate: new Date(),
  valueEndDate: '',
  showPickerEndDate: false,

  valueDefaultStartDate: new Date(),
  valueStartDate: '',
  showPickerStartDate: false,

  // izin
  valueDefaultEndDatePermission: new Date(),
  valueEndDatePermission: '',
  showPickerEndDatePermission: false,

  valueDefaultStartDatePermission: new Date(),
  valueStartDatePermission: '',
  showPickerStartDatePermission: false,
  reason: '',
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
          clockIn: false,
          clockOut: false,
          clockInOvertime: false,
          clockOutOvertime: false,
        },
      };

    // ==================================== cuti
    case ONCHANGE_DEFAULT_VALUE_END_DATE:
      return {
        ...state,
        valueDefaultEndDate: action.valueDefaultEndDate,
      };
    case CONFIRM_END_DATE:
      return {
        ...state,
        valueEndDate: action.valueEndDate,
        showPickerEndDate: false,
        valueDefaultEndDate:
          action.valueDefaultEndDate ?? state.valueDefaultEndDate,
      };

    case TOOGLE_PICKER_END_DATE:
      return {
        ...state,
        showPickerEndDate: action.value,
      };
    case ONCHANGE_TEXT_END_DATE:
      return {
        ...state,
      };

    case ONCHANGE_DEFAULT_VALUE_START_DATE:
      return {
        ...state,
        valueDefaultStartDate: action.valueDefaultStartDate,
      };
    case CONFIRM_START_DATE:
      return {
        ...state,
        valueStartDate: action.valueStartDate,
        showPickerStartDate: false,
        valueDefaultStartDate:
          action.valueDefaultStartDate ?? state.valueDefaultStartDate,
      };

    case TOOGLE_PICKER_START_DATE:
      return {
        ...state,
        showPickerStartDate: action.value,
      };
    case ONCHANGE_TEXT_START_DATE:
      return {
        ...state,
      };

    // ==================================== izin

    case ONCHANGE_DEFAULT_VALUE_END_DATE_PERMISSION:
      return {
        ...state,
        valueDefaultEndDatePermission: action.valueDefaultEndDatePermission,
      };
    case CONFIRM_END_DATE_PERMISSION:
      return {
        ...state,
        valueEndDatePermission: action.valueEndDatePermission,
        showPickerEndDatePermission: false,
        valueDefaultEndDatePermission:
          action.valueDefaultEndDatePermission ??
          state.valueDefaultEndDatePermission,
      };

    case TOOGLE_PICKER_END_DATE_PERMISSION:
      return {
        ...state,
        showPickerEndDatePermission: action.valuePermission,
      };
    case ONCHANGE_TEXT_END_DATE_PERMISSION:
      return {
        ...state,
      };

    case ONCHANGE_DEFAULT_VALUE_START_DATE_PERMISSION:
      return {
        ...state,
        valueDefaultStartDatePermission: action.valueDefaultStartDatePermission,
      };
    case CONFIRM_START_DATE_PERMISSION:
      return {
        ...state,
        valueStartDatePermission: action.valueStartDatePermission,
        showPickerStartDatePermission: false,
        valueDefaultStartDatePermission:
          action.valueDefaultStartDatePermission ??
          state.valueDefaultStartDatePermission,
      };

    case TOOGLE_PICKER_START_DATE_PERMISSION:
      return {
        ...state,
        showPickerStartDatePermission: action.valuePermission,
      };
    case ONCHANGE_TEXT_START_DATE_PERMISSION:
      return {
        ...state,
      };
    case ONCHANGE_REASON_PERMISSION:
      return {
        ...state,
        reason: action.value,
      };

    case CLOCK_IN:
      return {
        ...state,
        dateClockIn: moment().format('DD-MM-YYYY hh:mm:ss'),
      };
    case CLOCK_OUT:
      return {
        ...state,
        dateClockOut: moment().format('DD-MM-YYYY hh:mm:ss'),
      };

    default:
      return state;
  }
}

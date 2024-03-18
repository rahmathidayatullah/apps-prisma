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
  // izin/permission
  TOOGLE_PICKER_END_DATE_PERMISSION,
  ONCHANGE_TEXT_END_DATE_PERMISSION,
  CONFIRM_END_DATE_PERMISSION,
  ONCHANGE_DEFAULT_VALUE_END_DATE_PERMISSION,
  ONCHANGE_DEFAULT_VALUE_START_DATE_PERMISSION,
  CONFIRM_START_DATE_PERMISSION,
  TOOGLE_PICKER_START_DATE_PERMISSION,
  ONCHANGE_TEXT_START_DATE_PERMISSION,
  ONCHANGE_REASON_PERMISSION,

  // clock in/out
  START_CLOCK_IN,
  ERROR_CLOCK_IN,
  SUCCESS_CLOCK_IN,
  CLOCK_OUT,
  RESET_STATE_CLOCK_IN,

  // submission/pengajuan
  ONCHANGE_DEFAULT_VALUE_END_DATE_SUBMISSION,
  CONFIRM_END_DATE_SUBMISSION,
  TOOGLE_PICKER_END_DATE_SUBMISSION,
  ONCHANGE_DEFAULT_VALUE_START_DATE_SUBMISSION,
  CONFIRM_START_DATE_SUBMISSION,
  TOOGLE_PICKER_START_DATE_SUBMISSION,
  ONCHANGE_DESCRIPTION_SUBMISSION,
  CONFIRM_END_TIME_SUBMISSION,
  CONFIRM_START_TIME_SUBMISSION,
  CHANGE_CATEOGRY_SUBMISSION,
  CHANGE_FILE1_SUBMISSION,
  CHANGE_FILE2_SUBMISSION,
  REMOVE_FILE1_SUBMISSION,
  REMOVE_FILE2_SUBMISSION,
  START_SUBMIT_SUBMISSION,
  SUCCESS_SUBMIT_SUBMISSION,
  ERROR_SUBMIT_SUBMISSION,
  RESET_STATE_SUBMISSION,

  // lembur/overtime
  TOOGLE_PICKER_END_DATE_OVERTIME,
  TOOGLE_PICKER_START_DATE_OVERTIME,
  ONCHANGE_DEFAULT_VALUE_END_DATE_OVERTIME,
  ONCHANGE_DEFAULT_VALUE_START_DATE_OVERTIME,
  ONCHANGE_DESCRIPTION_OVERTIME,
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
  SUCCESS_SUBMIT_OVERTIME,
  ERROR_SUBMIT_OVERTIME,
  RESET_STATE_OVERTIME,
} from './constants';
import {initialStateGlobalHome} from './interface';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState: initialStateGlobalHome = {
  isShowMenuItem: {
    cuti: false,
    lembur: false,
    izin: false,
    pengajuan: false,
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

  // izin/permission
  valueDefaultEndDatePermission: new Date(),
  valueEndDatePermission: '',
  showPickerEndDatePermission: false,

  valueDefaultStartDatePermission: new Date(),
  valueStartDatePermission: '',
  showPickerStartDatePermission: false,
  reason: '',

  // pengajuan/submission
  valueDefaultEndDateSubmission: new Date(),
  valueEndDateSubmission: '',

  valueDefaultEndTimeSubmission: new Date(),
  valueEndTimeSubmission: '',

  showPickerEndDateSubmission: false,
  showPickerEndTimeSubmission: false,

  valueDefaultStartDateSubmission: new Date(),
  valueStartDateSubmission: '',

  valueDefaultStartTimeSubmission: new Date(),
  valueStartTimeSubmission: '',

  showPickerStartDateSubmission: false,
  showPickerStartTimeSubmission: false,

  descriptionSubmission: '',
  selectCategorySubmission: '',
  file1Submission: null,
  file2Submission: null,

  statusSubmitSubmission: statusList.idle,

  // lembur/overtime
  valueDefaultEndDateOvertime: new Date(),
  valueEndDateOvertime: '',

  valueDefaultEndTimeOvertime: new Date(),
  valueEndTimeOvertime: '',

  showPickerEndDateOvertime: false,
  showPickerEndTimeOvertime: false,

  valueDefaultStartDateOvertime: new Date(),
  valueStartDateOvertime: '',

  valueDefaultStartTimeOvertime: new Date(),
  valueStartTimeOvertime: '',

  showPickerStartDateOvertime: false,
  showPickerStartTimeOvertime: false,

  descriptionOvertime: '',
  selectCategoryOvertime: '',
  file1Overtime: null,
  statusSubmitOvertime: statusList.idle,

  // clock in
  statusClockIn: statusList.idle,
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
          pengajuan: false,
          clockIn: false,
          clockOut: false,
          clockInOvertime: false,
          clockOutOvertime: false,
        },

        valueEndDateSubmission: '',

        valueEndTimeSubmission: '',
        showPickerEndDateSubmission: false,
        showPickerEndTimeSubmission: false,

        valueStartDateSubmission: '',

        valueStartTimeSubmission: '',
        showPickerStartDateSubmission: false,
        showPickerStartTimeSubmission: false,

        descriptionSubmission: '',
        selectCategorySubmission: '',
        attachmentFileSubmission: [],
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

    case CHANGE_DEFAULT_VALUE_END_TIME:
      return {
        ...state,
        valueDefaultEndTimeOvertime: action.valueDefaultEndTimeOvertime,
      };
    case CHANGE_DEFAULT_VALUE_START_TIME:
      return {
        ...state,
        valueDefaultStartTimeOvertime: action.valueDefaultStartTimeOvertime,
      };

    // ==================================== izin/permission

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

    // ==================================== pengajuan/submission

    case ONCHANGE_DEFAULT_VALUE_END_DATE_SUBMISSION:
      return {
        ...state,
        valueDefaultEndDateSubmission: action.valueDefaultEndDateSubmission,
      };
    case CONFIRM_END_DATE_SUBMISSION:
      return {
        ...state,
        valueEndDateSubmission: action.valueEndDateSubmission,
        showPickerEndDateSubmission: false,
        valueDefaultEndDateSubmission:
          action.valueDefaultEndDateSubmission ??
          state.valueDefaultEndDateSubmission,
        valueEndTimeSubmission: '',
      };

    case CONFIRM_END_TIME_SUBMISSION:
      return {
        ...state,
        valueEndDateSubmission: action.endDateTimeSubmission,
        valueEndTimeSubmission: action.endTimeSubmission,
      };

    case TOOGLE_PICKER_END_DATE_SUBMISSION:
      return {
        ...state,
        showPickerEndDateSubmission: action.valueSubmission,
      };

    case ONCHANGE_DEFAULT_VALUE_START_DATE_SUBMISSION:
      return {
        ...state,
        valueDefaultStartDateSubmission: action.valueDefaultStartDateSubmission,
      };
    case CONFIRM_START_DATE_SUBMISSION:
      return {
        ...state,
        valueStartDateSubmission: action.valueStartDateSubmission,
        showPickerStartDateSubmission: false,
        valueDefaultStartDateSubmission:
          action.valueDefaultStartDateSubmission ??
          state.valueDefaultStartDateSubmission,
        valueStartTimeSubmission: '',
      };

    case CONFIRM_START_TIME_SUBMISSION:
      return {
        ...state,
        valueStartDateSubmission: action.startDateTimeSubmission,
        valueStartTimeSubmission: action.startTimeSubmission,
      };

    case TOOGLE_PICKER_START_DATE_SUBMISSION:
      return {
        ...state,
        showPickerStartDateSubmission: action.valueSubmission,
      };
    case ONCHANGE_DESCRIPTION_SUBMISSION:
      return {
        ...state,
        descriptionSubmission: action.descriptionSubmission,
      };

    case CHANGE_CATEOGRY_SUBMISSION:
      return {
        ...state,
        selectCategorySubmission: action.value,
      };

    case CHANGE_FILE1_SUBMISSION:
      return {
        ...state,
        file1Submission: action.file,
      };
    case CHANGE_FILE2_SUBMISSION:
      return {
        ...state,
        file2Submission: action.file,
      };
    case REMOVE_FILE1_SUBMISSION:
      return {
        ...state,
        file1Submission: '',
      };
    case REMOVE_FILE2_SUBMISSION:
      return {
        ...state,
        file2Submission: '',
      };

    case START_SUBMIT_SUBMISSION:
      return {
        ...state,
        statusSubmitSubmission: statusList.process,
      };
    case SUCCESS_SUBMIT_SUBMISSION:
      return {
        ...state,
        statusSubmitSubmission: statusList.success,
      };

    case ERROR_SUBMIT_SUBMISSION:
      return {
        ...state,
        statusSubmitSubmission: statusList.error,
      };

    case RESET_STATE_SUBMISSION:
      return {
        ...state,
        statusSubmitSubmission: statusList.idle,
        valueDefaultEndDateSubmission: new Date(),
        valueEndDateSubmission: '',

        valueDefaultEndTimeSubmission: new Date(),
        valueEndTimeSubmission: '',

        showPickerEndDateSubmission: false,
        showPickerEndTimeSubmission: false,

        valueDefaultStartDateSubmission: new Date(),
        valueStartDateSubmission: '',

        valueDefaultStartTimeSubmission: new Date(),
        valueStartTimeSubmission: '',

        showPickerStartDateSubmission: false,
        showPickerStartTimeSubmission: false,

        descriptionSubmission: '',
        selectCategorySubmission: '',
        file1Submission: null,
        file2Submission: null,
      };

    // ==================================== clockin/clockout

    case START_CLOCK_IN:
      return {
        ...state,
        statusClockIn: statusList.process,
        dateClockIn: moment().format('DD-MM-YYYY hh:mm:ss'),
      };
    case SUCCESS_CLOCK_IN:
      return {
        ...state,
        statusClockIn: statusList.success,
        dateClockIn: moment().format('DD-MM-YYYY hh:mm:ss'),
      };
    case ERROR_CLOCK_IN:
      return {
        ...state,
        statusClockIn: statusList.error,
        dateClockIn: moment().format('DD-MM-YYYY hh:mm:ss'),
      };

    case CLOCK_OUT:
      return {
        ...state,
        dateClockOut: moment().format('DD-MM-YYYY hh:mm:ss'),
      };
    case RESET_STATE_CLOCK_IN:
      return {
        ...state,
        statusClockIn: statusList.idle,
      };

    // ==================================== lembur/overtime

    case ONCHANGE_DEFAULT_VALUE_END_DATE_OVERTIME:
      return {
        ...state,
        valueDefaultEndDateOvertime: action.valueDefaultEndDateOvertime,
      };
    case ONCHANGE_DEFAULT_VALUE_START_DATE_OVERTIME:
      return {
        ...state,
        valueDefaultStartDateOvertime: action.valueDefaultStartDateOvertime,
      };
    case CONFIRM_END_DATE_OVERTIME:
      return {
        ...state,
        valueEndDateOvertime: action.valueEndDateOvertime,
        showPickerEndDateOvertime: false,
        valueDefaultEndDateOvertime:
          action.valueDefaultEndDateOvertime ??
          state.valueDefaultEndDateOvertime,
        valueEndTimeOvertime: '',
      };

    case CONFIRM_START_DATE_OVERTIME:
      return {
        ...state,
        valueStartDateOvertime: action.valueStartDateOvertime,
        showPickerStartDateOvertime: false,
        valueDefaultStartDateOvertime:
          action.valueDefaultStartDateOvertime ??
          state.valueDefaultStartDateOvertime,
        valueStartTimeOvertime: '',
      };

    case CONFIRM_END_TIME_OVERTIME:
      return {
        ...state,
        valueEndDateOvertime: action.endDateTimeOvertime,
        valueEndTimeOvertime: action.endTimeOvertime,
      };

    case CONFIRM_START_TIME_OVERTIME:
      return {
        ...state,
        valueStartDateOvertime: action.startDateTimeOvertime,
        valueStartTimeOvertime: action.startTimeOvertime,
      };

    case TOOGLE_PICKER_END_DATE_OVERTIME:
      return {
        ...state,
        showPickerEndDateOvertime: action.valueOvertime,
      };

    case TOOGLE_PICKER_START_DATE_OVERTIME:
      return {
        ...state,
        showPickerStartDateOvertime: action.valueOvertime,
      };
    case ONCHANGE_DESCRIPTION_OVERTIME:
      return {
        ...state,
        descriptionOvertime: action.descriptionOvertime,
      };

    case CHANGE_CATEOGRY_OVERTIME:
      return {
        ...state,
        selectCategoryOvertime: action.value,
      };

    case CHANGE_FILE1_OVERTIME:
      return {
        ...state,
        file1Overtime: action.file,
      };

    case REMOVE_FILE1_OVERTIME:
      return {
        ...state,
        file1Overtime: '',
      };

    case START_SUBMIT_OVERTIME:
      return {
        ...state,
        statusSubmitOvertime: statusList.process,
      };
    case SUCCESS_SUBMIT_OVERTIME:
      return {
        ...state,
        statusSubmitOvertime: statusList.success,
      };

    case ERROR_SUBMIT_OVERTIME:
      return {
        ...state,
        statusSubmitOvertime: statusList.error,
      };

    case RESET_STATE_OVERTIME:
      return {
        ...state,
        statusSubmitOvertime: statusList.idle,
        valueDefaultEndDateOvertime: new Date(),
        valueEndDateOvertime: '',

        valueDefaultEndTimeOvertime: new Date(),
        valueEndTimeOvertime: '',

        showPickerEndDateOvertime: false,
        showPickerEndTimeOvertime: false,

        valueDefaultStartDateOvertime: new Date(),
        valueStartDateOvertime: '',

        valueDefaultStartTimeOvertime: new Date(),
        valueStartTimeOvertime: '',

        showPickerStartDateOvertime: false,
        showPickerStartTimeOvertime: false,

        descriptionOvertime: '',
        selectCategoryOvertime: '',
        file1Overtime: null,
      };

    default:
      return state;
  }
}

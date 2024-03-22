import {
  START_FETCH_PROFILE,
  ERROR_FETCH_PROFILE,
  SUCCESS_FETCH_PROFILE,
  START_UPDATE_PROFILE,
  ERROR_UPDATE_PROFILE,
  SUCCESS_UPDATE_PROFILE,
  RESET_FORM_PROFILE,
} from './constants';
import {initialStateGlobalProfile, typeStatusList} from './interface';

const statusList: typeStatusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};
const initialState: initialStateGlobalProfile = {
  status: statusList.idle,
  profile: {
    overtime: {
      clockIn: null,
      clockOut: null,
      id: null,
    },
    clockIn: null,
    clockOut: null,
    workStatus: null,
    user: {
      name: null,
      role: {
        name: null,
      },
      email: null,
      phoneNumber: null,
      emergencyContact: null,
      address: null,
      // gender:  null,
      npwp: null,
      no_nrp: null,
      nik: null,
      photo: undefined,
    },
  },
  dataUpdateProfile: null,
  statusUpdateProfile: statusList.idle,
};

export default function profileReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_UPDATE_PROFILE:
      return {
        ...state,
        statusUpdateProfile: statusList.process,
      };
    case ERROR_UPDATE_PROFILE:
      return {
        ...state,
        statusUpdateProfile: statusList.error,
      };
    case SUCCESS_UPDATE_PROFILE:
      return {
        ...state,
        statusUpdateProfile: statusList.success,
        dataUpdateProfile: action.data,
      };
    case RESET_FORM_PROFILE:
      return {
        ...state,
        statusUpdateProfile: statusList.idle,
      };
    case START_FETCH_PROFILE:
      return {
        ...state,
        status: statusList.process,
      };
    case ERROR_FETCH_PROFILE:
      return {
        ...state,
        status: statusList.error,
      };
    case SUCCESS_FETCH_PROFILE:
      return {
        ...state,
        status: statusList.success,
        profile: action.profile,
      };

    default:
      return state;
  }
}

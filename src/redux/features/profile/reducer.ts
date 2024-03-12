import {
  START_FETCH_PROFILE,
  ERROR_FETCH_PROFILE,
  SUCCESS_FETCH_PROFILE,
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
    clockIn: null,
    clockOut: null,
    workStatus: null,
    user: {
      name: '',
      role: {
        name: '',
      },
      email: '',
    },
  },
};

export default function profileReducer(state = initialState, action: any) {
  switch (action.type) {
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

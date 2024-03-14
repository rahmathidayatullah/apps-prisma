import {START_OVERTIMES, SUCCESS_OVERTIMES, ERROR_OVERTIMES} from './constants';

import {initialStateGlobalOvertimes} from './interface';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState: initialStateGlobalOvertimes = {
  statusListOvertimes: statusList.idle,
};

export default function overtimesReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_OVERTIMES:
      return {
        ...state,
        statusListOvertimes: statusList.process,
      };
    case SUCCESS_OVERTIMES:
      return {
        ...state,
        statusListOvertimes: statusList.success,
      };
    case ERROR_OVERTIMES:
      return {
        ...state,
        statusListOvertimes: statusList.error,
      };

    default:
      return state;
  }
}

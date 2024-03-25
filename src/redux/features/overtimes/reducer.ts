import {
  START_OVERTIMES,
  SUCCESS_OVERTIMES,
  ERROR_OVERTIMES,
  SET_START_DATE,
  SET_END_DATE,
  CLEAR_START_DATE_END_DATE,
} from './constants';

import {initialStateGlobalOvertimes} from './interface';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState: initialStateGlobalOvertimes = {
  page: 1,
  take: 100,
  order: 'DESC',
  keyword: '',
  startDate: '',
  endDate: '',
  statusListOvertimes: statusList.idle,
  dataListOvertimes: [],
};

export default function overtimesReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.value,
      };

    case SET_END_DATE:
      return {
        ...state,
        endDate: action.value,
      };

    case CLEAR_START_DATE_END_DATE:
      return {
        ...state,
        endDate: '',
        startDate: '',
      };

    case START_OVERTIMES:
      return {
        ...state,
        statusListOvertimes: statusList.process,
      };
    case SUCCESS_OVERTIMES:
      return {
        ...state,
        statusListOvertimes: statusList.success,
        dataListOvertimes: action.data,
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

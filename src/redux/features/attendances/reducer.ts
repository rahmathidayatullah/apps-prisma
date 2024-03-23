import {
  START_ATTENDACES,
  SUCCESS_ATTENDACES,
  ERROR_ATTENDACES,
  START_ATTENDACES_DETAIL,
  SUCCESS_ATTENDACES_DETAIL,
  ERROR_ATTENDACES_DETAIL,
} from './constants';

import {initialStateGlobalAttendaces} from './interface';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState: initialStateGlobalAttendaces = {
  page: 1,
  take: 100,
  order: 'DESC',
  statusListAttendaces: statusList.idle,
  statusAttendacesDetail: statusList.idle,
  dataListAttendaces: [],
};

export default function attendacesReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_ATTENDACES:
      return {
        ...state,
        statusListAttendaces: statusList.process,
      };
    case SUCCESS_ATTENDACES:
      return {
        ...state,
        statusListAttendaces: statusList.success,
        dataListAttendaces: action.data,
      };
    case ERROR_ATTENDACES:
      return {
        ...state,
        statusListAttendaces: statusList.error,
      };

    case START_ATTENDACES_DETAIL:
      return {
        ...state,
        statusAttendacesDetail: statusList.process,
      };
    case SUCCESS_ATTENDACES_DETAIL:
      return {
        ...state,
        statusAttendacesDetail: statusList.success,
      };
    case ERROR_ATTENDACES_DETAIL:
      return {
        ...state,
        statusAttendacesDetail: statusList.error,
      };

    default:
      return state;
  }
}

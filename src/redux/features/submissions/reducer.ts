import {
  START_SUBMISSIONS,
  SUCCESS_SUBMISSIONS,
  ERROR_SUBMISSIONS,
  START_SUBMISSIONS_DETAIL,
  SUCCESS_SUBMISSIONS_DETAIL,
  ERROR_SUBMISSIONS_DETAIL,
} from './constants';

import {initialStateGlobalSubmissions} from './interface';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState: initialStateGlobalSubmissions = {
  statusListSubmissions: statusList.idle,
  statusSubmissionsDetail: statusList.idle,
};

export default function submissionsReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_SUBMISSIONS:
      return {
        ...state,
        statusListSubmissions: statusList.process,
      };
    case SUCCESS_SUBMISSIONS:
      return {
        ...state,
        statusListSubmissions: statusList.success,
      };
    case ERROR_SUBMISSIONS:
      return {
        ...state,
        statusListSubmissions: statusList.error,
      };

    case START_SUBMISSIONS_DETAIL:
      return {
        ...state,
        statusSubmissionsDetail: statusList.process,
      };
    case SUCCESS_SUBMISSIONS_DETAIL:
      return {
        ...state,
        statusSubmissionsDetail: statusList.success,
      };
    case ERROR_SUBMISSIONS_DETAIL:
      return {
        ...state,
        statusSubmissionsDetail: statusList.error,
      };

    default:
      return state;
  }
}

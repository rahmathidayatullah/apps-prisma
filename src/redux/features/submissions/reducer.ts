import {
  START_SUBMISSIONS,
  SUCCESS_SUBMISSIONS,
  ERROR_SUBMISSIONS,
  START_SUBMISSIONS_DETAIL,
  SUCCESS_SUBMISSIONS_DETAIL,
  ERROR_SUBMISSIONS_DETAIL,
  START_CATEGORY_SUBMISSIONS,
  SUCCESS_CATEGORY_SUBMISSIONS,
  ERROR_CATEGORY_SUBMISSIONS,
} from './constants';

import {initialStateGlobalSubmissions} from './interface';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState: initialStateGlobalSubmissions = {
  page: 1,
  take: 1000,
  order: 'DESC',
  statusListSubmissions: statusList.idle,
  statusSubmissionsDetail: statusList.idle,
  listCategorySubmission: [],
  statusListCategorySubmission: statusList.idle,
  dataListSubmissions: [],
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
        dataListSubmissions: action.data,
      };
    case ERROR_SUBMISSIONS:
      return {
        ...state,
        statusListSubmissions: statusList.error,
      };

    case START_CATEGORY_SUBMISSIONS:
      return {
        ...state,
        statusListCategorySubmission: statusList.process,
      };
    case SUCCESS_CATEGORY_SUBMISSIONS:
      return {
        ...state,
        statusListCategorySubmission: statusList.success,
        listCategorySubmission: action.data,
      };
    case ERROR_CATEGORY_SUBMISSIONS:
      return {
        ...state,
        statusListCategorySubmission: statusList.error,
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

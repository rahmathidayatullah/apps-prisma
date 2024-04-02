import {
  START_FETCH_SHIFT,
  ERROR_FETCH_SHIFT,
  SUCCESS_FETCH_SHIFT,
} from './constants';
const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};
const initialState = {
  data: [],
  status: statusList.idle,
};

export default function shiftReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_FETCH_SHIFT:
      return {
        ...state,
        status: statusList.process,
      };
    case ERROR_FETCH_SHIFT:
      return {
        ...state,
        status: statusList.error,
      };
    case SUCCESS_FETCH_SHIFT:
      return {
        ...state,
        status: statusList.success,
        data: action.data,
      };
    default:
      return state;
  }
}

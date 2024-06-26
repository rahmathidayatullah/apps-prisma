import {
  START_FETCH_BLOCK_ALL,
  SUCCESS_FETCH_BLOCK_ALL,
  ERROR_FETCH_BLOCK_ALL,
} from './constants';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  listBlockAll: [],
  errorListBlockAll: null,
  statusListBlockAll: statusList.idle,
};

export default function phaseReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_FETCH_BLOCK_ALL:
      return {
        ...state,
        statusListBlockAll: statusList.process,
      };
    case SUCCESS_FETCH_BLOCK_ALL:
      return {
        ...state,
        statusListBlockAll: statusList.success,
        listBlockAll: action.data,
      };
    case ERROR_FETCH_BLOCK_ALL:
      return {
        ...state,
        statusListBlockAll: statusList.error,
        errorListBlockAll: action.data,
      };
    default:
      return state;
  }
}

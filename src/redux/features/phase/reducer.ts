import {
  START_FETCH_PHASE_ALL,
  SUCCESS_FETCH_PHASE_ALL,
  ERROR_FETCH_PHASE_ALL,
} from './constants';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  listPhaseAll: [],
  errorListPhaseAll: null,
  statusListPhaseAll: statusList.idle,
};

export default function phaseReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_FETCH_PHASE_ALL:
      return {
        ...state,
        statusListProject: statusList.process,
      };
    case ERROR_FETCH_PHASE_ALL:
      return {
        ...state,
        statusListProject: statusList.error,
        errorListPhaseAll: action.data,
      };
    case SUCCESS_FETCH_PHASE_ALL:
      return {
        ...state,
        statusListProject: statusList.success,
        listPhaseAll: action.data,
      };
    default:
      return state;
  }
}

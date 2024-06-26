import {
  START_GENERATE_FLPP,
  SUCCESS_GENERATE_FLPP,
  ERROR_GENERATE_FLPP,
  RESET_GENERATE_FLPP,
  RESET_STATUS_GENERATE_FLPP,
} from './constants';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  generateFlpp: null,
  statusGenerateFlpp: statusList.idle,
  errorGenerateFlpp: null,
};

export default function generateReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_GENERATE_FLPP:
      return {
        ...state,
        statusGenerateFlpp: statusList.process,
      };
    case SUCCESS_GENERATE_FLPP:
      return {
        ...state,
        statusGenerateFlpp: statusList.success,
        generateFlpp: action.data,
      };
    case ERROR_GENERATE_FLPP:
      return {
        ...state,
        statusGenerateFlpp: statusList.error,
        errorGenerateFlpp: action.data,
      };
    case RESET_GENERATE_FLPP:
      return {
        ...state,
        statusGenerateFlpp: statusList.idle,
        generateFlpp: null,
        errorGenerateFlpp: null,
      };
    case RESET_STATUS_GENERATE_FLPP:
      return {
        ...state,
        statusGenerateFlpp: statusList.idle,
      };
    default:
      return state;
  }
}

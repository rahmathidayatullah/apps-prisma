import {
  START_FETCH_PROJECT,
  SUCCESS_FETCH_PROJECT,
  ERROR_FETCH_PROJECT,
  START_FETCH_UNIT_PROJECT,
  SUCCESS_FETCH_UNIT_PROJECT,
  ERROR_FETCH_UNIT_PROJECT,
  START_FETCH_PROJECT_DETAIL,
  SUCCESS_FETCH_PROJECT_DETAIL,
  ERROR_FETCH_PROJECT_DETAIL,
  CHANGE_PHASE,
  CHANGE_BLOCK,
  CHANGE_UNIT,
  RESET_FILTER_PHASE_BLOCK_UNIT,
} from './constants';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  page: 1,
  take: 20,
  order: 'DESC',
  keyword: '',

  tahap: null,
  blok: null,
  unit: null,

  listProject: [],
  errorListProject: null,
  statusListProject: statusList.idle,

  listUnitProject: [],
  errorListUnitProject: null,
  statusListUnitProject: statusList.idle,

  detailProject: {
    siteplan_image: '',
  },
  errorDetailProject: null,
  statusDetailProject: statusList.idle,
};

export default function projectReducer(state = initialState, action: any) {
  switch (action.type) {
    case RESET_FILTER_PHASE_BLOCK_UNIT:
      return {
        ...state,
        tahap: null,
        blok: null,
        unit: null,
      };
    case START_FETCH_PROJECT:
      return {
        ...state,
        statusListProject: statusList.process,
      };
    case ERROR_FETCH_PROJECT:
      return {
        ...state,
        statusListProject: statusList.error,
        errorListProject: action.data,
      };
    case SUCCESS_FETCH_PROJECT:
      return {
        ...state,
        statusListProject: statusList.success,
        listProject: action.data,
      };
    case START_FETCH_UNIT_PROJECT:
      return {
        ...state,
        statusListUnitProject: statusList.process,
      };
    case ERROR_FETCH_UNIT_PROJECT:
      return {
        ...state,
        statusListUnitProject: statusList.error,
        errorListUnitProject: action.data,
      };
    case SUCCESS_FETCH_UNIT_PROJECT:
      return {
        ...state,
        statusListUnitProject: statusList.success,
        listUnitProject: action.data,
      };
    case START_FETCH_PROJECT_DETAIL:
      return {
        ...state,
        statusDetailProject: statusList.process,
      };
    case ERROR_FETCH_PROJECT_DETAIL:
      return {
        ...state,
        statusDetailProject: statusList.error,
        errorDetailProject: action.data,
      };
    case SUCCESS_FETCH_PROJECT_DETAIL:
      return {
        ...state,
        statusDetailProject: statusList.success,
        detailProject: action.data,
      };

    case CHANGE_PHASE:
      return {
        ...state,
        tahap: action.value,
      };
    case CHANGE_BLOCK:
      return {
        ...state,
        blok: action.value,
      };
    case CHANGE_UNIT:
      return {
        ...state,
        unit: action.value,
      };
    default:
      return state;
  }
}

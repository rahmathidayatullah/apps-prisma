import {
  START_FETCH_ANNOUCEMENT,
  SUCCESS_FETCH_ANNOUCEMENT,
  ERROR_FETCH_ANNOUCEMENT,
  START_FETCH_ANNOUCEMENT_DETAIL,
  SUCCESS_FETCH_ANNOUCEMENT_DETAIL,
  ERROR_FETCH_ANNOUCEMENT_DETAIL,
} from './constants';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  statusList: statusList.idle,
  page: 1,
  take: 5,
  order: 'DESC',
  // keyword: "",
  // startDate: "",
  // endDate: "",
  dataList: [],
  amountOfData: 0,
  //
  statusDetail: statusList.idle,
  dataDetail: null,
};

export default function announcementReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_FETCH_ANNOUCEMENT:
      return {
        ...state,
        statusList: statusList.process,
      };
    case SUCCESS_FETCH_ANNOUCEMENT:
      return {
        ...state,
        statusList: statusList.success,
        dataList: action.data,
        amountOfData: action.amountOfData,
      };
    case ERROR_FETCH_ANNOUCEMENT:
      return {
        ...state,
        statusList: statusList.error,
      };

    case START_FETCH_ANNOUCEMENT_DETAIL:
      return {
        ...state,
        statusDetail: statusList.process,
      };
    case SUCCESS_FETCH_ANNOUCEMENT_DETAIL:
      return {
        ...state,
        statusDetail: statusList.success,
        dataDetail: action.data,
      };
    case ERROR_FETCH_ANNOUCEMENT_DETAIL:
      return {
        ...state,
        statusDetail: statusList.error,
      };

    default:
      return state;
  }
}

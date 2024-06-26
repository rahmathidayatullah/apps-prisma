import {
  START_CREATE_BOOKING,
  SUCCESS_CREATE_BOOKING,
  ERROR_CREATE_BOOKING,
  RESET_CREATE_BOOKING,
  RESET_STATUS_CREATE_BOOKING,
  START_UPDATE_BOOKING,
  SUCCESS_UPDATE_BOOKING,
  ERROR_UPDATE_BOOKING,
  RESET_UPDATE_BOOKING,
  RESET_STATUS_UPDATE_BOOKING,
  START_UPLOAD_BERKAS_BOOKING,
  SUCCESS_UPLOAD_BERKAS_BOOKING,
  ERROR_UPLOAD_BERKAS_BOOKING,
  RESET_UPLOAD_BERKAS_BOOKING,
  RESET_STATUS_UPLOAD_BERKAS_BOOKING,
  START_FETCH_BOOKING_MINE,
  SUCCESS_FETCH_BOOKING_MINE,
  ERROR_FETCH_BOOKING_MINE,
  START_FETCH_BOOKING_DETAIL,
  SUCCESS_FETCH_BOOKING_DETAIL,
  ERROR_FETCH_BOOKING_DETAIL,
  START_REVIEW_ADM_BOOKING,
  SUCCESS_REVIEW_ADM_BOOKING,
  ERROR_REVIEW_ADM_BOOKING,
  RESET_REVIEW_ADM_BOOKING,
  RESET_STATUS_REVIEW_ADM_BOOKING,
} from './constants';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  page: 1,
  take: 100,
  order: 'DESC',
  keyword: '',

  bookingListMine: [],
  statusListBookingMine: statusList.idle,
  errorListBooking: null,

  bookingDetail: null,
  statusDetailBooking: statusList.idle,
  errorDetailBooking: null,

  bookingCreate: null,
  statusCreateBooking: statusList.idle,
  errorCreateBooking: null,

  bookingUpdate: null,
  statusUpdateBooking: statusList.idle,
  errorUpdateBooking: null,

  reviewBerkasAdm: null,
  statusReviewBerkasAdm: statusList.idle,
  errorReviewBerkasAdm: null,

  bookingUploadBerkas: null,
  statusUploadBerkasBooking: statusList.idle,
  errorUploadBerkasBooking: null,
  fileKey: '',
};

export default function bookingReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_REVIEW_ADM_BOOKING:
      return {
        ...state,
        statusReviewBerkasAdm: statusList.process,
      };
    case SUCCESS_REVIEW_ADM_BOOKING:
      return {
        ...state,
        statusReviewBerkasAdm: statusList.success,
        reviewBerkasAdm: action.data,
      };
    case ERROR_REVIEW_ADM_BOOKING:
      return {
        ...state,
        statusReviewBerkasAdm: statusList.error,
        errorReviewBerkasAdm: action.data,
      };
    case RESET_REVIEW_ADM_BOOKING:
      return {
        ...state,
        statusReviewBerkasAdm: statusList.idle,
        reviewBerkasAdm: null,
        errorReviewBerkasAdm: null,
      };
    case RESET_STATUS_REVIEW_ADM_BOOKING:
      return {
        ...state,
        statusReviewBerkasAdm: statusList.idle,
      };

    case START_CREATE_BOOKING:
      return {
        ...state,
        statusCreateBooking: statusList.process,
      };
    case SUCCESS_CREATE_BOOKING:
      return {
        ...state,
        statusCreateBooking: statusList.success,
        bookingCreate: action.data,
      };
    case ERROR_CREATE_BOOKING:
      return {
        ...state,
        statusCreateBooking: statusList.error,
        errorCreateBooking: action.data,
      };
    case RESET_CREATE_BOOKING:
      return {
        ...state,
        statusCreateBooking: statusList.idle,
        bookingCreate: null,
        errorCreateBooking: null,
      };
    case RESET_STATUS_CREATE_BOOKING:
      return {
        ...state,
        statusCreateBooking: statusList.idle,
      };
    case START_UPDATE_BOOKING:
      return {
        ...state,
        statusUpdateBooking: statusList.process,
      };
    case SUCCESS_UPDATE_BOOKING:
      return {
        ...state,
        statusUpdateBooking: statusList.success,
        bookingUpdate: action.data,
      };
    case ERROR_UPDATE_BOOKING:
      return {
        ...state,
        statusUpdateBooking: statusList.error,
        errorUpdateBooking: action.data,
      };
    case RESET_UPDATE_BOOKING:
      return {
        ...state,
        statusUpdateBooking: statusList.idle,
        bookingUpdate: null,
        errorUpdateBooking: null,
      };
    case RESET_STATUS_UPDATE_BOOKING:
      return {
        ...state,
        statusUpdateBooking: statusList.idle,
      };
    case START_UPLOAD_BERKAS_BOOKING:
      return {
        ...state,
        statusUploadBerkasBooking: statusList.process,
        fileKey: action.fileKey,
      };
    case SUCCESS_UPLOAD_BERKAS_BOOKING:
      return {
        ...state,
        statusUploadBerkasBooking: statusList.success,
        bookingUploadBerkas: action.data,
      };
    case ERROR_UPLOAD_BERKAS_BOOKING:
      return {
        ...state,
        statusUploadBerkasBooking: statusList.error,
        errorUploadBerkasBooking: action.data,
      };
    case RESET_UPLOAD_BERKAS_BOOKING:
      return {
        ...state,
        statusUploadBerkasBooking: statusList.idle,
        bookingUploadBerkas: null,
        errorUploadBerkasBooking: null,
      };
    case RESET_STATUS_UPLOAD_BERKAS_BOOKING:
      return {
        ...state,
        statusUploadBerkasBooking: statusList.idle,
      };
    case START_FETCH_BOOKING_DETAIL:
      return {
        ...state,
        statusDetailBooking: statusList.process,
      };
    case SUCCESS_FETCH_BOOKING_DETAIL:
      return {
        ...state,
        statusDetailBooking: statusList.success,
        bookingDetail: action.data,
      };
    case ERROR_FETCH_BOOKING_DETAIL:
      return {
        ...state,
        statusDetailBooking: statusList.error,
        errorDetailBooking: action.data,
      };
    case START_FETCH_BOOKING_MINE:
      return {
        ...state,
        statusListBookingMine: statusList.process,
      };
    case SUCCESS_FETCH_BOOKING_MINE:
      return {
        ...state,
        statusListBookingMine: statusList.success,
        bookingListMine: action.data,
      };
    case ERROR_FETCH_BOOKING_MINE:
      return {
        ...state,
        statusListBookingMine: statusList.error,
        errorListBooking: action.data,
      };
    default:
      return state;
  }
}

import debounce from 'debounce-promise';
import {Alert} from 'react-native';

import {
  START_CREATE_BOOKING,
  SUCCESS_CREATE_BOOKING,
  ERROR_CREATE_BOOKING,
  START_UPDATE_BOOKING,
  SUCCESS_UPDATE_BOOKING,
  ERROR_UPDATE_BOOKING,
  START_UPLOAD_BERKAS_BOOKING,
  SUCCESS_UPLOAD_BERKAS_BOOKING,
  ERROR_UPLOAD_BERKAS_BOOKING,
  START_FETCH_BOOKING_MINE,
  SUCCESS_FETCH_BOOKING_MINE,
  ERROR_FETCH_BOOKING_MINE,
  START_FETCH_BOOKING_DETAIL,
  SUCCESS_FETCH_BOOKING_DETAIL,
  ERROR_FETCH_BOOKING_DETAIL,
  CHANGE_PAGE,
  CHANGE_KEYWORD,
  CHANGE_LIMIT,
  START_REVIEW_ADM_BOOKING,
  SUCCESS_REVIEW_ADM_BOOKING,
  ERROR_REVIEW_ADM_BOOKING,
} from './constants';

import {SUCCESS_LOGOUT} from '../auth/constants';

import {
  getBookingMine,
  getDetailBooking,
  patchBooking,
  postBerkasReview,
  postBooking,
  postBookingUploadBerkas,
} from '../../../api/booking';

const debounceGetBookingMine = debounce(getBookingMine, 100);

export const fetchBookingMine = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: START_FETCH_BOOKING_MINE,
    });
    console.log('start fetchBookingMine');

    const page = getState().booking.page;
    const take = getState().booking.take;
    const order = getState().booking.order;
    const keyword = getState().booking.keyword;

    const params = {
      page,
      take,
      order,
      search: keyword,
    };

    try {
      const {
        data: {data},
      } = await debounceGetBookingMine(params);
      console.log('success fetchBookingMine', data);

      dispatch({
        type: SUCCESS_FETCH_BOOKING_MINE,
        data,
      });
    } catch (error: any) {
      console.log('error fetchBookingMine', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_FETCH_BOOKING_MINE,
          data: error,
        });
      }
    }
  };
};

export const fetchBookingDetail = (idBooking: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: START_FETCH_BOOKING_DETAIL,
    });
    console.log('start fetchBookingDetail');
    try {
      const {
        data: {data},
      } = await getDetailBooking(idBooking);
      console.log('success fetchBookingDetail', data);

      dispatch({
        type: SUCCESS_FETCH_BOOKING_DETAIL,
        data,
      });
    } catch (error: any) {
      console.log('error fetchBookingDetail', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_FETCH_BOOKING_DETAIL,
          data: error,
        });
      }
    }
  };
};

export const createBooking = (body: {
  name: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  identityNumber: string;
  unitId: number;
}) => {
  return async (dispatch: any) => {
    dispatch({
      type: START_CREATE_BOOKING,
    });
    console.log('start createBooking');

    try {
      const {
        data: {data},
      } = await postBooking(body);
      console.log('success createBooking', data);

      dispatch({
        type: SUCCESS_CREATE_BOOKING,
        data,
      });
    } catch (error: any) {
      console.log('error createBooking', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_CREATE_BOOKING,
          data: error,
        });
      }
    }
  };
};

export const reviewBerkasById = (bookingId: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: START_REVIEW_ADM_BOOKING,
    });
    console.log('start reviewBerkasById');

    try {
      const {
        data: {data},
      } = await postBerkasReview(bookingId);
      console.log('success reviewBerkasById', data);

      dispatch({
        type: SUCCESS_REVIEW_ADM_BOOKING,
        data,
      });
    } catch (error: any) {
      console.log('error reviewBerkasById', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_REVIEW_ADM_BOOKING,
          data: error,
        });
      }
    }
  };
};

export const updateBooking = (
  bookingId: string,
  body: {
    name: string;
    address: string;
    phone: string;
    emergencyPhone: string;
    identityNumber: string;
    unitId: number;
  },
) => {
  return async (dispatch: any) => {
    dispatch({
      type: START_UPDATE_BOOKING,
    });
    console.log('start updateBooking');

    try {
      const {
        data: {data},
      } = await patchBooking(bookingId, body);
      console.log('success updateBooking', data);

      dispatch({
        type: SUCCESS_UPDATE_BOOKING,
        data,
      });
    } catch (error: any) {
      console.log('error updateBooking', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_UPDATE_BOOKING,
          data: error,
        });
      }
    }
  };
};

export const uploadBerkasBooking = (
  // idBooking: string,
  // body: {
  //   slipGaji: string;
  //   KTP: string;
  //   SKKerja: string;
  //   rekeningKoran: string;
  //   bukuNikah: string;
  //   NPWP: string;
  //   BPJS: string;
  //   BPJSTK: string;
  //   KK: string;
  //   SKDomisili: string;
  //   SPT: string;
  //   formAplikasi: string;
  //   formWawancara: string;
  //   FLPP: string;
  //   SIKasep: string;
  //   bestTimeToCall: string;
  //   slipGajiPasangan: string;
  //   KTPPasangan: string;
  // },
  idBooking: string,
  body: any,
  fileKey: string,
) => {
  // console.log('body', body);
  return async (dispatch: any) => {
    dispatch({
      type: START_UPLOAD_BERKAS_BOOKING,
      fileKey,
    });
    console.log('start uploadBerkasBooking');

    try {
      const {
        data: {data},
      } = await postBookingUploadBerkas(idBooking, body);
      console.log('success uploadBerkasBooking', data);

      dispatch({
        type: SUCCESS_UPLOAD_BERKAS_BOOKING,
        data,
      });
    } catch (error: any) {
      console.log('error uploadBerkasBooking', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_UPLOAD_BERKAS_BOOKING,
          data: error,
        });
      }
    }
  };
};

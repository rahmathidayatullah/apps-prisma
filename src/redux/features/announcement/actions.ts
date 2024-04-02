import debounce from 'debounce-promise';
import {
  START_FETCH_ANNOUCEMENT,
  SUCCESS_FETCH_ANNOUCEMENT,
  ERROR_FETCH_ANNOUCEMENT,
  START_FETCH_ANNOUCEMENT_DETAIL,
  SUCCESS_FETCH_ANNOUCEMENT_DETAIL,
  ERROR_FETCH_ANNOUCEMENT_DETAIL,
} from './constants';

import {getAnnoucement, getAnnoucementById} from '../../../api/announcement';
import {SUCCESS_LOGOUT} from '../auth/constants';
import {Alert} from 'react-native';
// import { currentDateWithFormat, futureDateOneYear } from '../../../contants/routes';

const debounceGetAnnoucement = debounce(getAnnoucement, 100);

export const getListAnnoucement = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: START_FETCH_ANNOUCEMENT,
    });
    console.log('start fetch getListAnnoucement');

    const page = getState().announcement.page;
    const take = getState().announcement.take;
    const order = getState().announcement.order;
    //   const keyword = getState().annoucement.keyword;
    //   const startDate = getState().annoucement.startDate || currentDateWithFormat;
    //   const endDate = getState().annoucement.endDate || futureDateOneYear;

    const params = {
      page,
      take: 100,
      order,
      // search: keyword,
      // endDate,
      // startDate,
    };

    try {
      const {
        data: {data},
      } = await debounceGetAnnoucement(params);
      console.log('success fetch getListAnnoucement', data);

      let newData = [];

      if (data.length) {
        newData = data.filter((item: any) => item.publish);
      }

      dispatch({
        type: SUCCESS_FETCH_ANNOUCEMENT,
        data: newData,
      });
    } catch (error: any) {
      console.log('error fetch getListAnnoucement', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_FETCH_ANNOUCEMENT,
        });
      }
    }
  };
};

export const getListAnnoucementHome = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: START_FETCH_ANNOUCEMENT,
    });
    console.log('start fetch getListAnnoucement');

    const page = getState().announcement.page;
    const take = getState().announcement.take;
    const order = getState().announcement.order;
    //   const keyword = getState().annoucement.keyword;
    //   const startDate = getState().annoucement.startDate || currentDateWithFormat;
    //   const endDate = getState().annoucement.endDate || futureDateOneYear;

    const params = {
      page,
      take: 5,
      order,
      // search: keyword,
      // endDate,
      // startDate,
    };

    try {
      const {
        data: {data},
      } = await debounceGetAnnoucement(params);
      console.log('success fetch getListAnnoucement', data);

      let newData = [];

      if (data.length) {
        newData = data.filter((item: any) => item.publish);
      }

      dispatch({
        type: SUCCESS_FETCH_ANNOUCEMENT,
        data: newData,
      });
    } catch (error: any) {
      console.log('error fetch getListAnnoucement', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_FETCH_ANNOUCEMENT,
        });
      }
    }
  };
};

export const getAnnoucementDetail = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: START_FETCH_ANNOUCEMENT_DETAIL,
    });
    console.log('start fetch getAnnoucementDetail');

    try {
      const {
        data: {data},
      } = await getAnnoucementById(id);
      console.log('success fetch getAnnoucementDetail', data);

      dispatch({
        type: SUCCESS_FETCH_ANNOUCEMENT_DETAIL,
        data,
      });
    } catch (error: any) {
      console.log('error fetch getAnnoucementDetail', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_FETCH_ANNOUCEMENT_DETAIL,
        });
      }
    }
  };
};

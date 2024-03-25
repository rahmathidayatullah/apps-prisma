import debounce from 'debounce-promise';
import {
  START_ATTENDACES,
  SUCCESS_ATTENDACES,
  ERROR_ATTENDACES,
  START_ATTENDACES_DETAIL,
  SUCCESS_ATTENDACES_DETAIL,
  ERROR_ATTENDACES_DETAIL,
} from './constants';

import {getAttendaces} from '../../../api/attendace';
import {SUCCESS_LOGOUT} from '../auth/constants';
import {Alert} from 'react-native';
import { currentDateWithFormat, futureDateOneYear } from '../../../contants/routes';

const debounceGetAttendaces = debounce(getAttendaces, 100);

export const getListAttendances = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: START_ATTENDACES,
    });
    console.log('start fetch getListAttendances');

    const page = getState().attendances.page;
    const take = getState().attendances.take;
    const order = getState().attendances.order;
    const keyword = getState().attendances.keyword;
    const startDate = getState().attendances.startDate || currentDateWithFormat;
    const endDate = getState().attendances.endDate || futureDateOneYear;

    const params = {
      page,
      take,
      order,
      search: keyword,
      endDate,
      startDate,
    };

    try {
      const {
        data: {data},
      } = await debounceGetAttendaces(params);
      console.log('success fetch getListAttendances', data);

      dispatch({
        type: SUCCESS_ATTENDACES,
        data,
      });
    } catch (error: any) {
      console.log('error fetch getListAttendances', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_ATTENDACES,
        });
      }
    }
  };
};

export const getAttendancesDetail = (id: string) => {
  // return async (dispatch: any, getState:any) => {
  //   dispatch({
  //     type: START_ATTENDACES_DETAIL,
  //   });
  //   try {
  //     const {
  //       data: {data},
  //     } = await login(email, password);
  //     dispatch({
  //       type: SUCCESS_ATTENDACES_DETAIL,
  //       userData: data,
  //     });
  //   } catch (error: any) {
  //     dispatch({
  //       type: ERROR_ATTENDACES_DETAIL,
  //     });
  //   }
  // };
};

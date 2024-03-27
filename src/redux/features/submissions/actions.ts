import debounce from 'debounce-promise';

import {Alert} from 'react-native';
import {getCategorySubmission, getSubmissions} from '../../../api/submission';
import {SUCCESS_LOGOUT} from '../auth/constants';
import {
  START_SUBMISSIONS,
  SUCCESS_SUBMISSIONS,
  ERROR_SUBMISSIONS,
  START_SUBMISSIONS_DETAIL,
  SUCCESS_SUBMISSIONS_DETAIL,
  ERROR_SUBMISSIONS_DETAIL,
} from './constants';
import {
  currentDateWithFormat,
  futureDateOneYear,
} from '../../../contants/routes';

const debounceGetSubmissions = debounce(getSubmissions, 100);

export const getListSubmissions = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: START_SUBMISSIONS,
    });

    const page = getState().submissions.page;
    const take = getState().submissions.take;
    const order = getState().submissions.order;
    const keyword = getState().submissions.keyword;
    const startDate = getState().submissions.startDate || currentDateWithFormat;
    const endDate = getState().submissions.endDate || futureDateOneYear;

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
      } = await debounceGetSubmissions(params);
      console.log('success fetch getListSubmissions', data);
      dispatch({
        type: SUCCESS_SUBMISSIONS,
        data,
      });
    } catch (error: any) {
      console.log('error fetch getListSubmissions', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_SUBMISSIONS,
        });
      }
    }
  };
};

export const getSubmissionsDetail = (id: string) => {
  // return async (dispatch: any, getState:any) => {
  //   dispatch({
  //     type: START_SUBMISSIONS_DETAIL,
  //   });
  //   try {
  //     const {
  //       data: {data},
  //     } = await login(email, password);
  //     dispatch({
  //       type: SUCCESS_SUBMISSIONS_DETAIL,
  //       userData: data,
  //     });
  //   } catch (error: any) {
  //     dispatch({
  //       type: ERROR_SUBMISSIONS_DETAIL,
  //     });
  //   }
  // };
};

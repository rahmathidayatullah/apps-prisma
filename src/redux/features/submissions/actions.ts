import {
  START_SUBMISSIONS,
  SUCCESS_SUBMISSIONS,
  ERROR_SUBMISSIONS,
  START_SUBMISSIONS_DETAIL,
  SUCCESS_SUBMISSIONS_DETAIL,
  ERROR_SUBMISSIONS_DETAIL,
} from './constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getListSubmissions = () => {
  // return async (dispatch: any, getState:any) => {
  //   dispatch({
  //     type: START_SUBMISSIONS,
  //   });
  //   try {
  //     const {
  //       data: {data},
  //     } = await login(email, password);
  //     dispatch({
  //       type: SUCCESS_SUBMISSIONS,
  //       userData: data,
  //     });
  //   } catch (error: any) {
  //     dispatch({
  //       type: ERROR_SUBMISSIONS,
  //     });
  //   }
  // };
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

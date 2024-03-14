import {
  START_ATTENDACES,
  SUCCESS_ATTENDACES,
  ERROR_ATTENDACES,
  START_ATTENDACES_DETAIL,
  SUCCESS_ATTENDACES_DETAIL,
  ERROR_ATTENDACES_DETAIL,
} from './constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getListAttendances = () => {
  // return async (dispatch: any, getState:any) => {
  //   dispatch({
  //     type: START_ATTENDACES,
  //   });
  //   try {
  //     const {
  //       data: {data},
  //     } = await login(email, password);
  //     dispatch({
  //       type: SUCCESS_ATTENDACES,
  //       userData: data,
  //     });
  //   } catch (error: any) {
  //     dispatch({
  //       type: ERROR_ATTENDACES,
  //     });
  //   }
  // };
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

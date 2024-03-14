import {START_OVERTIMES, SUCCESS_OVERTIMES, ERROR_OVERTIMES} from './constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getListOvertimes = () => {
  // return async (dispatch: any, getState:any) => {
  //   dispatch({
  //     type: START_OVERTIMES,
  //   });
  //   try {
  //     const {
  //       data: {data},
  //     } = await login(email, password);
  //     dispatch({
  //       type: SUCCESS_OVERTIMES,
  //       userData: data,
  //     });
  //   } catch (error: any) {
  //     dispatch({
  //       type: ERROR_OVERTIMES,
  //     });
  //   }
  // };
};

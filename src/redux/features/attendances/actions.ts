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

const debounceGetAttendaces = debounce(getAttendaces, 100);

export const getListAttendances = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: START_ATTENDACES,
    });

    const page = getState().attendances.page;
    const take = getState().attendances.take;
    const order = getState().attendances.order;

    const params = {
      page,
      take,
      order,
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
      dispatch({
        type: ERROR_ATTENDACES,
      });
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

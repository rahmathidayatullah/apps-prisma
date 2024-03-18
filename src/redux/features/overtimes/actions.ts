import debounce from 'debounce-promise';
import {START_OVERTIMES, SUCCESS_OVERTIMES, ERROR_OVERTIMES} from './constants';

import {getOvertimes} from '../../../api/overtime';
import {SUCCESS_LOGOUT} from '../auth/constants';
import {Alert} from 'react-native';

const debounceOvertimes = debounce(getOvertimes, 100);

export const getListOvertimes = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: START_OVERTIMES,
    });

    const page = getState().overtimes.page;
    const take = getState().overtimes.take;
    const order = getState().overtimes.order;

    const params = {
      page,
      take,
      order,
    };

    try {
      const {
        data: {data},
      } = await debounceOvertimes(params);
      console.log('success fetch getListOvertimes', data);
      dispatch({
        type: SUCCESS_OVERTIMES,
        data,
      });
    } catch (error: any) {
      console.log('error fetch getListOvertimes', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_OVERTIMES,
        });
      }
    }
  };
};

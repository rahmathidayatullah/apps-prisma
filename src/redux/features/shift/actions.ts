import {getShift} from '../../../api/shift';
import {
  START_FETCH_SHIFT,
  ERROR_FETCH_SHIFT,
  SUCCESS_FETCH_SHIFT,
} from './constants';
import {SUCCESS_LOGOUT} from '../auth/constants';
import {Alert} from 'react-native';

export const fetchShift = () => {
  return async (dispatch: any) => {
    dispatch({
      type: START_FETCH_SHIFT,
    });
    console.log('start fetch redux Shift');
    try {
      const {
        data: {data},
      } = await getShift();

      let newData: any = [];

      if (data.length) {
        newData = data.map((item: any) => {
          return {
            ...item,
            label: `${item.name} - ${item.start_time} : ${item.end_time}`,
            value: item.id,
          };
        });
      }

      console.log('success fetch redux Shift', data);
      dispatch({
        type: SUCCESS_FETCH_SHIFT,
        data: newData,
      });
    } catch (error: any) {
      console.log('error fetch redux Shift', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({type: ERROR_FETCH_SHIFT});
      }
    }
  };
};

import {Alert} from 'react-native';

import {
  START_FETCH_PHASE_ALL,
  SUCCESS_FETCH_PHASE_ALL,
  ERROR_FETCH_PHASE_ALL,
} from './constants';
import {SUCCESS_LOGOUT} from '../auth/constants';

import {getPhaseAll} from '../../../api/phase';

export const fetchPhaseAll = (projectId: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: START_FETCH_PHASE_ALL,
    });
    console.log('start fetchPhaseAll');

    try {
      const {
        data: {data},
      } = await getPhaseAll(projectId);
      console.log('success fetchPhaseAll', data);

      let newData: any = [];

      if (data.length) {
        newData = data.map((item: any) => {
          return {
            ...item,
            label: item.name,
            value: item.id,
          };
        });
      }
      newData.push({label: 'All', value: null});

      dispatch({
        type: SUCCESS_FETCH_PHASE_ALL,
        data: newData,
      });
    } catch (error: any) {
      console.log('error fetchPhaseAll', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_FETCH_PHASE_ALL,
          data: error,
        });
      }
    }
  };
};

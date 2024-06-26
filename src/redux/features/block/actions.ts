import {Alert} from 'react-native';

import {
  START_FETCH_BLOCK_ALL,
  SUCCESS_FETCH_BLOCK_ALL,
  ERROR_FETCH_BLOCK_ALL,
} from './constants';
import {SUCCESS_LOGOUT} from '../auth/constants';

import {getBlocksAll} from '../../../api/block';

export const fetchBlockAll = (projectId: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: START_FETCH_BLOCK_ALL,
    });
    console.log('start fetchBlockAll');

    try {
      const {
        data: {data},
      } = await getBlocksAll(projectId);
      console.log('success fetchBlockAll', data);

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
        type: SUCCESS_FETCH_BLOCK_ALL,
        data: newData,
      });
    } catch (error: any) {
      console.log('error fetchBlockAll', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_FETCH_BLOCK_ALL,
          data: error,
        });
      }
    }
  };
};

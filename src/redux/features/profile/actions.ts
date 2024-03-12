import {getProfile} from '../../../api/user';
import {
  START_FETCH_PROFILE,
  ERROR_FETCH_PROFILE,
  SUCCESS_FETCH_PROFILE,
} from './constants';
import {SUCCESS_LOGOUT} from '../auth/constants';
import {Alert} from 'react-native';

export const fetchProfile = () => {
  return async (dispatch: any) => {
    dispatch({
      type: START_FETCH_PROFILE,
    });
    try {
      const {
        data: {data},
      } = await getProfile();
      dispatch({
        type: SUCCESS_FETCH_PROFILE,
        profile: data,
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({type: ERROR_FETCH_PROFILE});
      }
    }
  };
};

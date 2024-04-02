import {
  ERROR_LOGIN,
  START_LOGIN,
  SUCCESS_LOGIN,
  SUCCESS_LOGOUT,
} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {login} from '../../../api/auth';

export const initAuth = () => {
  return async (dispatch: any) => {
    const userData: any = await AsyncStorage.getItem('userData');
    let newUserData = null;

    if (typeof userData === 'string') {
      newUserData = JSON.parse(userData);
    }

    if (userData) {
      dispatch({
        type: SUCCESS_LOGIN,
        userData: newUserData,
      });
    }
  };
};

export const postLogin = (body: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: START_LOGIN,
    });
    console.log('start postLogin');
    try {
      const {
        data: {data},
      } = await login(body);

      console.log('success postLogin', data);

      await AsyncStorage.setItem('userData', JSON.stringify(data));
      dispatch({
        type: SUCCESS_LOGIN,
        userData: data,
      });
    } catch (error: any) {
      console.log('error postLogin', error);
      dispatch({
        type: ERROR_LOGIN,
        error: error?.response?.data ?? undefined,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch: any, getState: any) => {
    await AsyncStorage.clear();
    dispatch({
      type: SUCCESS_LOGOUT,
    });
  };
};

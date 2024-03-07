import {LOGIN, LOGOUT} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initAuth = () => {
  return async (dispatch: any, getState: any) => {
    let token: any = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('token fetched', token);
      dispatch({
        type: LOGIN,
        payload: token,
      });
    }
  };
};

export const login = (email: string, password: number | string) => {
  return async (dispatch: any, getState: any) => {
    let token: any = null;

    console.log('email', email);
    console.log('password', password);

    if (email === 'rahmat@gmail.com' && password === '1234') {
      token = email + password;
      await AsyncStorage.setItem('token', token);
    }

    dispatch({
      type: LOGIN,
      payload: token,
    });
  };
};
export const logout = () => {
  return async (dispatch: any, getState: any) => {
    await AsyncStorage.clear();
    dispatch({
      type: LOGOUT,
    });
  };
};

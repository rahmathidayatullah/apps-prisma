import axios from 'axios';
// import {routeMenu} from '../contants/routes';

import AsyncStorage from '@react-native-async-storage/async-storage';
// const baseURL = 'https://api.dotlike.site';
import {baseURL} from '../api/config';

const createAxiosInstance = () => {
  const instance = axios.create();
  instance.interceptors.request.use(
    async config => {
      config.baseURL = baseURL;
      const userData: any = await AsyncStorage.getItem('userData');

      let newUserData = null;

      if (typeof userData === 'string') {
        newUserData = JSON.parse(userData);
      }

      // console.log('newUserData', newUserData);

      // console.log('=======>>>>>>>>>>> ada token', newUserData);
      if (newUserData) {
        // console.log('=======>>>>>>>>>>> ada token');
        config.headers.Authorization = `Bearer ${newUserData.access_token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      if (error.response.status === 401) {
        // Perform logout or token refresh, etc.
        // Example: Redirect to login screen
        // console.log('=====================>>>>>>> error 401');
        // AsyncStorage.clear();
        // navigation.navigate(routeMenu.LOGIN);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default createAxiosInstance;

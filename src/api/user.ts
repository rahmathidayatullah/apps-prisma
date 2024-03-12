import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getProfile() {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get('https://api.dotlike.site/users/profile', {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

// import createAxiosInstance from '../utils/axios';
// const axiosInstance = createAxiosInstance();
// const axiosInstance = createAxiosInstance();

// export async function getProfile() {
//   return await axiosInstance.get('/users/profile');
// }

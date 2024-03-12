import axios from 'axios';
// import createAxiosInstance from '../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const axiosInstance = createAxiosInstance();

export async function postClockIn(payload: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData: any = null;
  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }
  return await axios.patch(
    'https://api.dotlike.site/attendances/clock-in',
    payload,
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${newUserData.access_token}`,
      },
    },
  );
}

export async function postClockOut(payload: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData: any = null;
  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }
  return await axios.patch(
    'https://api.dotlike.site/attendances/clock-out',
    payload,
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${newUserData.access_token}`,
      },
    },
  );
}

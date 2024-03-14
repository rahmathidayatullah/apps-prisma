import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://api.dotlike.site';

export async function postClockIn(payload: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData: any = null;
  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }
  return await axios.patch(`${baseURL}/attendances/clock-in`, payload, {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function postClockOut(payload: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData: any = null;
  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }
  return await axios.patch(`${baseURL}/attendances/clock-out`, payload, {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function postOvertime(payload: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData: any = null;
  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }
  return await axios.post(`${baseURL}/overtimes`, payload, {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

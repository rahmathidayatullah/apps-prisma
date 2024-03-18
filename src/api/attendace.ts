import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://api.dotlike.site';

export async function getAttendaces(params: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/attendances/mine`, {
    headers: {
      params,
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function getAttendacesById(id: string) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/attendances/${id}`, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

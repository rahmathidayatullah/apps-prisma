import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://api.dotlike.site';

export async function getOvertimes(params: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/overtimes/mine`, {
    headers: {
      params,
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function patchOvertimes(body: any, id: string) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.patch(`${baseURL}/overtimes/${id}`, body, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

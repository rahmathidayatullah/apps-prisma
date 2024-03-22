import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL = 'https://api.dotlike.site';

export async function getProfile() {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function patchProfile(body: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.patch(`${baseURL}/users/profile`, body, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

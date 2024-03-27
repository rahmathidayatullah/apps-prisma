import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://api.dotlike.site';

export async function getAnnoucement(params: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/announcements`, {
    params,
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function getAnnoucementById(id: string) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/announcements/${id}`, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

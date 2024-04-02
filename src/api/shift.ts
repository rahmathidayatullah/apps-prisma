import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://api.dotlike.site';

export async function getShift() {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/shifts`, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

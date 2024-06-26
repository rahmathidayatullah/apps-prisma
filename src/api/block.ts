import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseURL} from './config';

export async function getBlocksAll(idProject: string) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/blocks/project/${idProject}/all`, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

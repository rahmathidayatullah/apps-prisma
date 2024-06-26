import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseURL} from './config';

export async function getProject(params: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/projects`, {
    params,
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function getUnitProjectId(id: string, params: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/units/projects/${id}`, {
    params,
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function getProjectDetail(id: string) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

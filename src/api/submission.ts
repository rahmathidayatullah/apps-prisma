import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://api.dotlike.site';

export async function getSubmissions(params: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/submissions/mine`, {
    headers: {
      params,
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function getSubmissionsById(id: string) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/submissions/${id}`, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function getCategorySubmission() {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/submission-categories`, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function postSubmission(body: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.post(`${baseURL}/submissions`, body, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

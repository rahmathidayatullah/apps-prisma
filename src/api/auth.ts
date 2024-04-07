import axios from 'axios';

const baseURL = 'https://api.dotlike.site';

export async function login(body: any) {
  return await axios.post(`${baseURL}/auth/login`, body, {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });
}

export async function forgotPassword(body: any) {
  return await axios.post(`${baseURL}/auth/forgot-password`, body, {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });
}

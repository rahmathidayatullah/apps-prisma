import axios from 'axios';

const baseURL = 'https://api.dotlike.site';

export async function login(email: string, password: string | number) {
  return await axios.post(`${baseURL}/auth/login`, {
    email,
    password,
  });
}

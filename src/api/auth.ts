import axios from 'axios';

const baseURL = 'http://api.dotlike.site';

export async function login(email: string, password: string | number) {
  // return await axios.post(`${baseURL}/auth/login`, {
  return await axios.post('https://api.dotlike.site/auth/login', {
    // return await axios.post(
    //   `https://api.blog.shoppingcamps.com/authentications`,
    // {
    email,
    password,
  });
}

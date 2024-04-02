import axios from 'axios';

const baseURL = 'https://api.dotlike.site';

export async function login(body:any) {
  console.log('body',body)
  return await axios.post(`${baseURL}/auth/login`, body, {
    headers:{
      Accept:"*/*",
      'Content-Type': 'application/json'
    }
  });
}

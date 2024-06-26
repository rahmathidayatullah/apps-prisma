import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseURL} from './config';

export async function postFormFlpp(
  idBooking: string,
  body: {
    maritalStatusId: number;
    householdRole: string;
    monthlyIncome: string;
    profession: string;
    birthplace: string;
    dob: string;
  },
) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.post(
    `${baseURL}/booking/flpp/generate/${idBooking}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${newUserData.access_token}`,
      },
    },
  );
}

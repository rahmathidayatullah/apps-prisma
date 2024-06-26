import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseURL} from './config';

export async function getBookingMine(params: any) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/booking/mine`, {
    params,
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function getDetailBooking(id: string) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.get(`${baseURL}/booking/${id}`, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}

export async function postBooking(body: {
  name: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  identityNumber: string;
  unitId: number;
}) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.post(`${baseURL}/booking`, body, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}
export async function patchBooking(
  bookingId: string,
  body: {
    name: string;
    address: string;
    phone: string;
    emergencyPhone: string;
    identityNumber: string;
    unitId: number;
  },
) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.patch(`${baseURL}/booking/${bookingId}`, body, {
    headers: {
      Authorization: `Bearer ${newUserData.access_token}`,
    },
  });
}
export async function postBookingUploadBerkas(
  idBooking: string,
  body: any,
  // body: {
  //   slipGaji: string;
  //   KTP: string;
  //   SKKerja: string;
  //   rekeningKoran: string;
  //   bukuNikah: string;
  //   NPWP: string;
  //   BPJS: string;
  //   BPJSTK: string;
  //   KK: string;
  //   SKDomisili: string;
  //   SPT: string;
  //   formAplikasi: string;
  //   formWawancara: string;
  //   FLPP: string;
  //   SIKasep: string;
  //   bestTimeToCall: string;
  //   slipGajiPasangan: string;
  //   KTPPasangan: string;
  // },
) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.post(
    `${baseURL}/booking/upload-berkas/${idBooking}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${newUserData.access_token}`,
      },
    },
  );
}

export async function postBerkasReview(bookingId: string) {
  const userData: any = await AsyncStorage.getItem('userData');
  let newUserData = null;

  if (typeof userData === 'string') {
    newUserData = JSON.parse(userData);
  }

  return await axios.post(
    `${baseURL}/booking/berkas/review/${bookingId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${newUserData.access_token}`,
      },
    },
  );
}

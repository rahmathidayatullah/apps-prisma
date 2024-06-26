import {Alert} from 'react-native';

import {
  START_GENERATE_FLPP,
  SUCCESS_GENERATE_FLPP,
  ERROR_GENERATE_FLPP,
} from './constants';

import {SUCCESS_LOGOUT} from '../auth/constants';

import {postFormFlpp} from '../../../api/generate';

export const createGenerateFlpp = (
  idBooking: string,
  body: {
    maritalStatusId: number;
    householdRole: string;
    monthlyIncome: string;
    profession: string;
    birthplace: string;
    dob: string;
  },
) => {
  return async (dispatch: any) => {
    dispatch({
      type: START_GENERATE_FLPP,
    });
    console.log('start createGenerateFlpp');

    try {
      const {
        data: {data},
      } = await postFormFlpp(idBooking, body);
      console.log('success createGenerateFlpp', data);

      dispatch({
        type: SUCCESS_GENERATE_FLPP,
        data,
      });
    } catch (error: any) {
      console.log('error createGenerateFlpp', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_GENERATE_FLPP,
          data: error,
        });
      }
    }
  };
};

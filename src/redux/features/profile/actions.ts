import {getProfile, patchProfile} from '../../../api/user';
import {
  START_FETCH_PROFILE,
  ERROR_FETCH_PROFILE,
  SUCCESS_FETCH_PROFILE,
  START_UPDATE_PROFILE,
  ERROR_UPDATE_PROFILE,
  SUCCESS_UPDATE_PROFILE,
  RESET_FORM_PROFILE,
} from './constants';
import {SUCCESS_LOGOUT} from '../auth/constants';
import {Alert} from 'react-native';

export const fetchProfile = () => {
  return async (dispatch: any) => {
    dispatch({
      type: START_FETCH_PROFILE,
    });
    try {
      const res: any = await getProfile();
      console.log('success fetch redux profile', res);
      let newData: any;
      if (res.data.data) {
        newData = res.data.data;
      } else {
        newData = {
          overtime: {
            clockIn: null,
            clockOut: null,
            id: null,
          },
          clockIn: null,
          clockOut: null,
          workStatus: null,
          user: {
            name: null,
            role: {
              name: null,
            },
            email: null,
            phoneNumber: null,
            emergencyContact: null,
            address: null,
            // gender:  null,
            npwp: null,
            no_nrp: null,
            nik: null,
            photo: undefined,
          },
        };
      }
      dispatch({
        type: SUCCESS_FETCH_PROFILE,
        profile: newData,
      });
    } catch (error: any) {
      console.log('error fetch redux profile', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({type: ERROR_FETCH_PROFILE});
      }
    }
  };
};

export const updateProfile = (body: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch({type: START_UPDATE_PROFILE});

    const dataBody = {
      name: body.name,
      email: body.email,
      password: body.password,
      phoneNumber: body.phoneNumber,
      emergencyContact: body.emergencyContact,
      address: body.address,
      photo: body.photo
        ? `data:${body.photo.mime};base64,${body.photo.data}`
        : null,
    };
    console.log('body update profile', body);
    try {
      const {
        data: {data},
      } = await patchProfile(dataBody);
      console.log('success put updateProfile', data);
      dispatch({type: SUCCESS_UPDATE_PROFILE});
    } catch (error) {
      console.log('error put updateProfile', error);
      dispatch({type: ERROR_UPDATE_PROFILE});
    }
  };
};

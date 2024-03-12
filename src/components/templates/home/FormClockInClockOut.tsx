import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import CInputTextWithIconLabelImage from '../../atoms/input/TextWithIconLabelImage';
import IconFeather from 'react-native-vector-icons/Feather';
import IconsIon from 'react-native-vector-icons/Ionicons';
import CButton from '../../atoms/button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {submitClockIn} from '../../../redux/features/home/actions';
import ImagePicker from 'react-native-image-crop-picker';
import CInputTextWithIconLabel from '../../atoms/input/TextWithIconLabel';
import Geolocation from '@react-native-community/geolocation';
import {stateGlobalHome} from '../../../redux/features/home/interface';
import {RESET_STATE_CLOCK_IN} from '../../../redux/features/home/constants';

interface typeFormClockInClockOut {
  clockIn?: boolean;
  clockOut?: boolean;
  bottomSheetModalRef?: any;
}
const FormClockInClockOut = ({
  clockIn,
  bottomSheetModalRef,
}: typeFormClockInClockOut) => {
  const dispatch: any = useDispatch();
  const {statusClockIn} = useSelector((state: stateGlobalHome) => state.home);
  const [imageSelfie, setImageSelfie] = useState(null);

  const [placeholderImageSelfie, setPlaceholderImageSelfie] = useState(
    'Klik untuk foto selfie',
  );
  const [latLong, setLatLong] = useState('Loading lokasi ..');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');

  const onPressInputCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: true,
    }).then((image: any) => {
      setImageSelfie(image);
      setPlaceholderImageSelfie('foto.jpg');
    });
  };
  const handleSubmitClockInClockOut = () => {
    const payload = {
      imageSelfie,
      description,
      longitude,
      latitude,
    };
    if (clockIn) {
      dispatch(submitClockIn(payload, true));
    } else {
      dispatch(submitClockIn(payload, false));
    }
  };
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos: any) => {
        const {latitude, longitude} = pos.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setLatLong(`${latitude}, ${longitude}`);
      },
      (error: any) =>
        Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    getCurrentPosition();
    if (statusClockIn === 'error') {
      Alert.alert('Error', 'Something when wrong');
    }
    if (statusClockIn === 'success') {
      Alert.alert('Berhasil', 'Berhasil absen masuk');
      bottomSheetModalRef.current.dismiss();
      dispatch({
        type: RESET_STATE_CLOCK_IN,
      });
    }
    return () => {
      resetState();
    };
  }, [statusClockIn]);

  const resetState = () => {
    setPlaceholderImageSelfie('Klik untuk foto selfie');
    setLatLong('Loading lokasi ..');
    setLatitude('');
    setLongitude('');
    setDescription('');
    dispatch({
      type: RESET_STATE_CLOCK_IN,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      }}>
      <ScrollView style={{paddingBottom: 10}}>
        <Text style={styles.titleForm}>{`${
          clockIn ? 'Absen Masuk' : 'Absen Keluar'
        }`}</Text>
        <View style={styles.containerForm}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CInputTextWithIconLabelImage
              placeholder="Ambil foto"
              label="Foto Selfie"
              right
              value={placeholderImageSelfie}
              icon={
                <IconFeather
                  style={styles.iconInput}
                  name="camera"
                  size={22}
                  color="#B8B8B8"
                />
              }
              onPressInputContainer={onPressInputCamera}
              onPressInInput={onPressInputCamera}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CInputTextWithIconLabel
              placeholder="Loading lokasi .."
              label="Lokasi"
              right
              value={latLong}
              icon={
                <IconsIon
                  style={styles.iconInput}
                  name="location-outline"
                  size={22}
                  color="#B8B8B8"
                />
              }
              editable={false}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CInputTextWithIconLabel
              placeholder="Masukkan deskripsi"
              label="Deskripsi"
              right
              value={description}
              onChangeText={(nextText: string) => setDescription(nextText)}
            />
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CButton onPress={handleSubmitClockInClockOut}>
              {statusClockIn === 'idle' && 'Absen'}
              {statusClockIn === 'process' && 'Loading ...'}
              {statusClockIn === 'success' && 'Berhasil'}
            </CButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    marginTop: 20,
  },
  iconInput: {
    position: 'absolute',
    left: 15,
    top: '33%',
  },
  titleForm: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 30,
  },
  propsStylePadding: {
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 3,
    marginBottom: 15,
    backgroundColor: '#075985',
  },
});

export default FormClockInClockOut;

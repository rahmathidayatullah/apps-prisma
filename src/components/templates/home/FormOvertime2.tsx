import React, {useEffect, useState} from 'react';
import {Alert, Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import CInputTextWithIconLabelImage from '../../atoms/input/TextWithIconLabelImage';
import IconFeather from 'react-native-vector-icons/Feather';
import IconsIon from 'react-native-vector-icons/Ionicons';
import CButton from '../../atoms/button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  submitClockIn,
  submitOvertimeClockInOut,
} from '../../../redux/features/home/actions';
import ImagePicker from 'react-native-image-crop-picker';
import CInputTextWithIconLabel from '../../atoms/input/TextWithIconLabel';
import Geolocation from '@react-native-community/geolocation';
import {stateGlobalHome} from '../../../redux/features/home/interface';
import {stateGlobalProfile} from '../../../redux/features/profile/interface';

interface typeFormClockInClockOut {
  clockIn?: boolean;
  clockOut?: boolean;
  bottomSheetModalRef?: any;
}
const FormOvertime2 = ({clockIn}: typeFormClockInClockOut) => {
  const dispatch: any = useDispatch();
  const {statusSubmitOvertime} = useSelector(
    (state: stateGlobalHome) => state.home,
  );
  const profile = useSelector((state: stateGlobalProfile) => state.profile);
  const [imageSelfie, setImageSelfie] = useState(null);

  const [placeholderImageSelfie, setPlaceholderImageSelfie] = useState(
    'Klik untuk foto selfie',
  );
  const [latLong, setLatLong] = useState<any>(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const onPressInputCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
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

    if (!latitude || !longitude || !imageSelfie) {
      Alert.alert('Pastikan foto selfie dan lokasi terisi');
      return;
    }

    if (
      profile.profile.overtime.clockIn === null &&
      profile.profile.overtime.clockOut === null
    ) {
      dispatch(
        submitOvertimeClockInOut(payload, true, profile.profile.overtime.id),
      );
    } else {
      dispatch(
        submitOvertimeClockInOut(payload, false, profile.profile.overtime.id),
      );
    }
  };

  // const handleErrorGetLocation = (error: any) => {
  //   getCurrentPosition();
  //   return Alert.alert(
  //     'Gagal mengambil lokasi, silahkan tunggu sampai lokasi ditemukan',
  //     JSON.stringify(error),
  //   );
  // };
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos: any) => {
        const {latitude, longitude} = pos.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setLatLong(`${latitude}, ${longitude}`);
      },
      (error: any) => setError(error.message),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 60000,
      },
    );
  };

  useEffect(() => {
    getCurrentPosition();
    return () => {
      resetState();
      Geolocation.stopObserving();
    };
  }, []);

  const resetState = () => {
    setPlaceholderImageSelfie('Klik untuk foto selfie');
    setLatLong(null);
    setLatitude('');
    setLongitude('');
    setDescription('');
    setError(null);
  };

  const retryGeolocation = () => {
    setLatLong(null);
    setLatitude('');
    setError(null);
    getCurrentPosition();
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      }}>
      <ScrollView style={{paddingBottom: 10}}>
        <Text style={styles.titleForm}>Form Lembur</Text>
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
            {latLong ? (
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
            ) : error ? (
              <View>
                <Text>Terjadi Kesalahan : {error}</Text>
                <Button title="Dapatkan Lokasi" onPress={retryGeolocation} />
              </View>
            ) : (
              <Text style={{paddingVertical: 20}}>Mencari lokasi...</Text>
            )}
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
            <CButton
              disabled={statusSubmitOvertime === 'process'}
              onPress={handleSubmitClockInClockOut}>
              {statusSubmitOvertime === 'idle' && 'Absen Lembur'}
              {statusSubmitOvertime === 'error' && 'Absen Lembur'}
              {statusSubmitOvertime === 'success' && 'Absen Lembur'}
              {statusSubmitOvertime === 'process' && 'Loading ...'}
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

export default FormOvertime2;

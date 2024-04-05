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
import CSelectOption from '../../atoms/select/SelectOption';

interface typeFormClockInClockOut {
  clockIn?: boolean;
  clockOut?: boolean;
  bottomSheetModalRef?: any;
  dataShift?: any;
  isFlexible?: boolean;
}
const FormClockInClockOut = ({
  clockIn,
  dataShift,
  isFlexible,
}: typeFormClockInClockOut) => {
  console.log('dataShift', dataShift);
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

  //
  const [selectShift, setSelectShift] = useState<any>(null);

  const onChangeShift = (shift: any) => {
    setSelectShift(shift.value);
  };

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
    const payload2 = {
      imageSelfie,
      description,
      longitude,
      latitude,
      selectShift,
    };

    if (!latitude || !longitude || !imageSelfie) {
      Alert.alert('Pastikan foto selfie dan lokasi terisi');
      return;
    }

    if (isFlexible && !selectShift && clockIn) {
      Alert.alert('Pastikan shift terisi');
      return;
    }

    if (clockIn) {
      // Alert.alert(
      //   'jika isFlexsible true dari user profile.role maka kirim shift',
      // );
      if (isFlexible && selectShift) {
        dispatch(submitClockIn(payload2, true, true));
      } else {
        dispatch(submitClockIn(payload, true, false));
      }
    } else {
      // Alert.alert(
      //   'jika isFlexsible true dari user profile.role maka kirim shift',
      // );
      dispatch(submitClockIn(payload, false, false));
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
      (error: any) => Alert.alert('Pastikan deteksi lokasi di aktifkan'),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    getCurrentPosition();
    return () => {
      resetState();
    };
  }, []);

  const resetState = () => {
    setPlaceholderImageSelfie('Klik untuk foto selfie');
    setLatLong('Loading lokasi ..');
    setLatitude('');
    setLongitude('');
    setDescription('');
    setSelectShift(null);
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
          {isFlexible && clockIn ? (
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                paddingHorizontal: 30,
              }}>
              <CSelectOption
                label="Shift"
                placeholder="Pilih Shift"
                onChange={onChangeShift}
                value={selectShift}
                dataOption={dataShift}
              />
            </View>
          ) : (
            ''
          )}
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
            <CButton
              disabled={statusClockIn === 'process'}
              onPress={handleSubmitClockInClockOut}>
              {statusClockIn === 'idle' && 'Absen'}
              {statusClockIn === 'error' && 'Absen'}
              {statusClockIn === 'success' && 'Absen'}
              {statusClockIn === 'process' && 'Loading ...'}
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

import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CInputTextWithIconLabelImage from '../../atoms/input/TextWithIconLabelImage';
import IconFeather from 'react-native-vector-icons/Feather';
import IconsIon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {routeMenu} from '../../../contants/routes';
import CButton from '../../atoms/button/Button';
import {useDispatch} from 'react-redux';
import {
  submitClockIn,
  submitClockOut,
} from '../../../redux/features/home/actions';

interface typeFormClockInClockOut {
  clockIn?: boolean;
  clockOut?: boolean;
  bottomSheetModalRef?: any;
}
const FormClockInClockOut = ({
  clockIn,
  clockOut,
  bottomSheetModalRef,
}: typeFormClockInClockOut) => {
  const dispatch = useDispatch();
  const [state, setState] = useState('');
  const [reason, setReason] = useState('');
  const navigate: any = useNavigation();

  const onPressInputCamera = () => {
    navigate.navigate(routeMenu.TAKE_SEFIE);
  };
  const onPressInputLocation = () => {
    navigate.navigate(routeMenu.VIEW_CURRENT_LOCATION);
  };

  const handleSubmitClockInClockOut = () => {
    if (clockIn) {
      dispatch(submitClockIn());
      bottomSheetModalRef.current.dismiss();
    } else {
      dispatch(submitClockOut());
      bottomSheetModalRef.current.dismiss();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      }}>
      <ScrollView style={{paddingBottom: 10}}>
        <Text style={styles.titleForm}>Clock In</Text>
        <View style={styles.containerForm}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CInputTextWithIconLabelImage
              placeholder="Input alasan"
              label="Foto Selfie"
              right
              value={reason}
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
            <CInputTextWithIconLabelImage
              placeholder="Input alasan"
              label="View Current Location"
              right
              value={reason}
              icon={
                <IconsIon
                  style={styles.iconInput}
                  name="location-outline"
                  size={22}
                  color="#B8B8B8"
                />
              }
              onPressInputContainer={onPressInputLocation}
              onPressInInput={onPressInputLocation}
            />
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CButton onPress={handleSubmitClockInClockOut}>Submit</CButton>
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

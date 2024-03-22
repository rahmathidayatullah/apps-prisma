import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import CButton from '../../atoms/button/Button';
import {useNavigation} from '@react-navigation/native';
import {routeMenu} from '../../../contants/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  confirmIOSEndDatePermission,
  confirmIOSStartDatePermission,
  onChangePickerEndDatePermission,
  onChangePickerStartDatePermission,
  onChangeTextPermission,
  resetValueBottomSheet,
  tooglePickerEndDatePermission,
  tooglePickerStartDatePermission,
} from '../../../redux/features/home/actions';
import {ScrollView} from 'react-native-gesture-handler';
import TextWithLabelIconDate from '../../atoms/input/TextWithLabelIconDate';
import {stateGlobalHome} from '../../../redux/features/home/interface';
import CInputTextWithIconLabel from '../../atoms/input/TextWithIconLabel';

const FormPermission = ({bottomSheetModalRef}: any) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const {
    showPickerEndDatePermission,
    valueEndDatePermission,
    valueDefaultEndDatePermission,
    showPickerStartDatePermission,
    valueStartDatePermission,
    valueDefaultStartDatePermission,
    reason,
  } = useSelector((state: stateGlobalHome) => state.home);

  const handleSubmitPermission = () => {
    // dispatch(resetValueBottomSheet());
    // bottomSheetModalRef.current?.dismiss();
    // navigation.navigate(routeMenu.PROFILE);
  };
  const handleOnChangePickerEndDate = (
    event: {type: string},
    selectedDate: string,
  ) => {
    dispatch(
      onChangePickerEndDatePermission(event.type, Platform, selectedDate),
    );
  };
  const handleOnChangePickerStartDate = (
    event: {type: string},
    selectedDate: string,
  ) => {
    dispatch(
      onChangePickerStartDatePermission(event.type, Platform, selectedDate),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      }}>
      <ScrollView style={{paddingBottom: 10}}>
        <Text style={styles.titleForm}>Izin</Text>
        <View style={styles.containerForm}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <TextWithLabelIconDate
              valueDefaultDate={valueDefaultStartDatePermission}
              valueDate={valueStartDatePermission}
              isShowPicker={showPickerStartDatePermission}
              onPressCancelIOS={() =>
                dispatch(tooglePickerStartDatePermission(false))
              }
              onConfirmIOSDate={() => dispatch(confirmIOSStartDatePermission())}
              onPressInInput={() =>
                dispatch(tooglePickerStartDatePermission(true))
              }
              isRight
              onPressInputContainer={() =>
                dispatch(tooglePickerStartDatePermission(true))
              }
              onChangeDatePicker={handleOnChangePickerStartDate}
              placeholder="Input start date"
              label="Start Date"
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <TextWithLabelIconDate
              valueDefaultDate={valueDefaultEndDatePermission}
              valueDate={valueEndDatePermission}
              isShowPicker={showPickerEndDatePermission}
              onPressCancelIOS={() =>
                dispatch(tooglePickerEndDatePermission(false))
              }
              onConfirmIOSDate={() => dispatch(confirmIOSEndDatePermission())}
              onPressInInput={() =>
                dispatch(tooglePickerEndDatePermission(true))
              }
              isRight
              onPressInputContainer={() =>
                dispatch(tooglePickerEndDatePermission(true))
              }
              onChangeDatePicker={handleOnChangePickerEndDate}
              placeholder="Input end date"
              label="End Date"
            />
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CInputTextWithIconLabel
              placeholder="Input alasan"
              label="Alasan"
              right
              value={reason}
              onChangeText={(newText: string) =>
                dispatch(onChangeTextPermission(newText))
              }
            />
          </View>

          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CButton onPress={handleSubmitPermission}>Submit</CButton>
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

export default FormPermission;

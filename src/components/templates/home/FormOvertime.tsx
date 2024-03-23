import React from 'react';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import CButton from '../../atoms/button/Button';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeFile1Overtime,
  confirmIOSEndDateOvertime,
  confirmIOSEndTimeOvertime,
  confirmIOSStartDateOvertime,
  confirmIOSStartTimeOvertime,
  onChangeDescriptionOvertime,
  onChangeEndTimeOvertime,
  onChangePickerEndDateOvertime,
  onChangePickerStartDateOvertime,
  onChangeStartTimeOvertime,
  resetValueBottomSheet,
  submitOvertime,
  tooglePickerEndDateOvertime,
  tooglePickerStartDateOvertime,
} from '../../../redux/features/home/actions';
import {ScrollView} from 'react-native-gesture-handler';
import TextWithLabelIconDate from '../../atoms/input/TextWithLabelIconDate';
import {stateGlobalHome} from '../../../redux/features/home/interface';
import CInputTextWithIconLabel from '../../atoms/input/TextWithIconLabel';
import TextWithLabelIconDateTime from '../../atoms/input/TextWithLabelIconDateTime';
import CInputTextWithIconLabelFile from '../../atoms/input/TextWithIconLabelFile';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  REMOVE_FILE1_OVERTIME,
  RESET_STATE_OVERTIME,
} from '../../../redux/features/home/constants';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

const FormOvertime = ({bottomSheetModalRef}: any) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const {
    valueDefaultEndDateOvertime,
    valueEndDateOvertime,
    valueDefaultEndTimeOvertime,
    valueEndTimeOvertime,
    showPickerEndDateOvertime,
    showPickerEndTimeOvertime,

    valueDefaultStartDateOvertime,
    valueStartDateOvertime,
    valueDefaultStartTimeOvertime,
    valueStartTimeOvertime,
    showPickerStartDateOvertime,
    showPickerStartTimeOvertime,
    descriptionOvertime,

    file1Overtime,
    statusSubmitOvertime,
  } = useSelector((state: stateGlobalHome) => state.home);

  const handleSubmitOvertime = () => {
    if (valueEndDateOvertime === '' || valueStartDateOvertime === '') {
      Alert.alert('Tanngal mulai dan tanggal berakhir harus diisi');
    } else {
      const payload = {
        valueEndDateOvertime,
        valueStartDateOvertime,
        descriptionOvertime,
        file1Overtime,
      };
      dispatch(submitOvertime(payload));
    }
  };
  const handleOnChangePickerEndDate = (event: any, selectedDate: string) => {
    dispatch(onChangePickerEndDateOvertime(event.type, Platform, selectedDate));
  };
  const handleOnChangePickerStartDate = (
    event: {type: string},
    selectedDate: string,
  ) => {
    dispatch(
      onChangePickerStartDateOvertime(event.type, Platform, selectedDate),
    );
  };

  const handleOnChangeEndTime = (event: any, selectedTime: any) => {
    const currentTime = selectedTime;
    dispatch(onChangeEndTimeOvertime(currentTime, Platform));
  };
  const handleOnChangePickerStartTime = (event: any, selectedTime: any) => {
    const currentTime = selectedTime;
    dispatch(onChangeStartTimeOvertime(currentTime, Platform));
  };

  const onPressUpload1 = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      useFrontCamera: true,
    }).then((image: any) => {
      dispatch(changeFile1Overtime(image));
    });
    // .catch(() => {
    //   Alert.alert('Permission', 'Batal akses kamera');
    // });
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
          {/* input start date */}
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <TextWithLabelIconDate
              valueDefaultDate={valueDefaultStartDateOvertime}
              valueDate={valueStartDateOvertime}
              isShowPicker={showPickerStartDateOvertime}
              onPressCancelIOS={() =>
                dispatch(tooglePickerStartDateOvertime(false))
              }
              onConfirmIOSDate={() => dispatch(confirmIOSStartDateOvertime())}
              onPressInInput={() =>
                dispatch(tooglePickerStartDateOvertime(true))
              }
              isRight
              onPressInputContainer={() =>
                dispatch(tooglePickerStartDateOvertime(true))
              }
              onChangeDatePicker={handleOnChangePickerStartDate}
              placeholder="Masukkan tanggal mulai"
              label="Tanggal mulai"
            />
          </View>

          {/* input start time */}
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <TextWithLabelIconDateTime
              valueDefaultDate={valueDefaultStartTimeOvertime}
              isShowPicker={
                Boolean(valueStartDateOvertime) &&
                !Boolean(valueStartTimeOvertime)
              }
              onPressCancelIOS={() =>
                dispatch(tooglePickerStartDateOvertime(false))
              }
              onConfirmIOSDate={() => dispatch(confirmIOSStartTimeOvertime())}
              onChangeDatePicker={handleOnChangePickerStartTime}
            />
          </View>

          {/* input end date */}
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <TextWithLabelIconDate
              valueDefaultDate={valueDefaultEndDateOvertime}
              valueDate={valueEndDateOvertime}
              isShowPicker={showPickerEndDateOvertime}
              onPressCancelIOS={() =>
                dispatch(tooglePickerEndDateOvertime(false))
              }
              onConfirmIOSDate={() => dispatch(confirmIOSEndDateOvertime())}
              onPressInInput={() => dispatch(tooglePickerEndDateOvertime(true))}
              isRight
              onPressInputContainer={() =>
                dispatch(tooglePickerEndDateOvertime(true))
              }
              onChangeDatePicker={handleOnChangePickerEndDate}
              placeholder="Masukkan tanggal mulai"
              label="Tanggal selesai"
            />
          </View>

          {/* input end time */}
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <TextWithLabelIconDateTime
              valueDefaultDate={valueDefaultEndTimeOvertime}
              isShowPicker={
                Boolean(valueEndDateOvertime) && !Boolean(valueEndTimeOvertime)
              }
              onPressCancelIOS={() =>
                dispatch(tooglePickerEndDateOvertime(false))
              }
              onConfirmIOSDate={() => dispatch(confirmIOSEndTimeOvertime())}
              onChangeDatePicker={handleOnChangeEndTime}
            />
          </View>

          {/* upload file 1 */}

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CInputTextWithIconLabelFile
              placeholder="Upload foto selfie"
              label="Upload foto sefile"
              right
              value={file1Overtime ? 'file1.png' : ''}
              onPressInputContainer={onPressUpload1}
              onPressIcon={() => dispatch({type: REMOVE_FILE1_OVERTIME})}
              icon={
                file1Overtime ? (
                  <IconAntDesign
                    style={styles.iconInput}
                    name="closecircleo"
                    size={19}
                    color="#B8B8B8"
                  />
                ) : (
                  <IconFeather
                    style={styles.iconInput}
                    name="camera"
                    size={19}
                    color="#B8B8B8"
                  />
                )
              }
            />
          </View>

          {/* description */}
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
              value={descriptionOvertime}
              onChangeText={(newText: string) =>
                dispatch(onChangeDescriptionOvertime(newText))
              }
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
              onPress={handleSubmitOvertime}>
              {statusSubmitOvertime === 'idle' && 'Absen'}
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

export default FormOvertime;

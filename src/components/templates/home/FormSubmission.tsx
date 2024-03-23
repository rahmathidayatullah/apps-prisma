import React, {useEffect} from 'react';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import CButton from '../../atoms/button/Button';
import {useNavigation} from '@react-navigation/native';
import {typeItemCategorySubmission} from '../../../contants/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeFile1Submission,
  changeFile2Submission,
  confirmIOSEndDateSubmission,
  confirmIOSStartDateSubmission,
  onChangeDescriptionSubmission,
  onChangePickerEndDateSubmission,
  onChangePickerStartDateSubmission,
  submitSubmission,
  tooglePickerEndDateSubmission,
  tooglePickerStartDateSubmission,
  changeCategorySubmission,
} from '../../../redux/features/home/actions';
import {ScrollView} from 'react-native-gesture-handler';
import TextWithLabelIconDate from '../../atoms/input/TextWithLabelIconDate';
import {stateGlobalHome} from '../../../redux/features/home/interface';
import CInputTextWithIconLabel from '../../atoms/input/TextWithIconLabel';
import CSelectOption from '../../atoms/select/SelectOption';
import CInputTextWithIconLabelFile from '../../atoms/input/TextWithIconLabelFile';
import IconEntypo from 'react-native-vector-icons/Entypo';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  REMOVE_FILE1_SUBMISSION,
  REMOVE_FILE2_SUBMISSION,
} from '../../../redux/features/home/constants';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {stateGlobalSubmissions} from '../../../redux/features/submissions/interface';
// import {getListCategorySubmission} from '../../../redux/features/submissions/actions';

const FormSubmission = ({bottomSheetModalRef}: any) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const {
    valueDefaultEndDateSubmission,
    valueEndDateSubmission,
    showPickerEndDateSubmission,

    valueDefaultStartDateSubmission,
    valueStartDateSubmission,
    showPickerStartDateSubmission,

    selectCategorySubmission,

    descriptionSubmission,

    file1Submission,
    file2Submission,

    statusSubmitSubmission,
  } = useSelector((state: stateGlobalHome) => state.home);

  // const submissions = useSelector(
  //   (state: stateGlobalSubmissions) => state.submissions,
  // );
  // const {listCategorySubmission} = submissions;

  const handleSubmitSubmission = () => {
    if (
      valueEndDateSubmission === '' ||
      valueStartDateSubmission === '' ||
      selectCategorySubmission === ''
    ) {
      Alert.alert('Tanngal mulai, tanggal selesai, dan kategory harus di isi');
    } else {
      const payload = {
        valueEndDateSubmission,
        valueStartDateSubmission,
        descriptionSubmission,
        selectCategorySubmission,
        file1Submission,
        file2Submission,
      };
      dispatch(submitSubmission(payload));
    }
  };
  const handleOnChangePickerEndDate = (event: any, selectedDate: string) => {
    dispatch(
      onChangePickerEndDateSubmission(event.type, Platform, selectedDate),
    );
  };
  const handleOnChangePickerStartDate = (
    event: {type: string},
    selectedDate: string,
  ) => {
    dispatch(
      onChangePickerStartDateSubmission(event.type, Platform, selectedDate),
    );
  };

  const onChanceCategory = (category: typeItemCategorySubmission) => {
    dispatch(changeCategorySubmission(category.value));
  };

  const onPressUpload1 = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image: any) => {
      dispatch(changeFile1Submission(image));
    });
    // .catch(() => {
    //   Alert.alert('Permission', 'Cannot file manager');
    // });
  };
  const onPressUpload2 = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image: any) => {
      dispatch(changeFile2Submission(image));
    });
    // .catch(() => {
    //   Alert.alert('Permission', 'Cannot file manager');
    // });
  };

  // useEffect(() => {
  //   // dispatch(getListCategorySubmission());
  //   return () => {
  //     resetState();
  //   };
  // }, []);

  // const resetState = () => {
  //   dispatch(resetValueBottomSheet());
  //   dispatch({
  //     type: RESET_STATE_SUBMISSION,
  //   });
  // };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      }}>
      <ScrollView style={{paddingBottom: 10}}>
        <Text style={styles.titleForm}>Form Pengajuan</Text>
        <View style={styles.containerForm}>
          {/* category */}

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CSelectOption
              label="Kategori"
              placeholder="Pilih kategori"
              onChange={onChanceCategory}
              value={selectCategorySubmission}
            />
          </View>
          {/* input start date */}
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <TextWithLabelIconDate
              valueDefaultDate={valueDefaultStartDateSubmission}
              valueDate={valueStartDateSubmission}
              isShowPicker={showPickerStartDateSubmission}
              onPressCancelIOS={() =>
                dispatch(tooglePickerStartDateSubmission(false))
              }
              onConfirmIOSDate={() => dispatch(confirmIOSStartDateSubmission())}
              onPressInInput={() =>
                dispatch(tooglePickerStartDateSubmission(true))
              }
              isRight
              onPressInputContainer={() =>
                dispatch(tooglePickerStartDateSubmission(true))
              }
              onChangeDatePicker={handleOnChangePickerStartDate}
              placeholder="Masukkan tanggal mulai"
              label="Tanggal mulai"
            />
          </View>

          {/* input start time */}
          {/* <View
            style={{
              // marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <TextWithLabelIconDateTime
              valueDefaultDate={valueDefaultStartTimeSubmission}
              valueDate={valueStartTimeSubmission}
              isShowPicker={
                Boolean(valueStartDateSubmission) &&
                !Boolean(valueStartTimeSubmission)
              }
              onPressCancelIOS={() =>
                dispatch(tooglePickerStartDateSubmission(false))
              }
              onConfirmIOSDate={() => dispatch(confirmIOSStartDateSubmission())}
              onPressInInput={() =>
                dispatch(tooglePickerStartDateSubmission(true))
              }
              isRight
              onPressInputContainer={() =>
                dispatch(tooglePickerStartDateSubmission(true))
              }
              onChangeDatePicker={handleOnChangePickerStartTime}
              placeholder="Masukkan time mulai"
              label="Time mulai"
            />
          </View> */}

          {/* input end date */}
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <TextWithLabelIconDate
              valueDefaultDate={valueDefaultEndDateSubmission}
              valueDate={valueEndDateSubmission}
              isShowPicker={showPickerEndDateSubmission}
              onPressCancelIOS={() =>
                dispatch(tooglePickerEndDateSubmission(false))
              }
              onConfirmIOSDate={() => dispatch(confirmIOSEndDateSubmission())}
              onPressInInput={() =>
                dispatch(tooglePickerEndDateSubmission(true))
              }
              isRight
              onPressInputContainer={() =>
                dispatch(tooglePickerEndDateSubmission(true))
              }
              onChangeDatePicker={handleOnChangePickerEndDate}
              placeholder="Masukkan tanggal mulai"
              label="Tanggal selesai"
            />
          </View>

          {/* input end time */}
          {/* <View
            style={{
              // marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <TextWithLabelIconDateTime
              valueDefaultDate={valueDefaultEndTimeSubmission}
              valueDate={valueEndTimeSubmission}
              isShowPicker={
                Boolean(valueEndDateSubmission) &&
                !Boolean(valueEndTimeSubmission)
              }
              onPressCancelIOS={() =>
                dispatch(tooglePickerEndDateSubmission(false))
              }
              onConfirmIOSDate={() => dispatch(confirmIOSEndDateSubmission())}
              onPressInInput={() =>
                dispatch(tooglePickerEndDateSubmission(true))
              }
              isRight
              onPressInputContainer={() =>
                dispatch(tooglePickerEndDateSubmission(true))
              }
              onChangeDatePicker={handleOnChangeEndTime}
              placeholder="Masukkan time selesai"
              label="Time selesai"
            />
          </View> */}

          {/* upload file 1 */}

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CInputTextWithIconLabelFile
              placeholder="Upload file pendukung 1"
              // label="Upload file"
              label={`${
                selectCategorySubmission === '1'
                  ? 'Upload form Cuti'
                  : selectCategorySubmission === '2'
                  ? 'Upload foto berobat'
                  : 'Upload file pendukung (optional)'
              }`}
              // label2="( foto bukti : form cuti,surat sakit dll )"
              right
              value={file1Submission ? 'file1.png' : ''}
              onPressInputContainer={onPressUpload1}
              onPressIcon={() => dispatch({type: REMOVE_FILE1_SUBMISSION})}
              icon={
                file1Submission ? (
                  <IconAntDesign
                    style={styles.iconInput}
                    name="closecircleo"
                    size={19}
                    color="#B8B8B8"
                  />
                ) : (
                  <IconEntypo
                    style={styles.iconInput}
                    name="attachment"
                    size={19}
                    color="#B8B8B8"
                  />
                )
              }
            />
          </View>

          {/* upload file 2 */}

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CInputTextWithIconLabelFile
              placeholder="Upload file pendukung 2"
              // label="Upload file 2"

              label={`${
                selectCategorySubmission === '2'
                  ? 'Upload surat keterangan dokter'
                  : 'Upload file pendukung (optional)'
              }`}
              right
              value={file2Submission ? 'file2.png' : ''}
              onPressInputContainer={onPressUpload2}
              onPressIcon={() => dispatch({type: REMOVE_FILE2_SUBMISSION})}
              icon={
                file2Submission ? (
                  <IconAntDesign
                    style={styles.iconInput}
                    name="closecircleo"
                    size={19}
                    color="#B8B8B8"
                  />
                ) : (
                  <IconEntypo
                    style={styles.iconInput}
                    name="attachment"
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
              value={descriptionSubmission}
              onChangeText={(newText: string) =>
                dispatch(onChangeDescriptionSubmission(newText))
              }
            />
          </View>

          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <CButton onPress={handleSubmitSubmission}>
              {statusSubmitSubmission === 'idle' && 'Kirim'}
              {statusSubmitSubmission === 'error' && 'Kirim'}
              {statusSubmitSubmission === 'success' && 'Kirim'}
              {statusSubmitSubmission === 'process' && 'Loading ...'}
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

export default FormSubmission;

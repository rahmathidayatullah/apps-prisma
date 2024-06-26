import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CInputTextWithIconLabel from '../../../components/atoms/input/TextWithIconLabel';
import {COLORS} from '../../../contants';
import TextWithLabelIconDate from '../../../components/atoms/input/TextWithLabelIconDate';
import moment from 'moment';
import CButton from '../../../components/atoms/button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {createGenerateFlpp} from '../../../redux/features/generate/actions';
import {
  RESET_GENERATE_FLPP,
  RESET_STATUS_GENERATE_FLPP,
} from '../../../redux/features/generate/constants';
import {NotifError} from '../../../utils/errorMessage';
import LoadingScreen from '../../../components/molecules/LoadingScreen';
import {downloadFile, getDownloadPermissionAndroid} from '../../../utils';
import RNFetchBlob from 'rn-fetch-blob';

const GenerateFlpp = ({route}: any) => {
  const {bookingId} = route.params;
  const generate = useSelector((state: any) => state.generate);
  const {generateFlpp, statusGenerateFlpp, errorGenerateFlpp} = generate;
  const dispatch: any = useDispatch();
  const [isMerrid, setIsMerrid] = useState<boolean>(true);
  const [isMerridRole, setIsMerridRole] = useState<boolean>(true);
  const [monthlyIncome, setmonthlyIncome] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [birthplace, setBirthplace] = useState<string>('');

  const [showDob, setShowDob] = useState<boolean>(false);
  const [dob, setDob] = useState<string>('');
  const [defaultDob, setDefaultDob] = useState<any>(new Date());

  const onChangeDob = (event: any, selectedDate: string) => {
    if (event.type === 'set') {
      const currentDate = selectedDate;
      if (Platform.OS === 'android') {
        setDefaultDob(currentDate);
        setDob(moment(selectedDate).format('YYYY-MM-DD'));
        setShowDob(false);
      }
      if (Platform.OS === 'ios') {
        setDefaultDob(currentDate);
      }
    } else {
      setShowDob(false);
    }
  };
  const onConfirmIOSDate = () => {
    setDob(moment(defaultDob).format('YYYY-MM-DD'));
    setShowDob(false);
  };

  const onSubmitFlpp = () => {
    const roleName = !isMerrid ? '' : isMerridRole ? 'Suami' : 'Istri';
    const body = {
      maritalStatusId: isMerrid ? 1 : 0,
      householdRole: roleName,
      monthlyIncome: String(monthlyIncome),
      profession: String(profession),
      birthplace: String(birthplace),
      dob: String(dob),
    };
    dispatch(createGenerateFlpp(bookingId, body));
  };

  useEffect(() => {
    if (statusGenerateFlpp === 'success') {
      Alert.alert('Berhasil generate form flpp');

      const [base, ...pathParts] = generateFlpp.url.split('/');
      const path = pathParts.join('/');

      // Encode the path part
      const encodedPath = encodeURIComponent(path);

      // Replace encoded slashes with normal slashes
      const correctedEncodedPath = encodedPath.replace(/%2F/g, '/');

      // Combine the base and the encoded path
      const encodedUrl = `${base}/${correctedEncodedPath}`;

      if (Platform.OS === 'android') {
        getDownloadPermissionAndroid()
          .then(granted => {
            if (granted) {
              downloadFile(encodedUrl);
            }
          })
          .catch(() => {
            Alert.alert('ini bukan link url gambar');
          });
      } else {
        downloadFile(encodedUrl)
          .then((res: any) => {
            RNFetchBlob.ios.previewDocument(res.path());
          })
          .catch(() => {
            Alert.alert(`link url tidak sesuai ${generateFlpp.url}`);
          });
      }

      dispatch({type: RESET_GENERATE_FLPP});
    }
    if (statusGenerateFlpp === 'error') {
      Alert.alert('Gagal generate form flpp', NotifError(errorGenerateFlpp));
      dispatch({type: RESET_STATUS_GENERATE_FLPP});
    }
  }, [dispatch, statusGenerateFlpp]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView scrollEnabled={statusGenerateFlpp !== 'process'}>
        <View style={{padding: 20}}>
          <View>
            <Text style={{color: COLORS.bgGrey}}>Status Perkawinan</Text>
            <View
              style={{
                display: 'flex',
                gap: 20,
                flexDirection: 'row',

                marginTop: 10,
              }}>
              <TouchableOpacity onPress={() => setIsMerrid(false)}>
                <View style={styles.radioWrapper}>
                  <View style={styles.radioButton}>
                    {!isMerrid ? <View style={styles.selected}></View> : ''}
                  </View>
                  <Text>Single</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsMerrid(true)}>
                <View style={styles.radioWrapper}>
                  <View style={styles.radioButton}>
                    {isMerrid ? <View style={styles.selected}></View> : ''}
                  </View>
                  <Text>Menikah</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {isMerrid ? (
            <View style={{marginTop: 20}}>
              <Text style={{color: COLORS.bgGrey}}>Status Pemohon</Text>
              <View
                style={{
                  display: 'flex',
                  gap: 20,
                  flexDirection: 'row',

                  marginTop: 10,
                }}>
                <TouchableOpacity onPress={() => setIsMerridRole(true)}>
                  <View style={styles.radioWrapper}>
                    <View style={styles.radioButton}>
                      {isMerridRole ? (
                        <View style={styles.selected}></View>
                      ) : (
                        ''
                      )}
                    </View>
                    <Text>Suami</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsMerridRole(false)}>
                  <View style={styles.radioWrapper}>
                    <View style={styles.radioButton}>
                      {!isMerridRole ? (
                        <View style={styles.selected}></View>
                      ) : (
                        ''
                      )}
                    </View>
                    <Text>Istri</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            ''
          )}
          <View style={{marginTop: 20}}>
            <CInputTextWithIconLabel
              placeholder="Masukkan gaji perbulan"
              label="Gaji Perbulan"
              right
              value={monthlyIncome}
              onChangeText={(newText: string) => setmonthlyIncome(newText)}
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputTextWithIconLabel
              placeholder="Masukkan pekerjaan"
              label="Pekerjaan"
              right
              value={profession}
              onChangeText={(newText: string) => setProfession(newText)}
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputTextWithIconLabel
              placeholder="Masukkan tempat lahir"
              label="Tempat Lahir"
              right
              value={birthplace}
              onChangeText={(newText: string) => setBirthplace(newText)}
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextWithLabelIconDate
              valueDefaultDate={defaultDob}
              valueDate={dob}
              isShowPicker={showDob}
              onPressCancelIOS={() => setShowDob(false)}
              onConfirmIOSDate={onConfirmIOSDate}
              onPressInInput={() => setShowDob(true)}
              isRight
              onPressInputContainer={() => setShowDob(true)}
              onChangeDatePicker={onChangeDob}
              placeholder="Masukkan tanggal lahir"
              label="Tanggal Lahir"
            />
          </View>
          <View style={{marginTop: 20}}>
            <View style={{marginTop: 10}}>
              <CButton
                disabled={statusGenerateFlpp === 'process'}
                onPress={onSubmitFlpp}>
                {statusGenerateFlpp === 'process' ? 'Loading ..' : 'Generate'}
              </CButton>
            </View>
          </View>
        </View>
      </ScrollView>
      <LoadingScreen loading={statusGenerateFlpp === 'process'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  radioWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  radioButton: {
    height: 28,
    width: 28,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'grey',
  },
  selected: {
    backgroundColor: '#219C90',
    flex: 1,
    borderRadius: 20,
    margin: 3,
  },
});

export default GenerateFlpp;

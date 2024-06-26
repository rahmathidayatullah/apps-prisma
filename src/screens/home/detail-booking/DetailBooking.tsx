import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchBookingDetail,
  reviewBerkasById,
} from '../../../redux/features/booking/actions';
import RiwayatStatus from './ui/RiwayatStatus';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import CButtonSmall from '../../../components/atoms/button/ButtonSmall';
import CInputTextWithIconLabelFile from '../../../components/atoms/input/TextWithIconLabelFile';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import useMultipleFileUpload from '../../../hooks/useImageUpload';
import {NotifError} from '../../../utils/errorMessage';
import {
  RESET_REVIEW_ADM_BOOKING,
  RESET_STATUS_REVIEW_ADM_BOOKING,
  RESET_STATUS_UPLOAD_BERKAS_BOOKING,
  RESET_UPLOAD_BERKAS_BOOKING,
} from '../../../redux/features/booking/constants';
import FileInputRead from './ui/FileInput';
import LoadingScreen from '../../../components/molecules/LoadingScreen';
import {useNavigation} from '@react-navigation/native';
import {routeMenu} from '../../../contants/routes';
import CButton from '../../../components/atoms/button/Button';
import {COLORS} from '../../../contants';
//
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';

const DetailBooking = ({route}: any) => {
  const navigation: any = useNavigation();
  const [files, setFiles] = useState<any>({
    file1: {name: null, file: '', key: 'slipGaji'},
    file2: {name: null, file: '', key: 'slipGajiPasangan'},
    file3: {name: null, file: '', key: 'SKKerja'},
    file4: {name: null, file: '', key: 'rekeningKoran'},
    file5: {name: null, file: '', key: 'KTP'},
    file6: {name: null, file: '', key: 'KTPPasangan'},
    file7: {name: null, file: '', key: 'NPWP'},
    file8: {name: null, file: '', key: 'bukuNikah'},
    file9: {name: null, file: '', key: 'BPJS'},
    file10: {name: null, file: '', key: 'BPJSTK'},
    file11: {name: null, file: '', key: 'FLPP'},
    file12: {name: null, file: '', key: 'SKDomisili'},
    file13: {name: null, file: '', key: 'KK'},
    file14: {name: null, file: '', key: 'SPT'},
    file15: {name: null, file: '', key: 'formWawancara'},
    file16: {name: null, file: '', key: 'bestTimeToCall'},
    file17: {name: null, file: '', key: 'formAplikasi'},
    file18: {name: null, file: '', key: 'SIKasep'},
  });

  const booking = useSelector((state: any) => state.booking);
  const {
    bookingDetail,
    statusDetailBooking,
    errorDetailBooking,
    bookingUploadBerkas,
    statusUploadBerkasBooking,
    errorUploadBerkasBooking,
    fileKey,
    reviewBerkasAdm,
    statusReviewBerkasAdm,
    errorReviewBerkasAdm,
  } = booking;

  // console.log('bookingDetail', bookingDetail);

  const dispatch: any = useDispatch();

  const {bookingId} = route.params;
  const {uploadFile, clearFile} = useMultipleFileUpload({
    bookingId,
    files,
    setFiles,
  });

  const onSubmitUploadBerkas = () => {
    dispatch(reviewBerkasById(bookingId));
  };

  // const onSubmitUploadBerkas = () => {
  //   const body = {
  //     slipGaji: files.file1.file,
  //     KTP: files.file5.file,
  //     SKKerja: files.file3.file,
  //     rekeningKoran: files.file4.file,
  //     bukuNikah: files.file8.file,
  //     NPWP: files.file7.file,
  //     BPJS: files.file9.file,
  //     BPJSTK: files.file10.file,
  //     KK: files.file13.file,
  //     SKDomisili: files.file12.file,
  //     SPT: files.file14.file,
  //     formAplikasi: files.file17.file,
  //     formWawancara: files.file15.file,
  //     FLPP: files.file11.file,
  //     SIKasep: files.file18.file,
  //     bestTimeToCall: files.file16.file,
  //     slipGajiPasangan: files.file2.file,
  //     KTPPasangan: files.file6.file,
  //   };
  //   dispatch(uploadBerkasBooking(bookingId, body));
  // };

  // const uploadFileOnPressHandler = async () => {
  //   try {
  //     const pickedFile = await DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     console.log('pickedFile', pickedFile);

  //     await RNFS.readFile(pickedFile.uri, 'base64').then(data => {
  //       // console.log('base64', data);
  //     });
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log(err);
  //     } else {
  //       console.log(err);
  //       throw err;
  //     }
  //   }
  // };

  const [refresh, setRefresh] = useState(false);
  const pullMe = () => {
    dispatch(fetchBookingDetail(bookingId));
  };

  useEffect(() => {
    if (statusDetailBooking === 'success') {
      setRefresh(false);
    }
  }, [statusDetailBooking]);

  useEffect(() => {
    dispatch(fetchBookingDetail(bookingId));
  }, [dispatch, bookingId]);

  useEffect(() => {
    if (statusDetailBooking === 'success') {
      setFiles({
        ...files,
        file1: {
          name: bookingDetail?.consument?.slipGaji ? 'slipGaji' : '',
          file: bookingDetail?.consument?.slipGaji,
          key: 'slipGaji',
        },
        file2: {
          name: bookingDetail?.consument?.slipGajiPasangan
            ? 'slipGajiPasangan'
            : '',
          file: bookingDetail?.consument?.slipGajiPasangan,
          key: 'slipGajiPasangan',
        },
        file3: {
          name: bookingDetail?.consument?.SKKerja ? 'SKKerja' : '',
          file: bookingDetail?.consument?.SKKerja,
          key: 'SKKerja',
        },
        file4: {
          name: bookingDetail?.consument?.rekeningKoran ? 'rekeningKoran' : '',
          file: bookingDetail?.consument?.rekeningKoran,
          key: 'rekeningKoran',
        },
        file5: {
          name: bookingDetail?.consument?.KTP ? 'KTP' : '',
          file: bookingDetail?.consument?.KTP,
          key: 'KTP',
        },
        file6: {
          name: bookingDetail?.consument?.KTPPasangan ? 'KTPPasangan' : '',
          file: bookingDetail?.consument?.KTPPasangan,
          key: 'KTPPasangan',
        },
        file7: {
          name: bookingDetail?.consument?.NPWP ? 'NPWP' : '',
          file: bookingDetail?.consument?.NPWP,
          key: 'NPWP',
        },
        file8: {
          name: bookingDetail?.consument?.bukuNikah ? 'bukuNikah' : '',
          file: bookingDetail?.consument?.bukuNikah,
          key: 'bukuNikah',
        },
        file9: {
          name: bookingDetail?.consument?.BPJS ? 'BPJS' : '',
          file: bookingDetail?.consument?.BPJS,
          key: 'BPJS',
        },
        file10: {
          name: bookingDetail?.consument?.BPJSTK ? 'BPJSTK' : '',
          file: bookingDetail?.consument?.BPJSTK,
          key: 'BPJSTK',
        },
        file11: {
          name: bookingDetail?.consument?.FLPP ? 'FLPP' : '',
          file: bookingDetail?.consument?.FLPP,
          key: 'FLPP',
        },
        file12: {
          name: bookingDetail?.consument?.SKDomisili ? 'SKDomisili' : '',
          file: bookingDetail?.consument?.SKDomisili,
          key: 'SKDomisili',
        },
        file13: {
          name: bookingDetail?.consument?.KK ? 'KK' : '',
          file: bookingDetail?.consument?.KK,
          key: 'KK',
        },
        file14: {
          name: bookingDetail?.consument?.SPT ? 'SPT' : '',
          file: bookingDetail?.consument?.SPT,
          key: 'SPT',
        },
        file15: {
          name: bookingDetail?.consument?.formWawancara ? 'formWawancara' : '',
          file: bookingDetail?.consument?.formWawancara,
          key: 'formWawancara',
        },
        file16: {
          name: bookingDetail?.consument?.bestTimeToCall
            ? 'bestTimeToCall'
            : '',
          file: bookingDetail?.consument?.bestTimeToCall,
          key: 'bestTimeToCall',
        },
        file17: {
          name: bookingDetail?.consument?.formAplikasi ? 'formAplikasi' : '',
          file: bookingDetail?.consument?.formAplikasi,
          key: 'formAplikasi',
        },
        file18: {
          name: bookingDetail?.consument?.SIKasep ? 'SIKasep' : '',
          file: bookingDetail?.consument?.SIKasep,
          key: 'SIKasep',
        },
      });
    }
    if (statusUploadBerkasBooking === 'success') {
      Alert.alert('Berhasil submit berkas');
      dispatch({type: RESET_UPLOAD_BERKAS_BOOKING});
      dispatch(fetchBookingDetail(bookingId));
      // navigation.navigate(routeMenu.LIST_BOOKING);
    }
    if (statusUploadBerkasBooking === 'error') {
      Alert.alert('Gagal submit berkas', NotifError(errorUploadBerkasBooking));
      dispatch({type: RESET_STATUS_UPLOAD_BERKAS_BOOKING});
    }
    if (statusReviewBerkasAdm === 'success') {
      Alert.alert('Berhasil submit berkas untuk direview admin');
      dispatch({type: RESET_REVIEW_ADM_BOOKING});
      dispatch(fetchBookingDetail(bookingId));
    }
    if (statusReviewBerkasAdm === 'error') {
      Alert.alert(
        'Gagal submit berkas untuk direview admin',
        NotifError(errorReviewBerkasAdm),
      );
      dispatch({type: RESET_STATUS_REVIEW_ADM_BOOKING});
    }
  }, [statusUploadBerkasBooking, statusDetailBooking, statusReviewBerkasAdm]);
  if (statusDetailBooking === 'process') {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.bgPrimary} />
      </SafeAreaView>
    );
  }

  if (statusDetailBooking === 'error') {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Text>Terjadi kesalahan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        scrollEnabled={
          statusUploadBerkasBooking !== 'process' ||
          statusReviewBerkasAdm !== 'process'
        }
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullMe} />
        }>
        <RiwayatStatus bookingDetail={bookingDetail} />
        <View style={{padding: 20}}>
          <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
            <Text style={{fontWeight: '600'}}>Booking Fee</Text>
            <Text>: -</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
            <Text style={{fontWeight: '600'}}>Deadline Berkas</Text>
            <Text>: {bookingDetail?.deadlineBerkas} Hari</Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Text style={{fontWeight: '600', marginBottom: 16}}>
            Generate Form FLPP
          </Text>
          {/* <Button
            title="Gallary"
            onPress={async () => {
              uploadFileOnPressHandler();
            }}
          /> */}
          <View>
            <CButtonSmall
              onPress={() =>
                navigation.navigate(routeMenu.GENERATE_FLPP, {
                  bookingId: bookingId,
                })
              }>
              Generate Dokumen
            </CButtonSmall>
          </View>
        </View>
        <View style={{padding: 20}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Text style={{fontWeight: '600'}}>Generate Form FLPP</Text>
            <Text style={{fontWeight: '600'}}>
              Status Berkas{' '}
              {bookingDetail?.persentaseBerkas
                ? Math.ceil(bookingDetail?.persentaseBerkas)
                : '0'}
              %
            </Text>
          </View>
          <View>
            <View
              style={{
                marginTop: 10,
              }}>
              <View style={{marginTop: 20}}>
                {files.file1.name ? (
                  <FileInputRead
                    label="Slip Gaji Pemohon"
                    file={bookingDetail.consument.slipGaji}
                    fileName={files.file1.name}
                    onClear={() => clearFile('file1')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="Slip Gaji Pemohon"
                    right
                    value={files.file1.name}
                    onPressInputContainer={() => uploadFile('file1')}
                    onPressIcon={() => clearFile('file1')}
                    icon={
                      files.file2.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file2.name ? (
                  <FileInputRead
                    label="Slip Gaji Pemohon Pasangan ( Optional )"
                    file={bookingDetail.consument.slipGajiPasangan}
                    fileName={files.file2.name}
                    onClear={() => clearFile('file2')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="Slip Gaji Pemohon Pasangan ( Optional )"
                    right
                    value={files.file2.name}
                    onPressInputContainer={() => uploadFile('file2')}
                    onPressIcon={() => clearFile('file2')}
                    icon={
                      files.file2.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file3.name ? (
                  <FileInputRead
                    label="SK Kerja"
                    file={bookingDetail.consument.SKKerja}
                    fileName={files.file3.name}
                    onClear={() => clearFile('file3')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="SK Kerja"
                    right
                    value={files.file3.name}
                    onPressInputContainer={() => uploadFile('file3')}
                    onPressIcon={() => clearFile('file3')}
                    icon={
                      files.file3.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file4.name ? (
                  <FileInputRead
                    label="Rekening Koran"
                    file={bookingDetail.consument.rekeningKoran}
                    fileName={files.file4.name}
                    onClear={() => clearFile('file4')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="Rekening Koran"
                    right
                    value={files.file4.name}
                    onPressInputContainer={() => uploadFile('file4')}
                    onPressIcon={() => clearFile('file4')}
                    icon={
                      files.file4.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file5.name ? (
                  <FileInputRead
                    label="KTP"
                    file={bookingDetail.consument.KTP}
                    fileName={files.file5.name}
                    onClear={() => clearFile('file5')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="KTP"
                    right
                    value={files.file5.name}
                    onPressInputContainer={() => uploadFile('file5')}
                    onPressIcon={() => clearFile('file5')}
                    icon={
                      files.file5.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file6.name ? (
                  <FileInputRead
                    label="KTP Pasangan (Optional)"
                    file={bookingDetail.consument.KTPPasangan}
                    fileName={files.file6.name}
                    onClear={() => clearFile('file6')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="KTP Pasangan (Optional)"
                    right
                    value={files.file6.name}
                    onPressInputContainer={() => uploadFile('file6')}
                    onPressIcon={() => clearFile('file6')}
                    icon={
                      files.file6.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file7.name ? (
                  <FileInputRead
                    label="NPWP"
                    file={bookingDetail.consument.NPWP}
                    fileName={files.file7.name}
                    onClear={() => clearFile('file7')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="NPWP"
                    right
                    value={files.file7.name}
                    onPressInputContainer={() => uploadFile('file7')}
                    onPressIcon={() => clearFile('file7')}
                    icon={
                      files.file7.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file8.name ? (
                  <FileInputRead
                    label="Buku Nikah ( Optional )"
                    file={bookingDetail.consument.bukuNikah}
                    fileName={files.file8.name}
                    onClear={() => clearFile('file8')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="Buku Nikah ( Optional )"
                    right
                    value={files.file8.name}
                    onPressInputContainer={() => uploadFile('file8')}
                    onPressIcon={() => clearFile('file8')}
                    icon={
                      files.file8.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file9.name ? (
                  <FileInputRead
                    label="BPJS"
                    file={bookingDetail.consument.BPJS}
                    fileName={files.file9.name}
                    onClear={() => clearFile('file9')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="BPJS"
                    right
                    value={files.file9.name}
                    onPressInputContainer={() => uploadFile('file9')}
                    onPressIcon={() => clearFile('file9')}
                    icon={
                      files.file9.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file10.name ? (
                  <FileInputRead
                    label="BPJSTK"
                    file={bookingDetail.consument.BPJSTK}
                    fileName={files.file10.name}
                    onClear={() => clearFile('file10')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="BPJSTK"
                    right
                    value={files.file10.name}
                    onPressInputContainer={() => uploadFile('file10')}
                    onPressIcon={() => clearFile('file10')}
                    icon={
                      files.file10.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file11.name ? (
                  <FileInputRead
                    label="FLPP"
                    file={bookingDetail.consument.FLPP}
                    fileName={files.file11.name}
                    onClear={() => clearFile('file11')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="FLPP"
                    right
                    value={files.file11.name}
                    onPressInputContainer={() => uploadFile('file11')}
                    onPressIcon={() => clearFile('file11')}
                    icon={
                      files.file11.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file12.name ? (
                  <FileInputRead
                    label="Surat Keterangan Domisili"
                    file={bookingDetail.consument.SKDomisili}
                    fileName={files.file12.name}
                    onClear={() => clearFile('file12')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="Surat Keterangan Domisili"
                    right
                    value={files.file12.name}
                    onPressInputContainer={() => uploadFile('file12')}
                    onPressIcon={() => clearFile('file12')}
                    icon={
                      files.file12.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file13.name ? (
                  <FileInputRead
                    label="KK"
                    file={bookingDetail.consument.KK}
                    fileName={files.file13.name}
                    onClear={() => clearFile('file13')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="KK"
                    right
                    value={files.file13.name}
                    onPressInputContainer={() => uploadFile('file13')}
                    onPressIcon={() => clearFile('file13')}
                    icon={
                      files.file13.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file14.name ? (
                  <FileInputRead
                    label="SPT Tahunan"
                    file={bookingDetail.consument.SPT}
                    fileName={files.file14.name}
                    onClear={() => clearFile('file14')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="SPT Tahunan"
                    right
                    value={files.file14.name}
                    onPressInputContainer={() => uploadFile('file14')}
                    onPressIcon={() => clearFile('file14')}
                    icon={
                      files.file14.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file15.name ? (
                  <FileInputRead
                    label="Form Wawancara"
                    file={bookingDetail.consument.formWawancara}
                    fileName={files.file15.name}
                    onClear={() => clearFile('file15')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="Form Wawancara"
                    right
                    value={files.file15.name}
                    onPressInputContainer={() => uploadFile('file15')}
                    onPressIcon={() => clearFile('file15')}
                    icon={
                      files.file15.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file16.name ? (
                  <FileInputRead
                    label="Best Time To Call"
                    file={bookingDetail.consument.bestTimeToCall}
                    fileName={files.file16.name}
                    onClear={() => clearFile('file16')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="Best Time To Call"
                    right
                    value={files.file16.name}
                    onPressInputContainer={() => uploadFile('file16')}
                    onPressIcon={() => clearFile('file16')}
                    icon={
                      files.file16.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file17.name ? (
                  <FileInputRead
                    label="Form Aplikasi"
                    file={bookingDetail.consument.formAplikasi}
                    fileName={files.file17.name}
                    onClear={() => clearFile('file17')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="Form Aplikasi"
                    right
                    value={files.file17.name}
                    onPressInputContainer={() => uploadFile('file17')}
                    onPressIcon={() => clearFile('file17')}
                    icon={
                      files.file17.name ? (
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
                )}
              </View>

              <View style={{marginTop: 20}}>
                {files.file18.name ? (
                  <FileInputRead
                    label="Sikasep"
                    file={bookingDetail.consument.SIKasep}
                    fileName={files.file18.name}
                    onClear={() => clearFile('file18')}
                  />
                ) : (
                  <CInputTextWithIconLabelFile
                    placeholder="Upload"
                    label="Sikasep"
                    right
                    value={files.file18.name}
                    onPressInputContainer={() => uploadFile('file18')}
                    onPressIcon={() => clearFile('file18')}
                    icon={
                      files.file18.name ? (
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
                )}
              </View>
              {bookingDetail?.statusBooking?.name === 'Pending' ||
              bookingDetail?.statusBooking?.name === 'Reject' ||
              bookingDetail?.statusBooking?.name === 'Reject Admin' ||
              bookingDetail?.statusBooking?.name === 'Reject BTN' ? (
                <View style={{marginTop: 20}}>
                  <CButton onPress={onSubmitUploadBerkas}>Review Admin</CButton>
                </View>
              ) : (
                ''
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <LoadingScreen
        loading={
          statusUploadBerkasBooking === 'process' ||
          statusReviewBerkasAdm === 'process'
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // form
  iconInput: {
    position: 'absolute',
    left: 15,
    top: '33%',
  },
});

export default DetailBooking;

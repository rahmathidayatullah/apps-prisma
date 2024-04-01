import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Badge from '../../../components/atoms/badge/Badge';
import ContainerCardClockInOut from '../../../components/templates/home/ContainerCardClockInOut';
import CardClockInOut from '../../../components/templates/home/CardClockInOut';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../contants';
import ImageProfile from '../../../components/templates/home/ImageProfile';
import {
  listAnnouncement,
  routeMenu,
  routeMenuItem,
} from '../../../contants/routes';
import {MenuItem} from './inteface';
import CardMenuItem from './CardMenuItem';
import {ListAttendace} from './ListAttendace';
import {ListSubmission} from './ListSubmission';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListAttendancesMine,
  getListOvertimesMine,
  getListSubmissionsMine,
  onPressMenuItem,
  resetValueBottomSheet,
} from '../../../redux/features/home/actions';
import {stateGlobalHome} from '../../../redux/features/home/interface';
import {useNavigation} from '@react-navigation/native';
import FormClockInClockOut from './FormClockInClockOut';
import FormClockInClockOutOvertime from './FormClockInClockOutOvertime';
import moment from 'moment';
import {stateGlobalAuth} from '../../../redux/features/auth/interface';
import {ListOvertime} from './ListOvertime';
import FormSubmission from './FormSubmission';
import {stateGlobalProfile} from '../../../redux/features/profile/interface';
import {fetchProfile} from '../../../redux/features/profile/actions';
import FormOvertime from './FormOvertime';
import {
  RESET_STATE_CLOCK_IN,
  RESET_STATE_OVERTIME,
  RESET_STATE_SUBMISSION,
} from '../../../redux/features/home/constants';
import CButtonText from '../../atoms/button/ButtonText';
import LinearGradient from 'react-native-linear-gradient';
import CardSubmission from './CardSubmission';
import CardOvertime from './CardOvertime';
import 'moment/locale/id';
import ListAnnoucement from './ListAnnoucement';
import FormOvertime2 from './FormOvertime2';
import CardMenuItem2 from './CardMenuItem2';
import {getListAnnoucementHome} from '../../../redux/features/announcement/actions';
// import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

// async function onDisplayNotification() {
//   const date = new Date(Date.now());
//   date.setHours(15);
//   date.setMinutes(40);

//   // Create a time-based trigger
//   const trigger: TimestampTrigger = {
//     type: TriggerType.TIMESTAMP,
//     timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
//   };

//   // Request permissions (required for iOS)
//   await notifee.requestPermission();

//   // Create a channel (required for Android)
//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//   });

//   // Display a notification
//   await notifee.createTriggerNotification(
//     {
//       title: 'Jangan lupa absen',
//       body: `Segera absen .. 15:32 ${date}`,
//       android: {
//         channelId,
//         // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
//         // pressAction is needed if you want the notification to open the app when pressed
//         pressAction: {
//           id: 'default',
//         },
//       },
//     },
//     trigger,
//   );
// }

// async function onCreateTriggerNotification() {
//   const date = new Date(Date.now());
//   date.setHours(11);
//   date.setMinutes(10);

//   // Create a time-based trigger
//   const trigger: TimestampTrigger = {
//     type: TriggerType.TIMESTAMP,
//     timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
//   };

//   // Create a trigger notification
//   await notifee.createTriggerNotification(
//     {
//       title: 'Meeting with Jane',
//       body: 'Today at 11:20am',
//       android: {
//         channelId: 'your-channel-id',
//       },
//     },
//     trigger,
//   );
// }

const TemplateHome = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const home = useSelector((state: stateGlobalHome) => state.home);
  const {
    isShowMenuItem,
    statusClockIn,
    statusSubmitSubmission,
    statusSubmitOvertime,

    statusListAttendaceMine,
    statusListOvertimesMine,
    statusListSubmissionsMine,

    dataAttendaceMine,
    dataOvertimesMine,
    datSubmissionsMine,
  } = home;
  const auth = useSelector((state: stateGlobalAuth) => state.auth);
  const {userData} = auth;
  const newData =
    typeof userData === 'string' ? JSON.parse(userData) : userData;
  const profile = useSelector((state: stateGlobalProfile) => state.profile);
  const announcement = useSelector((state: any) => state.announcement);
  const {statusList: statusListAnnouncement, dataList: dataListAnnouncement} =
    announcement;
  console.log('announcement', announcement);
  // console.log('home', home);
  // console.log('profile', profile);
  // console.log('auth', auth);

  const [greeting, setGreeting] = useState('');
  const [greeting2, setGreeting2] = useState('');
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  // variables
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      dispatch(resetValueBottomSheet());
    }
  }, []);

  const handleOnPressMenuItem = (menuItem: string) => {
    if (menuItem === 'clockIn' && profile.profile.clockIn) {
      Alert.alert('', 'Anda sudah absen masuk');
    } else if (menuItem === 'clockOut' && profile.profile.clockOut) {
      Alert.alert('', 'Anda sudah absen keluar');
    } else if (
      menuItem === 'lembur' &&
      profile.profile.overtime.clockIn &&
      profile.profile.overtime.clockOut
    ) {
      Alert.alert('', 'Anda sudah absen lembur');
    } else {
      dispatch(onPressMenuItem(menuItem));
      bottomSheetModalRef.current?.present();
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());

    dispatch(getListAttendancesMine());
    dispatch(getListOvertimesMine());
    dispatch(getListSubmissionsMine());
    dispatch(getListAnnoucementHome());

    const timerID = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'));
    }, 1000); // Update every second

    const currentTime = moment();

    const updateGreeting = () => {
      const currentHour = currentTime.hour();

      let newGreeting = '';
      let newGreeting2 = '';
      if (currentHour >= 4 && currentHour < 10) {
        newGreeting = 'Selamat pagi';
        newGreeting2 = 'semangat bekerja hari ini';
      } else if (currentHour >= 10 && currentHour < 15) {
        newGreeting = 'Selamat siang';
        newGreeting2 = 'semangat bekerja hari ini';
      } else if (currentHour >= 15 && currentHour < 18) {
        newGreeting = 'Selamat sore';
        newGreeting2 = 'semangat bekerja hari ini';
      } else {
        newGreeting = 'Selamat malam';
        newGreeting2 = 'selamat beristirahat :)';
      }

      setGreeting(newGreeting);
      setGreeting2(newGreeting2);
    };

    // Update greeting initially
    updateGreeting();

    // Update greeting every minute
    const intervalId = setInterval(updateGreeting, 60000);

    return () => {
      dispatch(resetValueBottomSheet());
      clearInterval(intervalId);
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      if (bottomSheetModalRef.current) {
        bottomSheetModalRef.current.dismiss();
      }
      dispatch(resetValueBottomSheet());
    });

    // Cleanup function
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (profile.status === 'success') {
      setRefresh(false);
    }
    if (statusClockIn === 'success') {
      Alert.alert('Berhasil', 'Berhasil absen');
      bottomSheetModalRef?.current?.dismiss();
      dispatch({
        type: RESET_STATE_CLOCK_IN,
      });
      dispatch(resetValueBottomSheet());
    }

    if (statusClockIn === 'error') {
      Alert.alert('Peringantan', 'Terjadi kesalahan');
    }

    if (statusSubmitSubmission === 'error') {
      Alert.alert('Peringantan', 'Terjadi kesalahan');
    }

    if (statusSubmitSubmission === 'success') {
      Alert.alert('Berhasil', 'Berhasil membuat pengajuan');
      bottomSheetModalRef.current?.dismiss();
      dispatch({
        type: RESET_STATE_SUBMISSION,
      });
      dispatch(resetValueBottomSheet());
    }

    if (statusSubmitOvertime === 'error') {
      Alert.alert('Peringantan', 'Terjadi kesalahan');
    }
    if (statusSubmitOvertime === 'success') {
      Alert.alert('Berhasil', 'Berhasil absen lembur');
      bottomSheetModalRef.current?.dismiss();
      dispatch({
        type: RESET_STATE_OVERTIME,
      });
      dispatch(resetValueBottomSheet());
    }
  }, [
    profile.status,
    statusClockIn,
    statusSubmitSubmission,
    statusSubmitOvertime,
  ]);

  const atLeastOneTrue = Object.values(isShowMenuItem).some(
    value => value === true,
  );

  if (!newData && !profile) {
    return (
      <View>
        <Text>No Data</Text>
      </View>
    );
  }

  const [refresh, setRefresh] = useState(false);
  const pullMe = () => {
    dispatch(fetchProfile());
    dispatch(getListAttendancesMine());
    dispatch(getListOvertimesMine());
    dispatch(getListSubmissionsMine());
    dispatch(getListAnnoucementHome());
  };

  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={pullMe} />
          }>
          <View style={styles.container}>
            <View style={styles.containerHead}>
              <LinearGradient
                start={{x: 0.5, y: 0.1}}
                end={{x: 0.5, y: 0.9}}
                colors={['#219C90', '#219C90', '#FBB03B']}
                // style={styles.containerHead}>
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
              {/* <View style={styles.containerHead}> */}
              <View style={styles.containerHeadTitleImage}>
                <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
                  <ImageProfile />
                  <View>
                    <Text style={styles.titleName}>{newData.user.name}</Text>
                    <Text style={styles.titleRole}>
                      {newData.user.role.name}
                    </Text>
                    <Text style={styles.titleRole}>
                      PT Prisma Inti Propertindo
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{fontSize: 12, color: 'white', fontWeight: '500'}}>
                    {moment().format('dddd')}, {moment().format('DD MMMM YYYY')}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: 10,
                      color: 'white',
                    }}>
                    {currentTime} WIB
                  </Text>
                </View>
              </View>

              <ContainerCardClockInOut>
                <View
                  style={{
                    flexDirection: 'column',
                  }}>
                  <View style={{paddingVertical: 10}}>
                    <Text style={styles.titleDay}>
                      {greeting} {newData.user.name}, {greeting2}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 4,
                      width: '100%',
                      marginTop: 10,
                    }}>
                    {/* <View>
                      <View style={styles.containerBadge}>
                        <View style={styles.containerBgBadge} />
                        <Text style={styles.textBadge}>
                          {profile.profile.workStatus || 'Work Shift'}
                        </Text>
                      </View>
                    </View> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                      <IconMaterialIcons
                        name="access-alarm"
                        size={24}
                        color={COLORS.bgPrimary}
                      />

                      <Text
                        style={{
                          color: COLORS.bgPrimary,
                          fontSize: 12,
                          fontWeight: '600',
                        }}>
                        {newData.user.shift.start_time}
                        &nbsp; - {newData.user.shift.end_time}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}>
                  <CardClockInOut
                    clockIn
                    onPress={() => handleOnPressMenuItem('clockIn')}
                  />
                  <CardClockInOut
                    clockOut
                    onPress={() => handleOnPressMenuItem('clockOut')}
                  />
                </View>
                <View
                  style={{
                    marginTop: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}>
                  <CardOvertime
                    onPress={() => handleOnPressMenuItem('lembur')}
                  />
                  <CardSubmission
                    onPress={() => handleOnPressMenuItem('pengajuan')}
                  />
                </View>
              </ContainerCardClockInOut>
              {/* <View
                style={{
                  position: 'absolute',
                  backgroundColor: 'red',
                  height: 100,
                  width: 100,
                  bottom: -10,
                }}></View> */}
              {/* </LinearGradient> */}
            </View>
            {/* </View> */}

            <ScrollView
              horizontal
              style={{
                marginTop: 180,
                flexDirection: 'row',
                // justifyContent: 'space-around',
                gap: 10,
                // flexWrap: 'wrap',
                marginBottom: 20,
                // paddingHorizontal: 8,
                overflow: 'scroll',
                width: '100%',
                paddingBottom: 10,
              }}>
              {routeMenuItem.map((item: MenuItem) => (
                <CardMenuItem2
                  // onPress={() => handleOnPressMenuItem(item.value)}
                  key={item.id}
                  item={item}
                />
              ))}
            </ScrollView>
            {/* <View>
              <Button title="test" onPress={() => onDisplayNotification()}>
                Test
              </Button>
            </View> */}
            <ListAnnoucement
              dataAnnouncement={dataListAnnouncement}
              loading={statusListAnnouncement === 'process'}
            />
            <View style={styles.containerListAttendace}>
              <ListAttendace
                dataAttendaceMine={dataAttendaceMine}
                loading={statusListAttendaceMine === 'process'}
              />
            </View>
            <View style={styles.containerListAttendace}>
              <ListSubmission
                datSubmissionsMine={datSubmissionsMine}
                loading={statusListSubmissionsMine === 'process'}
              />
            </View>
            <View style={styles.containerListAttendace}>
              <ListOvertime
                dataOvertimesMine={dataOvertimesMine}
                loading={statusListOvertimesMine === 'process'}
              />
            </View>
          </View>
          {atLeastOneTrue && <View style={styles.backdrop} />}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <BottomSheetScrollView style={styles.contentBottomSheetContainer}>
              {/* <ScrollView> */}
              {/* {isShowMenuItem.cuti && (
                    <FormCuti bottomSheetModalRef={bottomSheetModalRef} />
                  )} */}
              {isShowMenuItem.pengajuan && (
                <FormSubmission bottomSheetModalRef={bottomSheetModalRef} />
              )}
              {isShowMenuItem.lembur && (
                <FormOvertime2 bottomSheetModalRef={bottomSheetModalRef} />
              )}
              {isShowMenuItem.clockIn && (
                <FormClockInClockOut
                  clockIn
                  bottomSheetModalRef={bottomSheetModalRef}
                />
              )}
              {isShowMenuItem.clockOut && (
                <FormClockInClockOut
                  clockOut
                  bottomSheetModalRef={bottomSheetModalRef}
                />
              )}
              {isShowMenuItem.clockInOvertime && (
                <FormClockInClockOutOvertime />
              )}
              {isShowMenuItem.clockOutOvertime && (
                <FormClockInClockOutOvertime />
              )}
              {/* {isShowMenuItem.izin && (
                    <FormPermission bottomSheetModalRef={bottomSheetModalRef} />
                  )} */}
              {/* </ScrollView> */}
            </BottomSheetScrollView>
          </BottomSheetModal>
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
    // </GestureHandlerRootView>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerHead: {
    paddingTop: 14,
    paddingLeft: 10,
    paddingRight: 14,
    paddingBottom: 100,
    backgroundColor: COLORS.bgPrimary,
    position: 'relative',
  },
  containerBody: {},
  containerHeadTitleImage: {
    marginTop: 5,
    paddingHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    position: 'relative',
  },
  titleName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 1,
  },
  titleRole: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
    marginTop: 2,
    letterSpacing: 1,
  },
  titleDay: {
    // color: 'white',
    color: COLORS.bgPrimary,
    fontWeight: '500',
    fontSize: deviceWidth < 380 ? 12 : 14,
    textAlign: 'center',
  },
  containerListAttendace: {
    paddingHorizontal: 12,
    marginTop: 38,
  },
  contentBottomSheetContainer: {
    flex: 1,
    // alignItems: 'center',
  },

  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  containerBadge: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 4,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    alignSelf: 'flex-start',
  },
  containerBgBadge: {
    // backgroundColor: COLORS.bgOrangeOpacity,
    // backgroundColor: '#fff',
    backgroundColor: COLORS.bgPrimary,
    // opacity: 0.08,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  textBadge: {
    fontSize: 12,
    fontWeight: '500',
    // color: COLORS.bgPrimary,
    color: '#ffffff',
  },

  // liniear gradient
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    height: 200,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default TemplateHome;

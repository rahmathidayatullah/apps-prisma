import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ContainerCardClockInOut from '../../../components/templates/home/ContainerCardClockInOut';
import CardClockInOut from '../../../components/templates/home/CardClockInOut';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../contants';
import ImageProfile from '../../../components/templates/home/ImageProfile';
import {routeMenu, routeMenuItem} from '../../../contants/routes';
import {MenuItem} from './inteface';
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
import FormSubmission from './FormSubmission';
import {fetchProfile} from '../../../redux/features/profile/actions';
import {
  RESET_STATE_CLOCK_IN,
  RESET_STATE_OVERTIME,
  RESET_STATE_SUBMISSION,
} from '../../../redux/features/home/constants';
import LinearGradient from 'react-native-linear-gradient';
import CardSubmission from './CardSubmission';
import CardOvertime from './CardOvertime';
import 'moment/locale/id';
import ListAnnoucement from './ListAnnoucement';
import FormOvertime2 from './FormOvertime2';
import CardMenuItem2 from './CardMenuItem2';
import {getListAnnoucementHome} from '../../../redux/features/announcement/actions';
import {fetchShift} from '../../../redux/features/shift/actions';
import BottomSheetManual from '../../molecules/BottomSheetManual';

const TemplateHome = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const home = useSelector((state: stateGlobalHome) => state.home);
  const shift = useSelector((state: any) => state.shift);
  const {data: dataShift, status: statusShift} = shift;
  const {
    isShowMenuItem,
    statusClockIn,
    statusSubmitSubmission,
    statusSubmitOvertime,
  } = home;
  const auth = useSelector((state: stateGlobalAuth) => state.auth);
  const {userData} = auth;
  const newData =
    typeof userData === 'string' ? JSON.parse(userData) : userData;
  const profile = useSelector((state: any) => state.profile);
  const announcement = useSelector((state: any) => state.announcement);
  const {statusList: statusListAnnouncement, dataList: dataListAnnouncement} =
    announcement;

  // console.log('home', home);
  // console.log('profile', profile);
  // console.log('auth', auth);

  const [greeting, setGreeting] = useState('');
  const [greeting2, setGreeting2] = useState('');
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));

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
    }
  };

  const handleClickOpenMenu = (item: any) => {
    if (item === 'kehadiran') {
      navigation.navigate(routeMenu.ATTENDACE);
    } else {
      return;
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchShift());
    // dispatch(getListAttendancesMine());
    // dispatch(getListOvertimesMine());
    // dispatch(getListSubmissionsMine());
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
    if (profile.status === 'success') {
      setRefresh(false);
    }
    if (statusClockIn === 'success') {
      Alert.alert('Berhasil', 'Berhasil absen');
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
    dispatch(fetchShift());
    // dispatch(getListAttendancesMine());
    // dispatch(getListOvertimesMine());
    // dispatch(getListSubmissionsMine());
    dispatch(getListAnnoucementHome());
  };

  if (atLeastOneTrue === false) {
    return (
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
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
              <View style={styles.containerHeadTitleImage}>
                <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
                  <ImageProfile />
                  <View>
                    <Text
                      style={styles.titleName}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {profile?.profile?.user?.name ?? '-'}
                    </Text>
                    <Text style={styles.titleRole}>
                      {profile?.profile?.user?.role?.name ?? '-'}
                    </Text>
                    <View style={{height: 22}}>
                      {profile?.profile?.user?.companies?.length !== 0 ? (
                        profile?.profile?.user?.companies?.map((item: any) => {
                          return (
                            <Text style={styles.titleRole} key={item.id}>
                              {item.name}
                            </Text>
                          );
                        })
                      ) : (
                        <Text style={styles.titleRole}></Text>
                      )}
                    </View>
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
                      {greeting} {profile?.profile?.user?.name ?? '-'},{' '}
                      {greeting2}
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
                        {profile?.profile?.user?.role?.shift?.start_time ??
                          '-:-'}
                        &nbsp; -{' '}
                        {profile?.profile?.user?.role?.shift?.end_time ?? '-:-'}
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
            </View>

            <ScrollView
              horizontal
              style={{
                flex: 1,
                marginTop: 180,
                flexDirection: 'row',
                gap: 10,
                overflow: 'scroll',
                width: '100%',
              }}>
              {routeMenuItem.map((item: MenuItem) => (
                <CardMenuItem2
                  onPress={() => handleClickOpenMenu(item.value)}
                  key={item.id}
                  item={item}
                />
              ))}
            </ScrollView>
            <View
              style={{
                flex: 2,
              }}>
              <ScrollView>
                <ListAnnoucement
                  dataAnnouncement={dataListAnnouncement}
                  loading={statusListAnnouncement === 'process'}
                />
              </ScrollView>
            </View>
          </View>
          {atLeastOneTrue ? (
            <BottomSheetManual>
              {isShowMenuItem.pengajuan && <FormSubmission />}
              {isShowMenuItem.lembur && <FormOvertime2 />}
              {isShowMenuItem.clockIn && (
                <FormClockInClockOut
                  isFlexible={profile?.profile?.user?.role?.isFlexible ?? false}
                  dataShift={dataShift}
                  clockIn
                />
              )}
              {isShowMenuItem.clockOut && (
                <FormClockInClockOut
                  isFlexible={profile?.profile?.user?.role?.isFlexible ?? false}
                  dataShift={dataShift}
                  clockOut
                />
              )}
              {isShowMenuItem.clockInOvertime && (
                <FormClockInClockOutOvertime />
              )}
              {isShowMenuItem.clockOutOvertime && (
                <FormClockInClockOutOvertime />
              )}
            </BottomSheetManual>
          ) : (
            ''
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.containerHead}>
          <LinearGradient
            start={{x: 0.5, y: 0.1}}
            end={{x: 0.5, y: 0.9}}
            colors={['#219C90', '#219C90', '#FBB03B']}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <View style={styles.containerHeadTitleImage}>
            <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
              <ImageProfile />
              <View>
                <Text
                  style={styles.titleName}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {profile?.profile?.user?.name ?? '-'}
                </Text>
                <Text style={styles.titleRole}>
                  {profile?.profile?.user?.role?.name ?? '-'}
                </Text>
                <View style={{height: 22}}>
                  {profile?.profile?.user?.companies?.length !== 0 ? (
                    profile?.profile?.user?.companies?.map((item: any) => {
                      return (
                        <Text style={styles.titleRole} key={item.id}>
                          {item.name}
                        </Text>
                      );
                    })
                  ) : (
                    <Text style={styles.titleRole}></Text>
                  )}
                </View>
              </View>
            </View>
            <View>
              <Text style={{fontSize: 12, color: 'white', fontWeight: '500'}}>
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
                  {greeting} {profile?.profile?.user?.name ?? '-'}, {greeting2}
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
                    {profile?.profile?.user?.role?.shift?.start_time ?? '-:-'}
                    &nbsp; -{' '}
                    {profile?.profile?.user?.role?.shift?.end_time ?? '-:-'}
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
              <CardOvertime onPress={() => handleOnPressMenuItem('lembur')} />
              <CardSubmission
                onPress={() => handleOnPressMenuItem('pengajuan')}
              />
            </View>
          </ContainerCardClockInOut>
        </View>

        <ScrollView
          horizontal
          style={{
            flex: 1,
            marginTop: 180,
            flexDirection: 'row',
            gap: 10,
            overflow: 'scroll',
            width: '100%',
          }}>
          {routeMenuItem.map((item: MenuItem) => (
            <CardMenuItem2
              onPress={() => handleClickOpenMenu(item.value)}
              key={item.id}
              item={item}
            />
          ))}
        </ScrollView>
        <View
          style={{
            flex: 2,
          }}>
          <ScrollView>
            <ListAnnoucement
              dataAnnouncement={dataListAnnouncement}
              loading={statusListAnnouncement === 'process'}
            />
          </ScrollView>
        </View>
      </View>
      {atLeastOneTrue ? (
        <BottomSheetManual>
          {isShowMenuItem.pengajuan && <FormSubmission />}
          {isShowMenuItem.lembur && <FormOvertime2 />}
          {isShowMenuItem.clockIn && (
            <FormClockInClockOut
              isFlexible={profile?.profile?.user?.role?.isFlexible ?? false}
              dataShift={dataShift}
              clockIn
            />
          )}
          {isShowMenuItem.clockOut && (
            <FormClockInClockOut
              isFlexible={profile?.profile?.user?.role?.isFlexible ?? false}
              dataShift={dataShift}
              clockOut
            />
          )}
          {isShowMenuItem.clockInOvertime && <FormClockInClockOutOvertime />}
          {isShowMenuItem.clockOutOvertime && <FormClockInClockOutOvertime />}
        </BottomSheetManual>
      ) : (
        ''
      )}
    </SafeAreaView>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    height: Dimensions.get('screen').height - 100,
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
  containerHeadTitleImage: {
    marginTop: 5,
    paddingHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    position: 'relative',
  },
  titleName: {
    width: 160,
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
    color: COLORS.bgPrimary,
    fontWeight: '500',
    fontSize: deviceWidth < 380 ? 12 : 14,
    textAlign: 'center',
  },
});

export default TemplateHome;

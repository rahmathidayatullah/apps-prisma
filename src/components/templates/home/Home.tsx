import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Alert,
  Dimensions,
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
import {routeMenuItem} from '../../../contants/routes';
import {MenuItem} from './inteface';
import CardMenuItem from './CardMenuItem';
import {ListAttendace} from './ListAttendace';
import {ListSubmission} from './ListSubmission';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {
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

const TemplateHome = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const home = useSelector((state: stateGlobalHome) => state.home);
  const {isShowMenuItem} = home;
  const auth = useSelector((state: stateGlobalAuth) => state.auth);
  const {userData} = auth;
  const profile = useSelector((state: stateGlobalProfile) => state.profile);
  console.log('home', home);
  console.log('profile', profile);
  console.log('auth', auth);

  const newData =
    typeof userData === 'string' ? JSON.parse(userData) : userData;

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
      Alert.alert('Error', 'Anda sudah absen keluar');
    } else {
      dispatch(onPressMenuItem(menuItem));
      bottomSheetModalRef.current?.present();
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
    return () => {
      dispatch(resetValueBottomSheet());
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

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.containerHead}>
                <Badge />

                <View style={styles.containerHeadTitleImage}>
                  <View>
                    <Text style={styles.titleName}>{newData.user.name}</Text>
                    <Text style={styles.titleRole}>
                      {newData.user.role.name}
                    </Text>
                  </View>
                  <ImageProfile />
                </View>

                <ContainerCardClockInOut>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <View>
                      <Text style={styles.titleDay}>
                        {moment().format('dddd')} -{' '}
                        {moment().format('DD MMMM YYYY')}
                      </Text>
                      <View style={{marginTop: 9}}>
                        <View style={styles.containerBadge}>
                          <View style={styles.containerBgBadge} />
                          <Text style={styles.textBadge}>
                            {profile.profile.workStatus}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: 4,
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
                          color="white"
                        />

                        <Text
                          style={{
                            color: 'white',
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
                      marginTop: 16,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 14,
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
                </ContainerCardClockInOut>
              </View>
              <View
                style={{
                  marginTop: 90,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                {routeMenuItem.map((item: MenuItem) => (
                  <CardMenuItem
                    onPress={() => handleOnPressMenuItem(item.value)}
                    key={item.id}
                    item={item}
                  />
                ))}
              </View>
              <View style={styles.containerListAttendace}>
                <ListAttendace />
              </View>
              <View style={styles.containerListAttendace}>
                <ListSubmission />
              </View>
              <View style={styles.containerListAttendace}>
                <ListOvertime />
              </View>
            </View>
            {atLeastOneTrue && <View style={styles.backdrop} />}
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              <BottomSheetView style={styles.contentBottomSheetContainer}>
                <ScrollView>
                  {/* {isShowMenuItem.cuti && (
                    <FormCuti bottomSheetModalRef={bottomSheetModalRef} />
                  )} */}
                  {isShowMenuItem.pengajuan && (
                    <FormSubmission bottomSheetModalRef={bottomSheetModalRef} />
                  )}
                  {isShowMenuItem.lembur && (
                    <FormOvertime bottomSheetModalRef={bottomSheetModalRef} />
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
                </ScrollView>
              </BottomSheetView>
            </BottomSheetModal>
          </ScrollView>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
  },
  containerBody: {},
  containerHeadTitleImage: {
    marginTop: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginTop: 2,
    letterSpacing: 1,
  },
  titleDay: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: deviceWidth < 380 ? 14 : 16,
  },
  containerListAttendace: {
    paddingHorizontal: 24,
    marginTop: 38,
  },
  contentBottomSheetContainer: {
    flex: 1,
    alignItems: 'center',
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
    backgroundColor: '#fff',
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
    color: COLORS.bgPrimary,
  },
});

export default TemplateHome;

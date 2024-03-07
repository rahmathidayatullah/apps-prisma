import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
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
import FormPermission from './FormPermission';
import FormCuti from './FormCuti';
import {useNavigation} from '@react-navigation/native';
import FormClockInClockOut from './FormClockInClockOut';
import FormClockInClockOutOvertime from './FormClockInClockOutOvertime';
import moment from 'moment';

const TemplateHome = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const {isShowMenuItem, name, role, timeWork, statusWork} = useSelector(
    (state: stateGlobalHome) => state.home,
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  // variables
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      dispatch(resetValueBottomSheet());
    }
  }, []);

  const handleOnPressMenuItem = (menuItem: string) => {
    dispatch(onPressMenuItem(menuItem));
    bottomSheetModalRef.current?.present();
  };

  useEffect(() => {
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
                    <Text style={styles.titleName}>{name}</Text>
                    <Text style={styles.titleRole}>{role}</Text>
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
                        Today - {moment().format('DD MMMM YYYY')}
                      </Text>
                      <View style={{marginTop: 9}}>
                        <View style={styles.containerBadge}>
                          <View style={styles.containerBgBadge} />
                          <Text style={styles.textBadge}>{statusWork}</Text>
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
                          {timeWork}
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
            </View>
            {atLeastOneTrue && <View style={styles.backdrop} />}
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              <BottomSheetView style={styles.contentBottomSheetContainer}>
                <ScrollView>
                  {isShowMenuItem.cuti && (
                    <FormCuti bottomSheetModalRef={bottomSheetModalRef} />
                  )}
                  {isShowMenuItem.lembur && <Text>Form Lembur</Text>}
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
                  {isShowMenuItem.izin && (
                    <FormPermission bottomSheetModalRef={bottomSheetModalRef} />
                  )}
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
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 100,
    backgroundColor: COLORS.bgPrimary,
  },
  containerBody: {},
  containerHeadTitleImage: {
    marginTop: 19,
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
    paddingLeft: 14,
    paddingRight: 14,
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

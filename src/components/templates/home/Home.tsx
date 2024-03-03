import React, {useCallback, useMemo, useRef, useState} from 'react';
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

// interface MenuItemState {
//   cuti: boolean;
//   lembur: boolean;
//   izin: boolean;
// }

const TemplateHome = () => {
  const [isShowMenuItem, setIsShowMenuItem] = useState<any>({
    cuti: false,
    lembur: false,
    izin: false,
  });

  // start bottomSheet ===========
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsShowMenuItem({
        cuti: false,
        lembur: false,
        izin: false,
      });
    }
  }, []);

  // end bottomSheet ===========

  const onPressMenuItem = (menuItem: string) => {
    setIsShowMenuItem((prevState: any) => ({
      ...Object.fromEntries(
        Object.keys(prevState).map(key => [key, key === menuItem]),
      ),
    }));
    bottomSheetModalRef.current?.present();
  };

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
                    <Text style={styles.titleName}>Rahmat Hidayatullah</Text>
                    <Text style={styles.titleRole}>Karyawan</Text>
                  </View>
                  <ImageProfile />
                </View>

                <ContainerCardClockInOut>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.titleDay}>Today - 26 Januari 2024</Text>
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
                        08:00 - 17:00
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 24,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 14,
                    }}>
                    <CardClockInOut clockIn />
                    <CardClockInOut clockOut />
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
                    onPress={() => onPressMenuItem(item.value)}
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
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              <BottomSheetView style={styles.contentBottomSheetContainer}>
                {isShowMenuItem.cuti && <Text>Form Cuti</Text>}
                {isShowMenuItem.lembur && <Text>Form Lembur</Text>}
                {isShowMenuItem.izin && <Text>Form Izin</Text>}
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
});

export default TemplateHome;

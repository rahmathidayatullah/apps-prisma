import React from 'react';
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

const TemplateHome = () => {
  return (
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
                    style={{color: 'white', fontSize: 12, fontWeight: '600'}}>
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
              <CardMenuItem key={item.id} item={item} />
            ))}
          </View>
          <View style={styles.containerListAttendace}>
            <ListAttendace />
          </View>
          <View style={styles.containerListAttendace}>
            <ListSubmission />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
});

export default TemplateHome;

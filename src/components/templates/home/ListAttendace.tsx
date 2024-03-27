import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {ListItemAttendace} from './ListItemAttendace';
import CButtonText from '../../atoms/button/ButtonText';
import {useNavigation} from '@react-navigation/native';
import {routeMenu} from '../../../contants/routes';
import {COLORS} from '../../../contants';

interface typeListAttendace {
  dataAttendaceMine?: any;
  loading?: boolean;
}

export const ListAttendace = ({
  dataAttendaceMine,
  loading = true,
}: typeListAttendace) => {
  const navigation: any = useNavigation();
  const handleViewAllLogAttendace = () => {
    navigation.navigate(routeMenu.LIST_ATTENDACE_LOG);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTitleList}>
        <Text style={styles.textAttendaceLog}>Riwayat Absensi</Text>
        {dataAttendaceMine.length === 0 || loading ? (
          ''
        ) : (
          <CButtonText onPress={handleViewAllLogAttendace}>
            Selengkapnya
          </CButtonText>
        )}
      </View>

      <View>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: 12,
            }}>
            <ActivityIndicator size="large" color={COLORS.bgPrimary} />
            <Text style={{textAlign: 'center', marginTop: 10}}>
              Load data absensi ..
            </Text>
          </View>
        ) : dataAttendaceMine.length === 0 ? (
          <View style={{marginTop: 20}}>
            <Text>Belum ada data riwayat absensi</Text>
          </View>
        ) : (
          dataAttendaceMine.map((item: any) => (
            <View key={item.id} style={{marginTop: 12}}>
              <ListItemAttendace item={item} />
            </View>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerTitleList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAttendaceLog: {
    fontSize: 16,
    fontWeight: '500',
  },
});

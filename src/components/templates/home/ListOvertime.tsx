import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import CButtonText from '../../atoms/button/ButtonText';
import {useNavigation} from '@react-navigation/native';
import {routeMenu} from '../../../contants/routes';
import {ListItemOvertime} from './ListItemOvertime';
import {COLORS} from '../../../contants';

interface typeListOvertime {
  dataOvertimesMine: any;
  loading?: boolean;
}

export const ListOvertime = ({
  dataOvertimesMine,
  loading = true,
}: typeListOvertime) => {
  const navigation: any = useNavigation();
  const handleViewAllLogAttendace = () => {
    navigation.navigate(routeMenu.LIST_OVERTIME_LOG);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTitleList}>
        <Text style={styles.textAttendaceLog}>Riwayat Lembur</Text>

        {dataOvertimesMine.length === 0 || loading ? (
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
              Load data lembur ..
            </Text>
          </View>
        ) : dataOvertimesMine.length === 0 ? (
          <View style={{marginTop: 20}}>
            <Text>Belum ada data riwayat lembur</Text>
          </View>
        ) : (
          dataOvertimesMine.map((item: any) => (
            <View key={item.id} style={{marginTop: 12}}>
              <ListItemOvertime item={item} />
            </View>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
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

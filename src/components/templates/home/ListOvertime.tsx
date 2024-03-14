import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CButtonText from '../../atoms/button/ButtonText';
import {useNavigation} from '@react-navigation/native';
import {routeMenu} from '../../../contants/routes';
import {ListItemOvertime} from './ListItemOvertime';

export const ListOvertime = () => {
  const navigation: any = useNavigation();
  const handleViewAllLogAttendace = () => {
    navigation.navigate(routeMenu.LIST_OVERTIME_LOG);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTitleList}>
        <Text style={styles.textAttendaceLog}>Riwayat Lembur</Text>
        <CButtonText onPress={handleViewAllLogAttendace}>
          Selengkapnya
        </CButtonText>
      </View>
      <View style={{marginTop: 10}}>
        {[1, 2, 3, 4, 5].map(item => (
          <View key={item} style={{marginTop: 12}}>
            <ListItemOvertime />
          </View>
        ))}
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

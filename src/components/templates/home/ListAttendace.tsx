import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ListItemAttendace} from './ListItemAttendace';
import CButtonText from '../../atoms/button/ButtonText';

export const ListAttendace = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitleList}>
        <Text style={styles.textAttendaceLog}>Attendance Log</Text>
        <CButtonText>View All</CButtonText>
      </View>
      <View style={{marginTop: 10}}>
        {[1, 2, 3, 4, 5].map(item => (
          <View key={item} style={{marginTop: 12}}>
            <ListItemAttendace />
          </View>
        ))}
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

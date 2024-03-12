import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS} from '../../../contants';

export const ListItemOvertime = () => {
  const dataItem = {
    status: 'Work Shift',
    date: '02 Feb',
    clockIn: '08:00',
    clockOut: '17:00',
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>{dataItem.date}</Text>
        <Text>{dataItem.status}</Text>
      </View>
      <Text>{dataItem.clockIn}</Text>
      <Text>{dataItem.clockOut}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgGreyList,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    // box shadow ios
    shadowColor: COLORS.bgBlackShadow,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // box shadow android
    elevation: 2,
  },
});

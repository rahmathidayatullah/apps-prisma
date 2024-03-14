import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS} from '../../../contants';

export const ListItemOvertime = () => {
  const dataItem = {
    startTime: '02 Feb 18:00',
    endTime: '02 Feb 21:00',
    jam: '2 jam',
    status: 'Pending',
  };
  return (
    <View style={styles.container}>
      <Text>{dataItem.startTime}</Text>
      <Text>{dataItem.endTime}</Text>
      <Text>{dataItem.jam}</Text>
      <Text>{dataItem.status}</Text>
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

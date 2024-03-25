import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS} from '../../../contants';

interface typeListItemOvertime {
  item: any;
}

export const ListItemOvertime = ({item}: typeListItemOvertime) => {
  // const dataItem = {
  //   startTime: '02 Feb 18:00',
  //   endTime: '02 Feb 21:00',
  //   jam: '2 jam',
  //   status: 'Pending',
  // };
  return (
    <View
      style={[
        styles.container,
        item.status === 'Reject'
          ? {backgroundColor: COLORS.bgRedList}
          : {backgroundColor: COLORS.bgGreyList},
      ]}>
      <Text style={{color: item.status === 'Reject' ? 'white' : ''}}>
        {item.startTime ?? '- : -'}
      </Text>
      <Text style={{color: item.status === 'Reject' ? 'white' : ''}}>
        {item.endTime ?? '- : -'}
      </Text>
      <Text style={{color: item.status === 'Reject' ? 'white' : ''}}>
        {item.totalTime ?? '-'}
      </Text>
      <Text style={{color: item.status === 'Reject' ? 'white' : ''}}>
        {item.status ?? '-'}
      </Text>
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

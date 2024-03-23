import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS} from '../../../contants';
import moment from 'moment';

interface typeListItemAttendace {
  item: any;
}

export const ListItemAttendace = ({item}: typeListItemAttendace) => {
  const dataItem = {
    status: 'Work Shift',
    date: '02 Feb',
    clockIn: '08:00',
    clockOut: '17:00',
  };
  return (
    <View
      style={[
        styles.container,
        item.status === 'Reject'
          ? {backgroundColor: COLORS.bgRedList}
          : {backgroundColor: COLORS.bgGreyList},
      ]}>
      <View>
        <Text style={{color: item.status === 'Reject' ? 'white' : ''}}>
          {moment(item.date).format('DD MMM')}
        </Text>
        <Text style={{color: item.status === 'Reject' ? 'white' : ''}}>
          {item.status}
        </Text>
      </View>
      <Text style={{color: item.status === 'Reject' ? 'white' : ''}}>
        {item.clockIn ?? '- : -'}
      </Text>
      <Text style={{color: item.status === 'Reject' ? 'white' : ''}}>
        {item.clockOut ?? '- : -'}
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

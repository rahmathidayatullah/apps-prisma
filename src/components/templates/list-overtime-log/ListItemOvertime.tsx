import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS} from '../../../contants';

interface typeListItemOvertime {
  item: {
    startTime: string | null;
    endTime: string | null;
    status: string;
    totalTime?: string;
  };
}

export const ListItemOvertime = ({item}: typeListItemOvertime) => {
  return (
    <View
      style={[
        styles.container,
        item.status === 'Reject'
          ? {backgroundColor: COLORS.bgRedList}
          : item.status === 'Approve'
          ? {backgroundColor: '#219c90'}
          : {backgroundColor: COLORS.bgGreyList},
      ]}>
      <Text
        style={{
          color:
            item.status === 'Reject' || item.status === 'Approve'
              ? 'white'
              : '',
        }}>
        {item.startTime ?? '- : -'}
      </Text>
      <Text
        style={{
          color:
            item.status === 'Reject' || item.status === 'Approve'
              ? 'white'
              : '',
        }}>
        {item.endTime ?? '- : -'}
      </Text>
      <Text
        style={{
          color:
            item.status === 'Reject' || item.status === 'Approve'
              ? 'white'
              : '',
        }}>
        {item.totalTime ?? '-'}
      </Text>
      <Text
        style={{
          color:
            item.status === 'Reject' || item.status === 'Approve'
              ? 'white'
              : '',
        }}>
        {item.status ?? '-'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

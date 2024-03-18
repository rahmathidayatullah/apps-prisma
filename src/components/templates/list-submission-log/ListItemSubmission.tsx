import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS} from '../../../contants';
import moment from 'moment';

interface typeListItemSubmission {
  item: any;
}

export const ListItemSubmission = ({item}: typeListItemSubmission) => {
  // const dataItem = {
  //   status: 'Approve',
  //   date: '01 Feb',
  //   category: 'Izin',
  // };
  return (
    <View style={styles.container}>
      {/* <Text>{dataItem.date}</Text>
      <Text>{dataItem.category}</Text>
      <Text>{dataItem.status}</Text> */}

      <View style={{flexDirection: 'row', gap: 10}}>
        <Text>
          {item.startDate
            ? moment(item.startDate).format('DD MMM YY')
            : '- : -'}
        </Text>
        <Text>-</Text>
        <Text>
          {item.endDate ? moment(item.endDate).format('DD MMM YY') : '- : -'}
        </Text>
      </View>
      <Text>{item.submissionCategory.name}</Text>
      <Text>{item.status || '-'}</Text>
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

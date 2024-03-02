import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ListItemAttendace} from './ListItemAttendace';
import CButtonText from '../../atoms/button/ButtonText';
import {ListItemSubmission} from './ListItemSubmission';

export const ListSubmission = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitleList}>
        <Text style={styles.textAttendaceLog}>List of submission</Text>
        <CButtonText>View All</CButtonText>
      </View>
      <View style={{marginTop: 10}}>
        {[1, 2, 3, 4, 5].map(item => (
          <View key={item} style={{marginTop: 12}}>
            <ListItemSubmission />
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
    // borderWidth: 1,
  },
  textAttendaceLog: {
    fontSize: 16,
    fontWeight: '500',
  },
});

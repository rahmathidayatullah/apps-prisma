import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListItemAttendace} from '../../components/templates/home/ListItemAttendace';

const ListOvertimeLog = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitleList}>
        <Text style={styles.textAttendaceLog}>Attendance Log</Text>
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
  container: {
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 38,
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

export default ListOvertimeLog;

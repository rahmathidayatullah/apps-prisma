import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListItemSubmission} from '../../components/templates/home/ListItemSubmission';

const ListOfSubmission = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitleList}>
        <Text style={styles.textAttendaceLog}>List of submission</Text>
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
  container: {
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 38,
  },
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

export default ListOfSubmission;

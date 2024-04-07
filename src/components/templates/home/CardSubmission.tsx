import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../contants';
import IconSubmission from '../../atoms/svg/submission';

interface typeCardSubmission {
  onPress?: any;
}

const CardSubmission = ({onPress}: typeCardSubmission) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardClockInOut}>
      <View>
        <IconSubmission />
      </View>
      <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
        <Text style={{fontWeight: 'bold', color: 'white'}}>Pengajuan</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardClockInOut: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default CardSubmission;

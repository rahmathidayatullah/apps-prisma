import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../contants';

interface typeButton {
  onPress?: any;
  children: any;
}

const CButtonText = ({onPress, children}: typeButton) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: COLORS.bgPrimary,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default CButtonText;

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../contants';

interface typeButton {
  onPress?: any;
  children: any;
  disabled?: boolean;
}

const CButtonSmall = ({onPress, children, disabled = false}: typeButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.loginBtn}
      disabled={disabled}>
      <Text style={styles.loginText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    width: '60%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgPrimary,
    borderRadius: 8,
    paddingVertical: 12,
  },
  loginText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default CButtonSmall;

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../contants';

interface typeButton {
  onPress?: any;
  children: any;
  disabled?: boolean;
}

const CButton = ({onPress, children, disabled = false}: typeButton) => {
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
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: COLORS.bgPrimary,
    borderRadius: 16,
  },
  loginText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CButton;

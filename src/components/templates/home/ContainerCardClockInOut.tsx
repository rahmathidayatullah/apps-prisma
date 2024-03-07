import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../../contants';

interface typeCOntinerCardClockInOut {
  children: any;
}

const ContainerCardClockInOut = ({children}: typeCOntinerCardClockInOut) => {
  return <View style={styles.containerCardClockInOut}>{children}</View>;
};

const styles = StyleSheet.create({
  containerCardClockInOut: {
    backgroundColor: COLORS.bgSecondary,
    borderRadius: 16,
    padding: 12,
    position: 'absolute',
    width: '98%',
    bottom: '-60%',
    left: '4.5%',
    // box shadow
    shadowColor: COLORS.bgBlackShadow,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // box shadow android
    elevation: 4,
  },
});

export default ContainerCardClockInOut;

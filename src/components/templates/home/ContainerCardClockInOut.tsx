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
    bottom: '-50%',
    left: '4.5%',
  },
});

export default ContainerCardClockInOut;

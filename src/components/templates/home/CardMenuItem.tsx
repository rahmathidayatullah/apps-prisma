import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../contants';
import {MenuItem} from './inteface';

interface typeCardMenuItem {
  item: MenuItem;
}

const CardMenuItem = ({item}: typeCardMenuItem) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerBgTransparent}></View>
      <View style={styles.containerIconText}>
        {item.icon}
        <Text style={styles.font}>{item.label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    padding: 10,
    borderRadius: 8,
    width: 75,
  },
  containerBgTransparent: {
    backgroundColor: COLORS.bgOrangeOpacity,
    opacity: 0.08,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  containerIconText: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  font: {
    marginTop: 4,
    color: COLORS.bgGrey,
    fontWeight: '600',
  },
});

export default CardMenuItem;

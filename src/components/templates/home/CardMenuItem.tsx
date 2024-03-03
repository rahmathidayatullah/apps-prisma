import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../contants';
import {MenuItem} from './inteface';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface typeCardMenuItem {
  item: MenuItem;
  onPress?: any;
}

const CardMenuItem = ({item, onPress}: typeCardMenuItem) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.containerBgTransparent}></View>
      <View style={styles.containerIconText}>
        {item.icon}
        <Text style={styles.font}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
    borderRadius: 8,
    // box shadow ios
    shadowColor: COLORS.bgBlackShadow,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    // box shadow android
    elevation: 2,
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

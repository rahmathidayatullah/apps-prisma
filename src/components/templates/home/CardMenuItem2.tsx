import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../contants';
import {MenuItem} from './inteface';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface typeCardMenuItem {
  item: MenuItem;
  onPress?: any;
}

const CardMenuItem2 = ({item, onPress}: typeCardMenuItem) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* <View style={styles.containerBgTransparent}></View> */}
      <View style={styles.containerIconText}>
        <View style={styles.containerIcon}>{item.icon}</View>
        <Text style={styles.font}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    borderRadius: 8,
    width: 90,
    // borderWidth: 1,
    // borderColor: COLORS.bgPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  containerIcon: {
    borderWidth: 1,
    borderColor: COLORS.bgPrimary,
    borderRadius: 8,
    // paddingVertical: 12,
    // paddingHorizontal: 12,
    width: 60,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerIconText: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // width: 100,
  },
  font: {
    marginTop: 4,
    color: COLORS.bgGrey,
    fontWeight: '400',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default CardMenuItem2;

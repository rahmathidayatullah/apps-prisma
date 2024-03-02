import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../contants/colors';

const Badge = () => {
  return (
    <View style={styles.containerBadge}>
      <View style={styles.containerBgBadge} />
      <Text style={styles.textBadge}>PT. Prisma Properties</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBadge: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 16,
    padding: 10,
    alignSelf: 'flex-start',
  },
  containerBgBadge: {
    backgroundColor: colors.bgOrangeOpacity,
    opacity: 0.28,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  textBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});

export default Badge;

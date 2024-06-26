import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../contants/colors';

const Badge2 = ({children, style}: {children: any; style?: any}) => {
  return (
    <View style={styles.containerBadge}>
      <View
        style={StyleSheet.flatten([
          styles.containerBgBadge,
          style?.containerBgBadge,
        ])}
      />
      <Text style={StyleSheet.flatten([styles.textBadge, style?.textBadge])}>
        {children}
      </Text>
    </View>
  );
};

// sample use

{
  /* <Badge2
                        style={{
                          containerBgBadge: {
                            backgroundColor: '#F6F6F6',
                          },
                          textBadge: {
                            color: '#000000',
                          },
                        }}>
                        {item?.statusBooking?.category ?? '-'}
                      </Badge2> */
}

const styles = StyleSheet.create({
  containerBadge: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  containerBgBadge: {
    backgroundColor: '#219C90',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  textBadge: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});

export default Badge2;

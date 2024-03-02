import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {COLORS} from '../../../contants';

interface typeCardClockInOut {
  clockIn?: boolean;
  clockOut?: boolean;
}

const CardClockInOut = ({clockIn, clockOut}: typeCardClockInOut) => {
  return (
    <View style={styles.cardClockInOut}>
      <View style={{transform: clockOut ? [{rotateY: '180deg'}] : ''}}>
        <IconSimpleLineIcons name="login" size={28} color={COLORS.bgPrimary} />
      </View>
      <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
        <Text style={{fontWeight: 'bold'}}>
          {clockIn ? 'Clock In' : 'Clock Out'}
        </Text>
        <View style={{marginTop: 4}}>
          <View style={styles.containerBadge}>
            <View style={styles.containerBgBadge} />
            <Text style={styles.textBadge}>{clockIn ? '08:00' : '17:00'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardClockInOut: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  containerBadge: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 4,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    alignSelf: 'flex-start',
  },
  containerBgBadge: {
    backgroundColor: COLORS.bgOrangeOpacity,
    opacity: 0.08,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  textBadge: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.bgOrangeOpacity,
  },
});

export default CardClockInOut;

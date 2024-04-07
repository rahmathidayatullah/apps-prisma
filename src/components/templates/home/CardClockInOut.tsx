import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../contants';
import {useSelector} from 'react-redux';
import {stateGlobalProfile} from '../../../redux/features/profile/interface';
import IconClockIn from '../../atoms/svg/clockIn';
import IconClockOut from '../../atoms/svg/clockOut';

interface typeCardClockInOut {
  clockIn?: boolean;
  clockOut?: boolean;
  onPress?: any;
}

const CardClockInOut = ({clockIn, clockOut, onPress}: typeCardClockInOut) => {
  const profile = useSelector((state: stateGlobalProfile) => state.profile);
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardClockInOut}>
      <View>{clockIn ? <IconClockOut /> : <IconClockIn />}</View>
      <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
        <Text style={{fontWeight: 'bold', color: 'white'}}>
          {clockIn ? 'Absen Masuk' : 'Absen Keluar'}
        </Text>
        <View>
          <View style={styles.containerBadge}>
            <Text style={styles.textBadge}>
              {clockIn
                ? profile.profile.clockIn
                  ? profile.profile.clockIn
                  : '- : -'
                : profile.profile.clockOut
                ? profile.profile.clockOut
                : '- : -'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardClockInOut: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  containerBadge: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 4,
    paddingTop: 3,
    paddingBottom: 3,
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
    fontSize: 11,
    fontWeight: '500',
    color: 'white',
  },
});

export default CardClockInOut;

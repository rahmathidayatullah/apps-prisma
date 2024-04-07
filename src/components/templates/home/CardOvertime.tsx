import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../contants';
import IconOvertime from '../../atoms/svg/overtime';
import {stateGlobalProfile} from '../../../redux/features/profile/interface';
import {useSelector} from 'react-redux';
import moment from 'moment';

interface typeCardSubmission {
  onPress?: any;
}

const CardOvertime = ({onPress}: typeCardSubmission) => {
  const profile = useSelector((state: stateGlobalProfile) => state.profile);
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardClockInOut}>
      <View>
        <IconOvertime />
      </View>
      <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
        <Text style={{fontWeight: 'bold', color: 'white'}}>Absen Lembur</Text>
        <View>
          <View style={styles.containerBadge}>
            <Text style={styles.textBadge}>
              {profile.profile.overtime.clockIn
                ? moment(
                    profile.profile.overtime.clockIn,
                    'DD-MM-YYYY hh:mm:ss',
                  ).format('hh:mm')
                : '-:-'}
            </Text>
            <Text style={styles.textBadge}>-</Text>
            <Text style={styles.textBadge}>
              {profile.profile.overtime.clockOut
                ? moment(
                    profile.profile.overtime.clockOut,
                    'DD-MM-YYYY hh:mm:ss',
                  ).format('hh:mm')
                : '-:-'}
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
    flexDirection: 'row',
    gap: 6,
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

export default CardOvertime;

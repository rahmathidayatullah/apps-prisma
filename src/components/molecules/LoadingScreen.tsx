import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {COLORS} from '../../contants';

const LoadingScreen = ({loading}: {loading: boolean}) => {
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#000000',
          opacity: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={COLORS.bgPrimary} />
      </View>
    );
  }
  return '';
};

export default LoadingScreen;

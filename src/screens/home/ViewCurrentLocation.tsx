import React, {useEffect, useState} from 'react';
import {Alert, Button, Linking, StyleSheet, Text, View} from 'react-native';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
import CButtonText from '../../components/atoms/button/ButtonText';

const ViewCurrentLocation = () => {
  const [position, setPosition] = useState<any>(null);
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos: any) => {
        const {latitude, longitude} = pos.coords;
        setPosition(JSON.stringify(pos));
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error: any) =>
        Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        {!latitude && !longitude && 'Loading get current location ..'}
      </Text>

      {latitude && longitude && (
        <View>
          <Text>Latitude : {latitude}</Text>
          <Text>Longitude : {longitude}</Text>
        </View>
      )}
      {/* <Text>{position}</Text> */}
      {/* <Button title="Get Current Position" onPress={getCurrentPosition} /> */}
      {latitude && longitude && (
        <View style={{marginTop: 10}}>
          <CButtonText onPress={openMaps}>Open Map</CButtonText>
        </View>
      )}
      {/* <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 38,
  },
  containerTitleList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAttendaceLog: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ViewCurrentLocation;

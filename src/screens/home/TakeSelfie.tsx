import React, {useEffect} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
// import {launchCamera} from 'react-native-image-picker';
// import CButtonText from '../../components/atoms/button/ButtonText';

const TakeSelfie = () => {
  // const OpenCameraLib = async () => {
  //   const options: any = {
  //     mediaType: 'photo',
  //     maxWidth: 500,
  //     maxHeight: 500,
  //     quality: 1,
  //     saveToPhotos: true,
  //   };

  //   console.log('PRESS ============>>>>>>>>>> ');

  //   try {
  //     const res = await launchCamera(options);
  //     console.log('RESULT ============>>>>>>>>>> ', res);
  //   } catch (error) {
  //     console.log('ERROR ============>>>>>>>>>> ', error);
  //   }
  // };

  const {hasPermission, requestPermission} = useCameraPermission();
  console.log('================>>>>> hasPermission', hasPermission);

  const device = useCameraDevice('front', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  console.log('================>>>>> device', device);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (device == null)
    return (
      <View>
        <Text>No Camera </Text>
      </View>
    );

  return (
    // <View>
    //   <Text>TakeSelfie</Text>
    //   <CButtonText onPress={OpenCameraLib}>Open Camera</CButtonText>
    // </View>
    <View style={{flex: 1}}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        orientation="portrait"
        photo={true}
        enableZoomGesture={false}
      />
    </View>
  );
};

export default TakeSelfie;

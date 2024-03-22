import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CButtonText from '../../components/atoms/button/ButtonText';

// import {launchCamera} from 'react-native-image-picker';
// import CButtonText from '../../components/atoms/button/ButtonText';

const TakeSelfie = () => {
  const [image, setImage] = useState(
    'https://media.istockphoto.com/id/1222457390/id/foto/bisnis-kecil-owener-stok-foto.jpg?s=2048x2048&w=is&k=20&c=SgzYtSSanXbJ9CLJQifiGfqNaGCKgS4FTCeE6TxdZHs=',
  );

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: true,
    }).then((image: any) => {
      setImage(image.path);
    });
  };
  return (
    <View style={styles.containerImageProfile}>
      <Image
        style={styles.imageProfile}
        source={{
          uri: image,
        }}
        resizeMode="cover"
      />
      <CButtonText onPress={openCamera}>Open camera</CButtonText>
    </View>
  );
};

const styles = StyleSheet.create({
  containerImageProfile: {
    height: 200,
    width: 200,
    overflow: 'hidden',
    // borderRadius: 100,
  },
  imageProfile: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0553',
  },
});

export default TakeSelfie;

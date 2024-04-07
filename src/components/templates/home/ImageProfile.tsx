import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {stateGlobalProfile} from '../../../redux/features/profile/interface';

const ImageProfile = () => {
  const profile = useSelector((state: stateGlobalProfile) => state.profile);
  return (
    <View style={styles.containerImageProfile}>
      <Image
        style={styles.imageProfile}
        source={{
          uri: profile.profile.user.photo,
        }}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerImageProfile: {
    height: 60,
    width: 60,
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
  imageProfile: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0553',
  },
});

export default ImageProfile;

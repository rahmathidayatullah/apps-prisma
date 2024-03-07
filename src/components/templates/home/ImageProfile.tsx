import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {stateGlobalHome} from '../../../redux/features/home/interface';
import {useSelector} from 'react-redux';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const ImageProfile = () => {
  const {imageProfile} = useSelector((state: stateGlobalHome) => state.home);
  return (
    <View style={styles.containerImageProfile}>
      <Image
        style={styles.imageProfile}
        source={{
          uri: imageProfile,
        }}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerImageProfile: {
    height: 70,
    width: 70,
    overflow: 'hidden',
    borderRadius: 100,
  },
  imageProfile: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0553',
  },
});

export default ImageProfile;

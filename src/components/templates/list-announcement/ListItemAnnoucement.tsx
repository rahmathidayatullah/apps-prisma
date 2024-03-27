import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../contants';

interface typeOfListItemAnnoucement {
  item: any;
  onPress?: any;
}
const ListItemAnnoucement = ({item, onPress}: typeOfListItemAnnoucement) => {
  return (
    <TouchableOpacity style={styles.wrapItemAnnouncement} onPress={onPress}>
      <View style={styles.containerImgAnnouncement}>
        {/* <Image style={styles.imgAnnouncement} source={item.img} /> */}
        <Image
          style={styles.imgAnnouncement}
          source={{
            uri: item.image1,
          }}
        />
      </View>
      <View style={styles.containerTextItemAnnouncement}>
        <Text style={{fontSize: 13, fontWeight: '600'}}>{item.title1}</Text>
        <Text style={{fontSize: 11}}>{item.description1}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapItemAnnouncement: {
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: COLORS.bgGreyList,
  },
  containerImgAnnouncement: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 80,
    width: 120,
    // borderWidth: 1,
    // borderColor: '#000000',
  },
  imgAnnouncement: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  containerTextItemAnnouncement: {
    flexDirection: 'column',
    flex: 1,
    gap: 2,
  },
});

export default ListItemAnnoucement;

import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CButtonText from '../../atoms/button/ButtonText';
// import {listAnnouncement, routeMenu} from '../../../contants/routes';
import {routeMenu} from '../../../contants/routes';
import {COLORS} from '../../../contants';
import {useNavigation} from '@react-navigation/native';

interface typeListAnnouncement {
  dataAnnouncement: any;
  loading?: boolean;
}

const ListAnnoucement = ({dataAnnouncement, loading}: typeListAnnouncement) => {
  const navigation: any = useNavigation();

  const handleDetail = (item: any) => {
    navigation.navigate(routeMenu.DETAIL_ANNOUCEMENT, {
      itemId: item.id,
    });
  };
  return (
    <View style={styles.containerAnnouncement}>
      <View style={styles.wrapTitleAnnouncement}>
        <Text style={styles.wrapTitle}>Pengumuman</Text>
        {dataAnnouncement.length === 0 || loading ? (
          ''
        ) : (
          <CButtonText
            onPress={() => navigation.navigate(routeMenu.LIST_OF_ANNOUCEMENT)}>
            Selengkapnya
          </CButtonText>
        )}
      </View>

      <View>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: 12,
            }}>
            <ActivityIndicator size="large" color={COLORS.bgPrimary} />
            <Text
              style={{textAlign: 'center', marginTop: 10, paddingBottom: 20}}>
              Load data pengumuman ..
            </Text>
          </View>
        ) : dataAnnouncement.length === 0 ? (
          <View style={{marginTop: 20}}>
            <Text>Belum ada data pengumuman</Text>
          </View>
        ) : (
          <View style={styles.wrapListItemAnnouncement}>
            {dataAnnouncement.map((item: any) => {
              return (
                <TouchableOpacity
                  style={styles.wrapItemAnnouncement}
                  key={item.id}
                  onPress={() => handleDetail(item)}>
                  <View style={styles.containerImgAnnouncement}>
                    <Image
                      style={styles.imgAnnouncement}
                      // source={item.image1}
                      source={{uri: item.image1}}
                    />
                  </View>
                  <View style={styles.containerTextItemAnnouncement}>
                    <Text style={{fontSize: 13, fontWeight: '600'}}>
                      {item.title1}
                    </Text>
                    <Text
                      numberOfLines={3}
                      ellipsizeMode="tail"
                      style={{fontSize: 11}}>
                      {item.description1}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // announcement
  containerAnnouncement: {
    paddingHorizontal: 12,
    // marginTop: 10,
  },
  wrapTitleAnnouncement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  wrapListItemAnnouncement: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 10,
  },
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

export default ListAnnoucement;

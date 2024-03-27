import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {listAnnouncement} from '../../contants/routes';
import {COLORS} from '../../contants';
import {useDispatch, useSelector} from 'react-redux';
import {getAnnoucementDetail} from '../../redux/features/announcement/actions';

const DetailAnnoucement = ({route}: any) => {
  const dispatch: any = useDispatch();
  const {itemId} = route.params;

  const announcement = useSelector((state: any) => state.announcement);
  const {dataDetail, statusDetail} = announcement;

  // const [loading, setLoading] = useState<boolean>(false);

  // const [dataDetail, setDataDetail] = useState<any>({
  //   id: '1',
  //   title: 'Open Blok The Arthera Hill Extension Tahap 4',
  //   description:
  //     'The Arthera Hill Tahap 4, dibuka penjualan saat berita ini diterbitkan, Senin 17 Maret 2024 dengan rincian...',
  //   img: require('../../assets/images/img-1.png'),
  // });

  // useEffect(() => {
  //   setLoading(true);
  //   const newData = listAnnouncement.filter(
  //     (item: any) => item.id === itemId,
  //   )[0];
  //   setDataDetail(newData);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, [route]);

  const [refresh, setRefresh] = useState(false);
  const pullMe = () => {
    dispatch(getAnnoucementDetail(itemId));
  };

  useEffect(() => {
    dispatch(getAnnoucementDetail(itemId));
  }, [itemId]);

  useEffect(() => {
    if (statusDetail === 'success') {
      setRefresh(false);
    }
  }, [statusDetail]);

  if (statusDetail === 'process') {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.bgPrimary} />
      </View>
    );
  }
  if (statusDetail === 'error') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Text style={{textAlign: 'center'}}>Terjadi Kesalahan</Text>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullMe} />
      }>
      <View style={styles.container}>
        <View style={styles.containerImage}>
          {/* <Image style={styles.img} source={dataDetail.image1} /> */}
          <Image
            style={styles.img}
            source={{
              uri: dataDetail.image1,
            }}
          />
        </View>
        <View style={{paddingHorizontal: 12}}>
          <View style={{marginTop: 20}}>
            <Text style={styles.title}>{dataDetail.title1}</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.description}>{dataDetail.description1}</Text>
            {/* <Text style={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              quo, mollitia quibusdam ipsam, modi doloribus pariatur, officia
              fuga nesciunt voluptatem inventore? Molestiae, reprehenderit
              expedita soluta beatae animi accusamus dolorum inventore?
            </Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              quo, mollitia quibusdam ipsam, modi doloribus pariatur, officia
              fuga nesciunt voluptatem inventore? Molestiae, reprehenderit
              expedita soluta beatae animi accusamus dolorum inventore?
            </Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              quo, mollitia quibusdam ipsam, modi doloribus pariatur, officia
              fuga nesciunt voluptatem inventore? Molestiae, reprehenderit
              expedita soluta beatae animi accusamus dolorum inventore?
            </Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              quo, mollitia quibusdam ipsam, modi doloribus pariatur, officia
              fuga nesciunt voluptatem inventore? Molestiae, reprehenderit
              expedita soluta beatae animi accusamus dolorum inventore?
            </Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              quo, mollitia quibusdam ipsam, modi doloribus pariatur, officia
              fuga nesciunt voluptatem inventore? Molestiae, reprehenderit
              expedita soluta beatae animi accusamus dolorum inventore?
            </Text> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerImage: {
    width: '100%',
    height: 200,
    // marginTop: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'justify',
  },
});

export default DetailAnnoucement;

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {listAnnouncement} from '../../contants/routes';
import {COLORS} from '../../contants';

const DetailAnnoucement = ({route}: any) => {
  const {itemId} = route.params;
  const [loading, setLoading] = useState<boolean>(false);

  const [dataDetail, setDataDetail] = useState<any>({
    id: '1',
    title: 'Open Blok The Arthera Hill Extension Tahap 4',
    description:
      'The Arthera Hill Tahap 4, dibuka penjualan saat berita ini diterbitkan, Senin 17 Maret 2024 dengan rincian...',
    img: require('../../assets/images/img-1.png'),
  });

  useEffect(() => {
    setLoading(true);
    const newData = listAnnouncement.filter(
      (item: any) => item.id === itemId,
    )[0];
    setDataDetail(newData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [route]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.bgPrimary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <Image style={styles.img} source={dataDetail.img} />
        </View>
        <View style={{paddingHorizontal: 12}}>
          <View style={{marginTop: 20}}>
            <Text style={styles.title}>{dataDetail.title}</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.description}>{dataDetail.description}</Text>
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
            </Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              quo, mollitia quibusdam ipsam, modi doloribus pariatur, officia
              fuga nesciunt voluptatem inventore? Molestiae, reprehenderit
              expedita soluta beatae animi accusamus dolorum inventore?
            </Text>
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

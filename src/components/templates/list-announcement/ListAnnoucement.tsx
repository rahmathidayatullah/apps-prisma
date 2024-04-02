import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
// import CButtonText from '../../atoms/button/ButtonText';
import {listAnnouncement, routeMenu} from '../../../contants/routes';
import ListItemAnnoucement from './ListItemAnnoucement';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getListAnnoucement} from '../../../redux/features/announcement/actions';

const TemplateListAnnoucement = () => {
  const announcement = useSelector((state: any) => state.announcement);
  const {page, take, order, statusList, dataList} = announcement;

  console.log('dataList annoucement', announcement);

  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();

  // onPress={() =>
  //   navigation.push('Details', {
  //     itemId: Math.floor(Math.random() * 100),
  //   })
  // }

  const handleDetail = (item: any) => {
    navigation.navigate(routeMenu.DETAIL_ANNOUCEMENT, {
      itemId: item.id,
    });
  };

  useEffect(() => {
    dispatch(getListAnnoucement());
  }, [page, take, order]);

  useEffect(() => {
    if (statusList === 'success') {
      setRefresh(false);
    }
  }, [statusList]);

  if (statusList === 'error') {
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

  const [refresh, setRefresh] = useState(false);
  const pullMe = () => {
    dispatch(getListAnnoucement());
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullMe} />
      }>
      <View style={styles.containerAnnouncement}>
        {dataList.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              width: '100%',
              height: '100%',
              marginTop: 40,
            }}>
            <Text style={{textAlign: 'center'}}>Data kosong</Text>
          </View>
        ) : (
          <View style={styles.wrapListItemAnnouncement}>
            {dataList.map((item: any) => {
              return (
                <ListItemAnnoucement
                  key={item.id}
                  item={item}
                  onPress={() => handleDetail(item)}
                />
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerAnnouncement: {
    paddingHorizontal: 12,
  },
  wrapListItemAnnouncement: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 10,
  },
});
export default TemplateListAnnoucement;

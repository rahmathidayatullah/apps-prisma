import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
// import CButtonText from '../../atoms/button/ButtonText';
import {listAnnouncement, routeMenu} from '../../../contants/routes';
import ListItemAnnoucement from './ListItemAnnoucement';
import {useNavigation} from '@react-navigation/native';

const TemplateListAnnoucement = () => {
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
  return (
    <ScrollView>
      <View style={styles.containerAnnouncement}>
        <View style={styles.wrapListItemAnnouncement}>
          {listAnnouncement.map((item: any) => {
            return (
              <ListItemAnnoucement
                key={item.id}
                item={item}
                onPress={() => handleDetail(item)}
              />
            );
          })}
        </View>
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

import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
// import CButtonText from '../../atoms/button/ButtonText';
import {listAnnouncement} from '../../../contants/routes';
import ListItemAnnoucement from './ListItemAnnoucement';

const TemplateListAnnoucement = () => {
  return (
    <ScrollView>
      <View style={styles.containerAnnouncement}>
        <View style={styles.wrapListItemAnnouncement}>
          {listAnnouncement.map((item: any) => {
            return <ListItemAnnoucement key={item.id} item={item} />;
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

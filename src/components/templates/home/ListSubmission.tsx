import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import CButtonText from '../../atoms/button/ButtonText';
import {ListItemSubmission} from './ListItemSubmission';
import {useNavigation} from '@react-navigation/native';
import {routeMenu} from '../../../contants/routes';
import {COLORS} from '../../../contants';

interface typeListSubmission {
  datSubmissionsMine: any;
  loading?: boolean;
}

export const ListSubmission = ({
  datSubmissionsMine,
  loading = true,
}: typeListSubmission) => {
  const navigation: any = useNavigation();
  const handleViewAllLogAttendace = () => {
    navigation.navigate(routeMenu.LIST_OF_SUBMISSION);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTitleList}>
        <Text style={styles.textAttendaceLog}>Riwayat Pengajuan</Text>
        {datSubmissionsMine.length === 0 || loading ? (
          ''
        ) : (
          <CButtonText onPress={handleViewAllLogAttendace}>
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
            <Text style={{textAlign: 'center', marginTop: 10}}>
              Load data pengajuan ..
            </Text>
          </View>
        ) : (
          <View>
            {datSubmissionsMine.length === 0 ? (
              <View style={{marginTop: 20}}>
                <Text>Belum ada data riwayat pengajuan</Text>
              </View>
            ) : (
              datSubmissionsMine.map((item: any) => (
                <View key={item.id} style={{marginTop: 12}}>
                  <ListItemSubmission item={item} />
                </View>
              ))
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerTitleList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
  },
  textAttendaceLog: {
    fontSize: 16,
    fontWeight: '500',
  },
});

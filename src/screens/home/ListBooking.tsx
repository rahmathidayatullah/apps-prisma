import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBookingMine} from '../../redux/features/booking/actions';
import {COLORS} from '../../contants';
import Badge from '../../components/atoms/badge/Badge';
import Badge2 from '../../components/atoms/badge/Badge2';
import {routeMenu} from '../../contants/routes';
import {useNavigation} from '@react-navigation/native';

const ListBooking = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const booking = useSelector((state: any) => state.booking);
  const {statusListBookingMine, errorListBooking, bookingListMine} = booking;

  const [refresh, setRefresh] = useState(false);
  const pullMe = () => {
    dispatch(fetchBookingMine());
  };

  useEffect(() => {
    if (statusListBookingMine === 'success') {
      setRefresh(false);
    }
  }, [statusListBookingMine]);

  useEffect(() => {
    dispatch(fetchBookingMine());
  }, [dispatch]);

  if (statusListBookingMine === 'process') {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.bgPrimary} />
      </SafeAreaView>
    );
  }

  if (statusListBookingMine === 'error') {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Text>Terjadi kesalahan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 10}}>
        {bookingListMine?.length ? (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={pullMe} />
            }
            data={bookingListMine}
            keyExtractor={(item, idx) => item.id + idx}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: 'white',
                    flex: 1,
                    borderRadius: 8,
                    padding: 10,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      paddingBottom: 14,
                      borderColor: '#F0F0F0',
                    }}>
                    <View>
                      <Text style={{fontWeight: '600', fontSize: 16}}>
                        {item?.unit?.block?.project?.project_name ?? '-'}
                      </Text>
                      <Text style={{fontWeight: '500', marginTop: 6}}>
                        {item?.consument?.name ?? '-'}
                      </Text>
                    </View>

                    <Text style={{color: '#219C90', fontWeight: '500'}}>
                      {item?.statusBooking?.name ?? '-'}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <View style={styles.header}>
                      <Text style={styles.heading}>Tahap</Text>
                      <Text style={styles.heading}>Blok</Text>
                      <Text style={styles.heading}>No</Text>
                      <Text style={styles.headingLast}>Berkas</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.cell}>
                        {item?.unit?.phase?.name ?? '-'}
                      </Text>
                      <Text style={styles.cell}>
                        {item?.unit?.block?.name ?? '-'}
                      </Text>
                      <Text style={styles.cell}>
                        {item?.unit?.number ?? '-'}
                      </Text>
                      <Text style={styles.cellLast}>
                        {item?.statusBerkas?.name ?? '-'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 10,
                      borderTopWidth: 1,
                      borderColor: '#F0F0F0',
                      paddingTop: 15,
                      paddingBottom: 6,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(routeMenu.BOOKING_FORM, {
                          bookingId: item.id,
                        })
                      }
                      activeOpacity={0.7}
                      style={{
                        backgroundColor: COLORS.bgPrimary,
                        borderRadius: 4,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 14,
                          fontWeight: '600',
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(routeMenu.DETAIL_BOOKING, {
                          bookingId: item.id,
                        });
                      }}
                      activeOpacity={0.7}
                      style={{
                        backgroundColor: COLORS.bgPrimary,
                        borderRadius: 4,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 14,
                          fontWeight: '600',
                        }}>
                        Detail
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text>Tidak ada data</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //   table
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    flex: 1,
    fontWeight: '500',
  },
  headingLast: {
    flex: 1,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 14,
    marginHorizontal: 2,
    borderRadius: 3,
  },
  cell: {
    textAlign: 'left',
    flex: 1,
  },
  cellLast: {
    textAlign: 'right',
    flex: 1,
  },
});

export default ListBooking;

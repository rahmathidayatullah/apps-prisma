import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../../contants';

const RiwayatStatus = ({bookingDetail}: any) => {
  return (
    <View style={{padding: 20}}>
      <Text style={{fontWeight: '600', marginBottom: 16}}>Riwayat Status</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 10,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 100,
              borderColor: 'green',
              borderWidth: 1,
              backgroundColor: 'white',
            }}></View>
          <View style={{height: 30, backgroundColor: 'grey', width: 1}}></View>
        </View>
        <View
          style={{
            display: 'flex',
            gap: 10,
            flexDirection: 'row',
            // alignItems: 'baseline',
          }}>
          <Text>Review Admin - 24/02/2024</Text>
          <TouchableOpacity
            // onPress={() => {
            //   navigation.navigate(routeMenu.DETAIL_BOOKING, {
            //     bookingId: item.id,
            //   });
            // }}
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 10,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 100,
              borderColor: 'green',
              borderWidth: 1,
              backgroundColor: 'white',
            }}></View>
          <View style={{height: 18, backgroundColor: 'grey', width: 1}}></View>
        </View>
        <Text>Review Admin - 24/02/2024</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 10,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 100,
              borderColor: 'green',
              borderWidth: 1,
              backgroundColor: 'white',
            }}></View>
          <View style={{height: 18, backgroundColor: 'grey', width: 1}}></View>
        </View>
        <Text>Review Admin - 24/02/2024</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 10,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 100,
              borderColor: 'green',
              borderWidth: 1,
              backgroundColor: 'white',
            }}></View>
          {/* <View style={{height: 18, backgroundColor: 'grey', width: 1}}></View> */}
        </View>
        <Text>Review Admin - 24/02/2024</Text>
      </View>
    </View>
  );
};

export default RiwayatStatus;

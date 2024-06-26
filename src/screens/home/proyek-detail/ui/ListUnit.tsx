import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../../contants';

const ListUnit = ({
  statusListUnitProject,
  listUnitProject,
  setIsModal,
  setUnitSelect,
}: any) => {
  return (
    <View>
      {statusListUnitProject === 'process' ? (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <ActivityIndicator size="large" color={COLORS.bgPrimary} />
        </View>
      ) : listUnitProject?.length ? (
        <FlatList
          data={listUnitProject}
          keyExtractor={(item, idx) => item.id + idx}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  marginTop: 10,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'baseline',
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  flex: 1,
                  borderRadius: 8,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                  paddingBottom: 20,
                  borderColor: '#F0F0F0',
                  //   borderWidth: 2,
                  borderBottomWidth: 1,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{minWidth: 100}}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>
                      Status
                    </Text>
                  </View>
                  <Text style={{marginTop: 6}}>
                    :&nbsp;&nbsp;&nbsp;&nbsp;
                    {item?.status ?? '-'}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{minWidth: 100}}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>Tahap</Text>
                  </View>
                  <Text style={{marginTop: 6}}>
                    :&nbsp;&nbsp;&nbsp;&nbsp;
                    {item?.phase?.name ?? '-'}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{minWidth: 100}}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>Blok</Text>
                  </View>
                  <Text style={{marginTop: 6}}>
                    :&nbsp;&nbsp;&nbsp;&nbsp;
                    {item?.block?.name ?? '-'}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{minWidth: 100}}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>
                      No Unit
                    </Text>
                  </View>
                  <Text style={{marginTop: 6}}>
                    :&nbsp;&nbsp;&nbsp;&nbsp;
                    {item?.number ?? '-'}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModal(true);
                      setUnitSelect(item);
                    }}
                    activeOpacity={0.7}
                    style={{
                      backgroundColor: COLORS.bgPrimary,
                      borderRadius: 4,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      marginTop: 10,
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
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text>Tidak ada data</Text>
        </View>
      )}
    </View>
  );
};

export default ListUnit;

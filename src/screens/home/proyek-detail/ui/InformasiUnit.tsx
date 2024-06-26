import React from 'react';
import {View, Image, ScrollView, Text} from 'react-native';
const InformasiUnit = ({detailProject}: any) => {
  return (
    <View>
      <View
        style={{
          marginHorizontal: 20,
          paddingTop: 20,
          borderBottomWidth: 0.3,
          paddingVertical: 20,
        }}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>Informasi Project</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View>
            <Text>Nama Project</Text>
          </View>
          <Text>: {detailProject?.project_name ?? '-'}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
          }}>
          <View>
            <Text>Nama Pemilik</Text>
          </View>
          <Text>: {detailProject?.company?.name ?? '-'}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
          }}>
          <View>
            <Text>Alamat</Text>
          </View>
          <Text>: {detailProject?.address ?? '-'}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
          }}>
          <View>
            <Text>Luas Lahan</Text>
          </View>
          <Text>
            :&nbsp;
            {detailProject?.land_area ? `${detailProject?.land_area} ㎡` : '-'}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
          }}>
          <View>
            <Text>Luas Bangunan</Text>
          </View>
          <Text>
            :{' '}
            {detailProject?.building_area
              ? `${detailProject?.building_area} ㎡`
              : '-'}
          </Text>
        </View>
      </View>
      <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          Informasi Foto Project
        </Text>
        <View style={{marginTop: 12}}>
          <Text>Logo</Text>
          <View style={{marginTop: 10}}>
            <View
              style={{
                borderColor: '#F0F0F0',
                borderWidth: 1,
                borderRadius: 4,
                display: 'flex',
                width: 110,
                height: 110,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: detailProject?.project_image}}
                width={100}
                height={100}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{padding: 20}}>
        <View>
          <Text>Detail</Text>
          <View style={{marginTop: 10}}>
            <ScrollView horizontal>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                }}>
                {detailProject?.detail_image?.length
                  ? detailProject?.detail_image.map((item: any) => {
                      return (
                        <View
                          style={{
                            borderColor: '#F0F0F0',
                            borderWidth: 2,
                            borderRadius: 4,
                            display: 'flex',
                            width: 110,
                            height: 110,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            source={{uri: item}}
                            width={100}
                            height={100}
                          />
                        </View>
                      );
                    })
                  : ''}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InformasiUnit;

import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../../contants';
import moment from 'moment';

const RiwayatStatus = ({bookingDetail}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReason, setModalReason] = useState('');

  return (
    <View style={{padding: 20}}>
      <Text style={{fontWeight: '600', marginBottom: 16}}>Riwayat Status</Text>
      {bookingDetail?.history?.length ? (
        bookingDetail.history.map((item: any, index: any) => {
          const isLastIndex = index === bookingDetail?.history.length - 1;
          return (
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
                {isLastIndex ? (
                  ''
                ) : (
                  <View
                    style={{
                      height:
                        item?.status?.name === 'Cancel' ||
                        item?.status?.name === 'Reject Admin' ||
                        item?.status?.name === 'Reject BTN'
                          ? 30
                          : 18,
                      backgroundColor: 'grey',
                      width: 1,
                    }}></View>
                )}
              </View>
              <View
                style={{
                  display: 'flex',
                  gap: 10,
                  flexDirection: 'row',
                  // alignItems: 'baseline',
                }}>
                <Text>
                  {item?.status?.name} -&nbsp;
                  {moment(item.status.updatedAt).format('DD/MM/YYYY')}
                </Text>
                {item?.status?.name === 'Cancel' ||
                item?.status?.name === 'Reject Admin' ||
                item?.status?.name === 'Reject BTN' ? (
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalOpen(true);
                      setModalReason(item?.reason);
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
                      Lihat
                    </Text>
                  </TouchableOpacity>
                ) : (
                  ''
                )}
              </View>
            </View>
          );
        })
      ) : (
        <Text>Belum ada riwayat</Text>
      )}

      <Modal visible={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <View
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              backgroundColor: 'black',
              opacity: 0.5,
            }}></View>

          <View
            style={{
              position: 'relative',
              backgroundColor: 'white',
              borderRadius: 10,
              overflow: 'hidden',
              width: '90%',
            }}>
            <View style={{borderColor: '#F0F0F0', borderWidth: 1, padding: 10}}>
              <Text style={{fontSize: 16, fontWeight: '500'}}>
                Informasi Ditolak / Cancel
              </Text>
            </View>
            <View
              style={{
                borderColor: '#F0F0F0',
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 30,
              }}>
              <Text>{modalReason}</Text>
            </View>
            <View style={{borderColor: '#F0F0F0', borderWidth: 1, padding: 10}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalOpen(false);
                    setModalReason('');
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
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RiwayatStatus;

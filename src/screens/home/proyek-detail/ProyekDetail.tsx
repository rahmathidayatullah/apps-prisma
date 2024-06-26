import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  fetchProjectDetail,
  fetchUnitProjectById,
} from '../../../redux/features/project/actions';
import {routeMenu} from '../../../contants/routes';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../../contants';
import {formatRupiah} from '../../../utils';
import CButtonText from '../../../components/atoms/button/ButtonText';
import InformasiUnit from './ui/InformasiUnit';
import IconReload from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import CSelectOption from './ui/SelectOption';
import {fetchBlockAll} from '../../../redux/features/block/actions';
import {fetchPhaseAll} from '../../../redux/features/phase/actions';
import {
  CHANGE_BLOCK,
  CHANGE_PHASE,
  CHANGE_UNIT,
  RESET_FILTER_PHASE_BLOCK_UNIT,
} from '../../../redux/features/project/constants';
import ListUnit from './ui/ListUnit';

export const optionStatusUnit = [
  {id: 0, label: 'All', value: null},
  {id: 1, label: 'Open', value: 'open'},
  {id: 2, label: 'Terbooking', value: 'Terbooking'},
  {id: 3, label: 'Proses KPR', value: 'Proses KPR'},
  {id: 4, label: 'SP3K', value: 'SP3K'},
  {id: 5, label: 'Akad', value: 'Akad'},
  {id: 6, label: 'Serah Terima', value: 'Serah Terima'},
];

const ProyekDetail = ({route}: any) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const {projectId} = route.params;
  const project = useSelector((state: any) => state.project);
  const {
    detailProject,
    errorDetailProject,
    statusDetailProject,
    listUnitProject,
    errorListUnitProject,
    statusListUnitProject,
    tahap,
    blok,
    unit,
  } = project;

  const phaseSelector = useSelector((state: any) => state.phase);
  const {listPhaseAll, errorListPhaseAll, statusListPhaseAll} = phaseSelector;
  const blockSelector = useSelector((state: any) => state.block);
  const {listBlockAll, statusListBlockAll, errorListBlockAll} = blockSelector;

  const [isModal, setIsModal] = useState(false);
  const [isModalFilter, setIsModalFilter] = useState(false);
  const [unitSelect, setUnitSelect] = useState({
    id: '',
    status: '',
    number: 0,
    phase: {
      id: '',
      name: '',
      booking_fee: 0,
      down_payment: 0,
      base_price: 0,
      strategic_facility: 0,
      strategic_main_road: 0,
      cashback: 0,
    },
    block: {
      id: '',
      name: '',
    },
    category: '',
    land_area: 0,
    building_area: 0,
    strategic_main_road: false,
    strategic_facility: false,
    project: {
      id: '',
    },
  });

  useEffect(() => {
    dispatch(fetchUnitProjectById(projectId));
  }, [dispatch, tahap, blok, unit]);

  useEffect(() => {
    dispatch(fetchProjectDetail(projectId));
    dispatch(fetchBlockAll(projectId));
    dispatch(fetchPhaseAll(projectId));
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <CButtonText
              onPress={() => {
                dispatch({type: RESET_FILTER_PHASE_BLOCK_UNIT});
                dispatch(fetchProjectDetail(projectId));
                dispatch(fetchUnitProjectById(projectId));
              }}>
              <IconReload name="reload1" size={18} color={COLORS.bgPrimary} />
            </CButtonText>
            <CButtonText
              onPress={() => navigation.navigate(routeMenu.LIST_BOOKING)}>
              <Text>List Booking</Text>
            </CButtonText>
          </View>
        );
      },
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Do nothing on focus
      return () => {
        // Reset state on blur
        dispatch({type: RESET_FILTER_PHASE_BLOCK_UNIT});
      };
    }, []),
  );

  if (statusDetailProject === 'process') {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.bgPrimary} />
      </SafeAreaView>
    );
  }

  if (statusDetailProject === 'error') {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Text>Terjadi kesalahan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <InformasiUnit detailProject={detailProject} />
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 20}}>
          <View style={styles.headerTopBar}>
            <Text style={styles.headerTopBarText}>List Unit Tersedia</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                borderColor: '#F0F0F0',
                borderWidth: 2,
                borderRadius: 4,
                paddingHorizontal: 12,
                paddingVertical: 8,
                marginTop: 10,
                position: 'relative',
              }}
              onPress={() => setIsModalFilter(true)}>
              <Text>Filter Data</Text>
              <IconFeather
                style={{position: 'absolute', right: 15, top: '33%'}}
                name="filter"
                size={22}
                color="#B8B8B8"
              />
            </TouchableOpacity>
          </View>
          <ListUnit
            statusListUnitProject={statusListUnitProject}
            listUnitProject={listUnitProject}
            setIsModal={setIsModal}
            setUnitSelect={setUnitSelect}
          />
        </View>
      </ScrollView>
      <Modal visible={isModal} onRequestClose={() => setIsModal(false)}>
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
                Detail Information Unit
              </Text>
            </View>
            <View style={{borderColor: '#F0F0F0', borderWidth: 1, padding: 10}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Status Unit</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;{unitSelect?.status ?? '-'}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Nomor Unit</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;{unitSelect?.number ?? '-'}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Tahap</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;{unitSelect?.phase?.name ?? '-'}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Blok</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;{unitSelect?.block?.name ?? '-'}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Kategory</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;{unitSelect?.category ?? '-'}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Luas Tanah</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;{unitSelect?.land_area ?? '-'}㎡
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Luas Bangunan</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;{unitSelect?.building_area ?? '-'}㎡
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Harga Booking Fee</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;
                  {unitSelect?.phase?.booking_fee
                    ? formatRupiah(unitSelect?.phase?.booking_fee)
                    : '-'}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Harga DP</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;
                  {unitSelect?.phase?.cashback
                    ? formatRupiah(unitSelect?.phase?.cashback)
                    : '-'}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Harga Cashback</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;
                  {unitSelect?.phase?.cashback
                    ? formatRupiah(unitSelect?.phase?.cashback)
                    : '-'}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Harga Dasar</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;
                  {unitSelect?.phase?.base_price
                    ? formatRupiah(unitSelect?.phase?.base_price)
                    : '-'}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Status Strategis</Text>
                </View>
                <View
                  style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>:&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <View style={styles.radioWrapper}>
                      <View style={styles.radioButton}>
                        {Boolean(unitSelect?.strategic_main_road) ? (
                          <View style={styles.selected}></View>
                        ) : (
                          <View style={styles.selected2}></View>
                        )}
                      </View>
                      <Text>Dekat Jalan Utama</Text>
                    </View>
                  </View>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>:&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <View style={styles.radioWrapper}>
                      <View style={styles.radioButton}>
                        {Boolean(unitSelect?.strategic_facility) ? (
                          <View style={styles.selected}></View>
                        ) : (
                          <View style={styles.selected2}></View>
                        )}
                      </View>
                      <Text>Dekat Fasilitas Umum</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <View style={{minWidth: 150}}>
                  <Text>Harga Strategis</Text>
                </View>
                <Text>
                  :&nbsp;&nbsp;&nbsp;&nbsp;
                  {unitSelect?.strategic_facility &&
                  unitSelect?.strategic_main_road
                    ? formatRupiah(
                        unitSelect?.phase?.strategic_facility +
                          unitSelect?.phase?.strategic_main_road,
                      )
                    : !unitSelect?.strategic_facility &&
                      !unitSelect?.strategic_main_road
                    ? 'Rp. 0'
                    : !unitSelect?.strategic_facility &&
                      unitSelect?.strategic_main_road
                    ? formatRupiah(0 + unitSelect?.phase?.strategic_main_road)
                    : formatRupiah(unitSelect?.phase?.strategic_facility + 0)}
                </Text>
              </View>
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
                  onPress={() => setIsModal(false)}
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
                    Kembali
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setIsModal(false),
                      navigation.navigate(routeMenu.BOOKING_FORM, {
                        unitId: unitSelect.id,
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
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isModalFilter}
        onRequestClose={() => setIsModalFilter(false)}>
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
                Filter Data Unit
              </Text>
            </View>
            <View style={{borderColor: '#F0F0F0', borderWidth: 1, padding: 10}}>
              <View
                style={{
                  position: 'relative',
                }}>
                <CSelectOption
                  label="Tahap"
                  placeholder="Pilih Tahap"
                  onChange={(category: any) =>
                    dispatch({type: CHANGE_PHASE, value: category.value})
                  }
                  value={tahap}
                  dataOption={listPhaseAll}
                />
              </View>
              <View
                style={{
                  position: 'relative',
                }}>
                <CSelectOption
                  label="Block"
                  placeholder="Pilih Block"
                  onChange={(category: any) =>
                    dispatch({type: CHANGE_BLOCK, value: category.value})
                  }
                  value={blok}
                  dataOption={listBlockAll}
                />
              </View>
              <View
                style={{
                  position: 'relative',
                }}>
                <CSelectOption
                  label="Unit"
                  placeholder="Pilih Unit"
                  onChange={(category: any) => {
                    console.log('category.value', category.value);
                    dispatch({type: CHANGE_UNIT, value: category.value});
                  }}
                  value={unit}
                  dataOption={optionStatusUnit}
                />
              </View>
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
                  onPress={() => setIsModalFilter(false)}
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
                    Kembali
                  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={filterData}
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
                    Filter Data
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTopBar: {
    backgroundColor: '#219C90',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 2,
  },
  headerTopBarText: {
    color: '#fff',
    fontSize: 16,
  },

  // radio

  radioWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  radioButton: {
    height: 18,
    width: 18,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'grey',
  },
  selected: {
    backgroundColor: '#219C90',
    flex: 1,
    borderRadius: 20,
    margin: 3,
  },
  selected2: {
    backgroundColor: '#EDEDED',
    flex: 1,
    borderRadius: 20,
    margin: 3,
  },
});

export default ProyekDetail;

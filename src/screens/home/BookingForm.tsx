import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import CInputTextWithIconLabel from '../../components/atoms/input/TextWithIconLabel';
import CTextArea from '../../components/atoms/input/TextArea';
import {ScrollView} from 'react-native-gesture-handler';
import CButton from '../../components/atoms/button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {routeMenu} from '../../contants/routes';
import {
  createBooking,
  fetchBookingDetail,
  updateBooking,
} from '../../redux/features/booking/actions';
import {NotifError} from '../../utils/errorMessage';
import LoadingScreen from '../../components/molecules/LoadingScreen';
import {
  RESET_CREATE_BOOKING,
  RESET_STATUS_CREATE_BOOKING,
  RESET_STATUS_UPDATE_BOOKING,
  RESET_UPDATE_BOOKING,
} from '../../redux/features/booking/constants';

export interface typeItemCategorySubmission {
  id: number;
  value: string;
  label: string;
}

const BookingForm = ({route}: any) => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const {unitId} = route.params;
  const bookingId = route?.params?.bookingId;

  const [form, setForm] = useState<any>({
    name: '',
    address: '',
    phone: '',
    emergencyPhone: '',
    identityNumber: '',
    unitId: '',
  });

  const validateForm = () => {
    return Object.values(form).every((field: any) => field.trim() !== '');
  };

  const booking = useSelector((state: any) => state.booking);
  const {
    bookingCreate,
    statusCreateBooking,
    errorCreateBooking,
    bookingUpdate,
    statusUpdateBooking,
    errorUpdateBooking,
    bookingDetail,
    statusDetailBooking,
    errorDetailBooking,
  } = booking;

  const onSubmitBooking = () => {
    if (validateForm()) {
      const body = {
        ...form,
        unitId: Number(form.unitId),
      };
      if (bookingId) {
        delete body.unitId;
        dispatch(updateBooking(bookingId, body));
      } else {
        dispatch(createBooking(body));
      }
    } else {
      Alert.alert('Semua data harus diisi');
    }
  };

  useEffect(() => {
    setForm({...form, unitId: String(unitId)});
  }, [unitId]);

  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookingDetail(bookingId));
    }
  }, [bookingId]);

  useEffect(() => {
    if (statusCreateBooking === 'success') {
      Alert.alert('Berhasil booking');
      navigation.navigate(routeMenu.LIST_BOOKING);
      dispatch({type: RESET_CREATE_BOOKING});
    }
    if (statusCreateBooking === 'error') {
      Alert.alert('Gagal Booking', NotifError(errorCreateBooking));
      dispatch({type: RESET_STATUS_CREATE_BOOKING});
    }

    if (statusUpdateBooking === 'success') {
      Alert.alert('Berhasil update booking');
      navigation.navigate(routeMenu.LIST_BOOKING);
      dispatch({type: RESET_UPDATE_BOOKING});
    }
    if (statusUpdateBooking === 'error') {
      Alert.alert('Gagal Update Booking', NotifError(errorUpdateBooking));
      dispatch({type: RESET_STATUS_UPDATE_BOOKING});
    }

    if (bookingId && statusDetailBooking === 'success') {
      setForm({
        ...form,
        name: bookingDetail?.consument?.name,
        address: bookingDetail?.consument?.address,
        phone: bookingDetail?.consument?.phone,
        emergencyPhone: bookingDetail?.consument?.emergencyPhone,
        identityNumber: bookingDetail?.consument?.identityNumber,
        unitId: String(bookingDetail?.unit?.id),
      });
    }
  }, [statusCreateBooking, statusDetailBooking, statusUpdateBooking]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{padding: 20}}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <CInputTextWithIconLabel
              placeholder="Masukkan nama konsumen"
              label="Nama Konsumen"
              right
              value={form.name}
              onChangeText={(nextText: string) =>
                setForm({...form, name: nextText})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
            <CTextArea
              placeholder="Masukkan alamat"
              label="Alamat"
              editable={true}
              value={form.address}
              onChangeText={(newText: string) =>
                setForm({...form, address: newText})
              }
              multiline={true}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <CInputTextWithIconLabel
              placeholder="Masukkan no hp"
              label="No Hp"
              right
              value={form.phone}
              onChangeText={(nextText: string) =>
                setForm({...form, phone: nextText})
              }
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <CInputTextWithIconLabel
              placeholder="Masukkan no darurat"
              label="No Darurat"
              right
              value={form.emergencyPhone}
              onChangeText={(nextText: string) =>
                setForm({...form, emergencyPhone: nextText})
              }
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <CInputTextWithIconLabel
              placeholder="Masukkan no ktp"
              label="No KTP"
              right
              value={form.identityNumber}
              onChangeText={(nextText: string) =>
                setForm({...form, identityNumber: nextText})
              }
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <CInputTextWithIconLabel
              placeholder="Masukkan nama unit"
              label="Unit"
              right
              editable={false}
              value={form.unitId}
              onChangeText={(nextText: string) =>
                setForm({...form, unitId: nextText})
              }
            />
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
            }}>
            <CButton
              disabled={
                statusUpdateBooking === 'process' ||
                statusCreateBooking === 'process'
              }
              onPress={onSubmitBooking}>
              {statusUpdateBooking === 'process' ||
              statusCreateBooking === 'process'
                ? 'Loading ..'
                : bookingId
                ? 'Update'
                : 'Create'}
            </CButton>
          </View>
        </View>
      </ScrollView>

      {bookingId ?? statusDetailBooking === 'process' ? (
        <LoadingScreen loading={statusDetailBooking === 'process'} />
      ) : (
        ''
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 18,
  },
});

export default BookingForm;

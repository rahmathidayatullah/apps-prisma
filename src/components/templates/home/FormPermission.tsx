import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CInputTextWithIconLabel from '../../atoms/input/TextWithIconLabel';
import CButton from '../../atoms/button/Button';
import {useNavigation} from '@react-navigation/native';
import {routeMenu} from '../../../contants/routes';
import {useDispatch} from 'react-redux';
import {resetValueBottomSheet} from '../../../redux/features/home/actions';
import IconFeather from 'react-native-vector-icons/Feather';

const FormPermission = ({bottomSheetModalRef}: any) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const handleSubmitPermission = () => {
    dispatch(resetValueBottomSheet());
    bottomSheetModalRef.current?.dismiss();
    navigation.navigate(routeMenu.PROFILE);
  };
  return (
    <View>
      <Text style={styles.titleForm}>Izin</Text>
      <View style={styles.containerForm}>
        <CInputTextWithIconLabel
          placeholder="Input start date"
          label="Start date"
          right
          icon={
            <IconFeather
              style={styles.iconInput}
              name="calendar"
              size={22}
              color="#B8B8B8"
            />
          }
        />
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <CInputTextWithIconLabel
            placeholder="Input end date"
            label="End date"
            right
            icon={
              <IconFeather
                style={styles.iconInput}
                name="calendar"
                size={22}
                color="#B8B8B8"
              />
            }
          />
        </View>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <CInputTextWithIconLabel
            placeholder="Input alasan"
            label="Alasan"
            right
          />
        </View>
        <View style={{marginTop: 15, flexDirection: 'row'}}>
          <CButton onPress={handleSubmitPermission}>Submit</CButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    marginTop: 20,
  },
  iconInput: {
    position: 'absolute',
    left: 15,
    top: '33%',
  },
  titleForm: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FormPermission;

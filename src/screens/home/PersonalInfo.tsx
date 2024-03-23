import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {stateGlobalProfile} from '../../redux/features/profile/interface';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import CButtonText from '../../components/atoms/button/ButtonText';
import {
  fetchProfile,
  updateProfile,
} from '../../redux/features/profile/actions';
import {RESET_FORM_PROFILE} from '../../redux/features/profile/constants';
import {baseURL} from '../../api/user';

interface typeInputText {
  placeholder: string;
  label: string;
  onChangeText?: any;
  value?: string;
  editable?: boolean;
}

const CInputText = ({
  placeholder,
  label,
  onChangeText,
  value,
  editable = true,
}: typeInputText) => {
  return (
    <View style={[styles.containerInputIconLabel]}>
      <Text style={{color: '#AFAFAF', fontWeight: '500'}}>{label}</Text>
      <View style={styles.containerInput}>
        <TextInput
          editable={editable}
          placeholderTextColor="#ccc"
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
  );
};

interface typeCInputImage {
  label: string;
  url?: any;
  changeImage?: any;
  isEdit: boolean;
}
const CInputImage = ({label, url, changeImage, isEdit}: typeCInputImage) => {
  return (
    <View
      style={[
        styles.containerInputIconLabel,
        {
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor: '#ccc',
        },
      ]}>
      <Text style={{color: '#AFAFAF', fontWeight: '500', marginBottom: 10}}>
        {label}
      </Text>
      <View style={{position: 'relative'}}>
        <View
          style={{
            height: 70,
            width: 70,
            overflow: 'hidden',
            borderRadius: 100,
            backgroundColor: '#EFEFEF',
            position: 'relative',
          }}>
          {url ? (
            <Image
              style={styles.imageProfile}
              source={{
                uri: `${url}`,
              }}
              resizeMode="cover"
            />
          ) : (
            <TouchableOpacity
              onPress={changeImage}
              style={{
                position: 'absolute',
                top: '33%',
                left: '33%',
              }}
              disabled={!isEdit}>
              <IconFeather name="camera" size={22} color="#B8B8B8" />
            </TouchableOpacity>
          )}
        </View>

        {url ? (
          <TouchableOpacity
            onPress={changeImage}
            style={{
              position: 'absolute',
              top: '75%',
              left: '15%',
              display: `${isEdit ? 'flex' : 'none'}`,
            }}
            disabled={!isEdit}>
            <IconAntDesign name="edit" size={22} color="#B8B8B8" />
          </TouchableOpacity>
        ) : (
          ''
        )}
      </View>
    </View>
  );
};

interface typeForm {
  bank_name?: string;
  account_number?: string;
  account_name?: string;
  name?: string;
  email?: string;
  password?: string;
  gender?: string;
  photo?: any;
  roleName?: string;
  phoneNumber?: string;
  emergencyContact?: string;
  address?: string;
  npwp?: string;
  no_nrp?: string;
  nik?: string;
}
const PersonalInfo = () => {
  const dispatch: any = useDispatch();
  const navigation = useNavigation();
  const profile = useSelector((state: stateGlobalProfile) => state.profile);

  const {statusUpdateProfile} = profile;

  const changeImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image: any) => {
      setForm({...form, photo: image});
    });
  };

  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState<typeForm>({
    name: '',
    email: '',
    password: '',
    gender: '',
    photo: '',
    roleName: '',
    phoneNumber: '',
    emergencyContact: '',
    address: '',
    bank_name: '',
    account_number: '',
    account_name: '',
    npwp: '',
    no_nrp: '',
    nik: '',
  });

  const updateData = () => {
    if (isEdit) {
      dispatch(updateProfile(form));
    } else {
      setIsEdit(true);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      password: '',
      gender: '',
      photo: undefined,
      roleName: '',
      phoneNumber: '',
      emergencyContact: '',
      address: '',
      npwp: '',
      no_nrp: '',
      nik: '',
      bank_name: '',
      account_number: '',
      account_name: '',
    });
  };

  const [refresh, setRefresh] = useState(false);
  const pullMe = () => {
    dispatch(fetchProfile());
  };

  useEffect(() => {
    if (statusUpdateProfile === 'success') {
      Alert.alert('Berhasil', 'Data profile berhasil di update');
      dispatch({type: RESET_FORM_PROFILE});
      setIsEdit(false);
      dispatch(fetchProfile());
    } else if (profile.status === 'success') {
      setRefresh(false);
      setForm({
        name: profile.profile.user.name || '-',
        email: profile.profile.user.email || '-',
        gender: profile.profile.user.gender || '-',
        bank_name: profile.profile.user.bank_name || '-',
        account_number: profile.profile.user.account_number || '-',
        account_name: profile.profile.user.account_name || '-',
        password: profile?.profile?.user?.password || '-',
        roleName: profile.profile.user.role.name || '-',
        phoneNumber: profile.profile.user.phoneNumber || '-',
        emergencyContact: profile.profile.user.emergencyContact || '-',
        address: profile.profile.user.address || '-',
        npwp: profile.profile.user.npwp || '-',
        no_nrp: profile.profile.user.no_nrp || '-',
        nik: profile.profile.user.nik || '-',
        photo: profile.profile.user.photo || undefined,
      });
    }
    return () => {
      resetForm();
    };
  }, [profile.status, statusUpdateProfile]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CButtonText
          onPress={updateData}
          disabled={statusUpdateProfile === 'process'}>
          {statusUpdateProfile === 'process'
            ? 'loading . .'
            : isEdit
            ? 'Simpan'
            : 'Ubah'}
        </CButtonText>
      ),
    });
  }, [navigation, isEdit, form, statusUpdateProfile]);

  console.log('form', form);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullMe} />
        }>
        <View style={styles.container}>
          <View style={{marginTop: 10}}>
            <CInputImage
              changeImage={changeImage}
              label="Foto Profile"
              url={form.photo?.path || form.photo}
              isEdit={isEdit}
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan nama lengkap"
              label="Nama Lengkap"
              editable={isEdit}
              value={form.name}
              onChangeText={(newText: string) =>
                setForm({...form, name: newText})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan jabatan"
              label="Jabatan"
              editable={false}
              value={form.roleName}
            />
          </View>

          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan email"
              label="Email"
              editable={isEdit}
              value={form.email}
              onChangeText={(newText: string) =>
                setForm({...form, email: newText})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan password"
              label="Password"
              editable={isEdit}
              value={form.password}
              onChangeText={(newText: string) =>
                setForm({...form, password: newText})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan nomor hp"
              label="Nomor HP"
              editable={isEdit}
              value={form.phoneNumber}
              onChangeText={(newText: string) =>
                setForm({...form, phoneNumber: newText})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan nomor darurat"
              label="Nomor Darurat"
              editable={isEdit}
              value={form.emergencyContact}
              onChangeText={(newText: string) =>
                setForm({...form, emergencyContact: newText})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan alamat"
              label="Alamat"
              editable={isEdit}
              value={form.address}
              onChangeText={(newText: string) =>
                setForm({...form, address: newText})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan jenis kelamin"
              label="Jenis Kelamin"
              editable={false}
              value={form.gender}
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan NPWP"
              label="NPWP"
              editable={false}
              value={form.npwp}
              onChangeText={(newText: string) =>
                setForm({...form, npwp: newText})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan NRP"
              label="NRP"
              editable={false}
              value={form.no_nrp}
              onChangeText={(newText: string) =>
                setForm({...form, no_nrp: newText})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan NIK"
              label="NIK"
              editable={false}
              value={form.nik}
              onChangeText={(newText: string) =>
                setForm({...form, nik: newText})
              }
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan nama rek "
              label="Nama Rek"
              editable={false}
              value={form.account_number}
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputText
              placeholder="Masukkan No Rek"
              label="No Rek"
              editable={false}
              value={form.account_number}
            />
          </View>
        </View>
      </ScrollView>
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
  containerInputIconLabel: {
    width: '100%',
  },
  containerInput: {
    position: 'relative',
    flexDirection: 'row',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 15,
    borderRadius: 16,
    height: 50,
    flex: 1,
    color: '#000000',
    fontWeight: '600',
  },
  imageProfile: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0553',
  },
});

export default PersonalInfo;

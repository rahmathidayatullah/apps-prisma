import React, {useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {stateGlobalProfile} from '../../redux/features/profile/interface';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../contants';
import CButtonText from '../../components/atoms/button/ButtonText';

interface typeInputTextWithIcon {
  placeholder: string;
  label: string;
  icon?: any;
  right?: boolean;
  stylesProps?: any;
  onChangeText?: any;
  value?: string;
  editable?: boolean;
}

const CInputTextWithIconLabel = ({
  placeholder,
  label,
  icon,
  right,
  stylesProps,
  onChangeText,
  value,
  editable = true,
}: typeInputTextWithIcon) => {
  return (
    <View style={[styles.containerInputIconLabel, stylesProps]}>
      <Text style={{color: '#AFAFAF', fontWeight: '500'}}>{label}</Text>
      <View style={styles.containerInput}>
        {right ? (
          <View style={{position: 'absolute', top: '32%', right: '15%'}}>
            {icon}
          </View>
        ) : (
          <View>{icon}</View>
        )}
        <TextInput
          editable={editable}
          placeholderTextColor="#ccc"
          style={[styles.input, right ? styles.inputRight : styles.inputLeft]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
  );
};

interface typeCInputTextWithIconLabelImage {
  label: string;
  url?: string;
  changeImage?: any;
}
const CInputTextWithIconLabelImage = ({
  label,
  url,
  changeImage,
}: typeCInputTextWithIconLabelImage) => {
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
                uri: url,
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
              }}>
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
            }}>
            <IconAntDesign name="edit" size={22} color="#B8B8B8" />
          </TouchableOpacity>
        ) : (
          ''
        )}
      </View>
    </View>
  );
};

const PersonalInfo = () => {
  const navigation = useNavigation();
  const profile = useSelector((state: stateGlobalProfile) => state.profile);
  const [urlImage, setUrlImage] = useState(
    'https://picsum.photos/seed/696/3000/2000',
  );
  const changeImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: true,
    }).then((image: any) => {
      setUrlImage(image.path);
    });
  };

  const [isEdit, setIsEdit] = useState(false);

  const updateData = () => {
    setIsEdit(!isEdit);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CButtonText onPress={updateData}>
          {isEdit ? 'Simpan' : 'Ubah'}
        </CButtonText>
      ),
    });
  }, [navigation, isEdit]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginTop: 10}}>
            <CInputTextWithIconLabelImage
              changeImage={changeImage}
              label="Foto Profile"
              url={urlImage}
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Nama Lengkap"
              editable={isEdit}
              right
              value={profile.profile.user.name}
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Jabatan"
              editable={isEdit}
              right
              value={profile.profile.user.role.name}
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Email"
              editable={isEdit}
              right
              value={`${profile.profile.user.email}`}
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Jenis Kelamin"
              editable={isEdit}
              right
              value="Laki - laki"
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Tempat Lahir"
              editable={isEdit}
              right
              value="Lampung"
            />
          </View>
          <View style={{marginTop: 20}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Nomor HP"
              editable={isEdit}
              right
              value="089630912247"
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
  containerTitleList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAttendaceLog: {
    fontSize: 16,
    fontWeight: '500',
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
  inputLeft: {
    paddingLeft: 50,
    color: '#000000',
  },
  inputRight: {
    color: '#000000',
  },
  imageProfile: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0553',
  },
});

export default PersonalInfo;

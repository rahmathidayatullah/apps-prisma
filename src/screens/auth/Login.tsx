import React, {useState} from 'react';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';

import CButton from '../../components/atoms/button/Button';
import CInputTextWithIconLabel from '../../components/atoms/input/TextWithIconLabel';
import CButtonText from '../../components/atoms/button/ButtonText';

import {COLORS} from '../../contants';
import {routeMenu} from '../../contants/routes';
import {useDispatch, useSelector} from 'react-redux';
import {postLogin} from '../../redux/features/auth/actions';
import {stateGlobalAuth} from '../../redux/features/auth/interface';

const LoginScreen = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();

  const {statusLogin, error} = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const body = {
      email,
      password,
    };
    dispatch(postLogin(body));
  };
  return (
    <ScrollView style={{flex: 1}}>
      <SafeAreaView style={styles.containerSafeArea}>
        <View style={styles.containerView}>
          <View style={styles.imageLogoContainer}>
            <Image
              style={styles.imageLogo}
              source={require('../../assets/images/logoPrismaApps-03.png')}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
            }}>
            <Text style={styles.titleSign}>Masuk</Text>
          </View>

          <View style={styles.line}></View>

          <CInputTextWithIconLabel
            placeholder="Masukkan email anda"
            label="Email"
            icon={
              <IconEntypo
                style={styles.iconInput}
                name="email"
                size={19}
                color="#B8B8B8"
              />
            }
            onChangeText={(newText: string) => setEmail(newText)}
          />

          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <CInputTextWithIconLabel
              placeholder="Masukkan password anda"
              label="Password"
              icon={
                <IconFeather
                  style={styles.iconInput}
                  name="lock"
                  size={19}
                  color="#B8B8B8"
                />
              }
              onChangeText={(newText: string) => setPassword(newText)}
            />
          </View>

          {statusLogin === 'error' ? (
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: COLORS.bgRedList,
                  textAlign: 'center',
                }}>
                {error && error?.message?.response?.message
                  ? 'Tidak ada pengguna dengan email dan password yg di masukkan'
                  : error?.message
                  ? 'Password atau email tidak sesuai'
                  : 'Terjadi kesalahan'}
              </Text>
            </View>
          ) : (
            ''
          )}

          <View style={{marginTop: 15, flexDirection: 'row'}}>
            <CButton
              disabled={!email || !password || statusLogin === 'process'}
              onPress={handleSubmit}>
              {statusLogin === 'idle' && 'Masuk'}
              {statusLogin === 'process' && 'Loading ..'}
              {statusLogin === 'success' && 'Berhasil Login'}
              {statusLogin === 'error' && 'Kirim'}
            </CButton>
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1}}>
              <CButtonText
                onPress={() => navigation.navigate(routeMenu.FORGOT_PASSWORD)}>
                Lupa Password?
              </CButtonText>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  containerView: {
    padding: 15,
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  titleSign: {
    marginTop: 30,
    fontSize: 24,
    textAlign: 'left',
    color: COLORS.bgGrey,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  iconInput: {
    position: 'absolute',
    left: 15,
    top: '34%',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    marginBottom: 50,
    marginTop: 10,
  },
  imageLogoContainer: {
    flex: 1,
    width: 300,
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'relative',
  },
});

export default LoginScreen;

import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import IconEntypo from 'react-native-vector-icons/Entypo';

import CButton from '../../components/atoms/button/Button';
import CInputTextWithIconLabel from '../../components/atoms/input/TextWithIconLabel';
import CButtonText from '../../components/atoms/button/ButtonText';

import {routeMenu} from '../../contants/routes';
import {COLORS} from '../../contants';

const ForgotPasswordScreen = () => {
  const navigation: any = useNavigation();
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
              // borderWidth: 1,
              // borderColor: '#000',
            }}>
            <Text style={styles.titleSign}>Lupa Password</Text>
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
          />

          <View style={{marginTop: 30, flexDirection: 'row'}}>
            <CButton>Kirim</CButton>
          </View>

          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1}}>
              <CButtonText onPress={() => navigation.navigate(routeMenu.LOGIN)}>
                Kembali
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  titleSign: {
    marginTop: 50,
    fontSize: 24,
    textAlign: 'center',
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

export default ForgotPasswordScreen;

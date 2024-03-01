import React from 'react';

import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';

import CButton from '../../components/atoms/button/Button';
import CInputTextWithIconLabel from '../../components/atoms/input/TextWithIconLabel';
import CButtonText from '../../components/atoms/button/ButtonText';

import {COLORS, ROUTES} from '../../contants';

const LoginScreen = () => {
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <View style={styles.containerView}>
        <View style={styles.imageLogoContainer}>
          <Image
            style={styles.imageLogo}
            source={require('../../assets/images/logoprisma-01.png')}
          />
        </View>

        <Text style={styles.titleSign}>Sign In</Text>

        <View style={styles.line}></View>

        <CInputTextWithIconLabel
          placeholder="Please input email"
          label="Email"
          icon={
            <IconEntypo
              style={styles.iconInput}
              name="email"
              size={22}
              color="#B8B8B8"
            />
          }
        />

        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <CInputTextWithIconLabel
            placeholder="Please input password"
            label="Password"
            icon={
              <IconFeather
                style={styles.iconInput}
                name="lock"
                size={22}
                color="#B8B8B8"
              />
            }
          />
        </View>

        <View style={{marginTop: 15, flexDirection: 'row'}}>
          <CButton onPress={() => navigation.navigate(ROUTES.HOME)}>
            Log In
          </CButton>
        </View>

        <CButtonText
          onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>
          Forgot Password
        </CButtonText>
      </View>
    </SafeAreaView>
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
    marginTop: 40,
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.bgGrey,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  iconInput: {
    position: 'absolute',
    left: 15,
    top: '33%',
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: '#ECECEC',
    marginBottom: 20,
    marginTop: 20,
  },
  imageLogoContainer: {},
  imageLogo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
});

export default LoginScreen;

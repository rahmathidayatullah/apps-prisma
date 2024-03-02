import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import IconEntypo from 'react-native-vector-icons/Entypo';

import CButton from '../../components/atoms/button/Button';
import CInputTextWithIconLabel from '../../components/atoms/input/TextWithIconLabel';
import CButtonText from '../../components/atoms/button/ButtonText';

import {ROUTES} from '../../contants';
import {routeMenu} from '../../contants/routes';

const ForgotPasswordScreen = () => {
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <View style={styles.containerView}>
        <Text style={styles.titleSign}>Forgot Password</Text>

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

        <View style={{marginTop: 30, flexDirection: 'row'}}>
          <CButton>Submit</CButton>
        </View>

        <CButtonText onPress={() => navigation.navigate(routeMenu.LOGIN)}>
          Back to Sign In
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
    fontSize: 24,
    textAlign: 'center',
    // color: COLORS.gray,
    color: '#585858',
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
});

export default ForgotPasswordScreen;

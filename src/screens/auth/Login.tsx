import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';

const LoginScreen = () => {
  const navigation: any = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login Screen</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button
        title="Forgot Password"
        onPress={() => navigation.navigate('Forgot Password')}
      />
    </View>
  );
};

export default LoginScreen;

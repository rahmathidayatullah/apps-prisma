import React from 'react';
import {Button, Text, View} from 'react-native';

const ForgotPasswordScreen = ({navigation}: any) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Forgot Password Screen</Text>
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

export default ForgotPasswordScreen;

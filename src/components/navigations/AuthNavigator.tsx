import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '../../contants';
import HomeScreen from '../../screens/home/Home';
// import AboutScreen from "../../screens/home/About";
// import ProfileScreen from "../../screens/home/Profile";
// import ForgotPasswordScreen from "../../screens/auth/ForgotPassword";
import LoginScreen from '../../screens/auth/Login';
import RegisterScreen from '../../screens/auth/Register';
import ForgotPasswordScreen from '../../screens/auth/ForgotPassword';
import HomeNaviagator from './HomeNavigator';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTES.REGISTER}
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTES.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTES.HOME}
          component={HomeNaviagator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;

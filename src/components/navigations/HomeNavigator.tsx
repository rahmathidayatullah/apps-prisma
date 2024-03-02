import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../contants';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import HomeScreen from '../../screens/home/Home';
import ProfileScreen from '../../screens/home/Profile';
import {routeMenu} from '../../contants/routes';

const Tab = createBottomTabNavigator();

export default function HomeNaviagator() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.bgPrimary,
        }}>
        <Tab.Screen
          name={routeMenu.HOME}
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
              <IconSimpleLineIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={routeMenu.PROFILE}
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
              <IconAntDesign name="user" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

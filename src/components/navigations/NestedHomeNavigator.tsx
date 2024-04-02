import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../screens/home/Home';
import {routeMenu} from '../../contants/routes';
import ListOfSubmission from '../../screens/home/ListOfSubmission';
import ListAttendaceLog from '../../screens/home/ListAttendanceLog';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TakeSelfie from '../../screens/home/TakeSelfie';
import ViewCurrentLocation from '../../screens/home/ViewCurrentLocation';
import ListOvertimeLog from '../../screens/home/ListOvertimeLog';
import ListOfAnnouncement from '../../screens/home/ListOfAnnouncement';
import DetailAnnoucement from '../../screens/home/DetailAnnoucement';
import Attendance from '../../screens/home/Attendance';

const Stack = createNativeStackNavigator();

export default function NestedHomeNaviagator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{}} initialRouteName={routeMenu.HOME}>
        <Stack.Screen
          name={routeMenu.HOME}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routeMenu.LIST_OF_SUBMISSION}
          component={ListOfSubmission}
          options={{
            title: 'Riwayat Pengajuan',
          }}
        />
        <Stack.Screen
          name={routeMenu.LIST_ATTENDACE_LOG}
          component={ListAttendaceLog}
          options={{
            title: 'Riwayat Absensi',
          }}
        />
        <Stack.Screen
          name={routeMenu.LIST_OVERTIME_LOG}
          component={ListOvertimeLog}
          options={{
            title: 'Riwayat Lembur',
          }}
        />
        <Stack.Screen
          name={routeMenu.ATTENDACE}
          component={Attendance}
          options={{
            title: 'Kehadiran',
          }}
        />
        <Stack.Screen
          name={routeMenu.LIST_OF_ANNOUCEMENT}
          component={ListOfAnnouncement}
          options={{
            title: 'Pengumuman',
          }}
        />
        <Stack.Screen
          name={routeMenu.DETAIL_ANNOUCEMENT}
          component={DetailAnnoucement}
          options={{
            title: 'Detail Pengumuman',
          }}
        />
        <Stack.Screen name={routeMenu.TAKE_SEFIE} component={TakeSelfie} />
        <Stack.Screen
          name={routeMenu.VIEW_CURRENT_LOCATION}
          component={ViewCurrentLocation}
          options={{
            title: 'Lokasi Sekarang',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

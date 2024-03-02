export const routeMenu = {
  HOME_TAB: 'Home Tab',
  HOME_DRAWER: 'Home Drawer',

  WALLET: 'Wallet',
  WALLET_DRAWER: 'Wallet Drawer',

  NOTIFICATIONS: 'Notifications',
  NOTIFICATIONS_DRAWER: 'Notifications Drawer',

  SETTINGS: 'Settings',
  ACCOUNT_SETTINGS: 'Account Settings',
  SETTINGS_NAVIGATOR: 'Settings Navigator',

  SETTINGS_DETAIL: 'Settings Detail',

  ABOUT: 'My About',
  SUBMISSION: 'Submission',

  // menu home
  HOME: 'Home',
  PROFILE: 'My Profile',

  // menu auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'Forgot Password',
};

import IconFeather from 'react-native-vector-icons/Feather';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {MenuItem} from '../components/templates/home/inteface';
import {COLORS} from '.';

export const routeMenuItem: MenuItem[] = [
  {
    id: 1,
    label: 'Cuti',
    path: '/',
    icon: <IconFeather name="calendar" size={28} color={COLORS.bgPrimary} />,
  },
  {
    id: 2,
    label: 'Lembur',
    path: '/profile',
    icon: (
      <IconSimpleLineIcons name="clock" size={28} color={COLORS.bgPrimary} />
    ),
  },
  {
    id: 3,
    label: 'Izin',
    path: '/settings',
    icon: <IconAntDesign name="message1" size={28} color={COLORS.bgPrimary} />,
  },
];

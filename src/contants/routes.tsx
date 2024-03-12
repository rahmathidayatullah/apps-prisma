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
  LIST_ATTENDACE_LOG: 'List Attendace Log',
  LIST_OVERTIME_LOG: 'List Overtime Log',
  LIST_OF_SUBMISSION: 'List Of Submission',
  TAKE_SEFIE: 'Take Selfie',
  VIEW_CURRENT_LOCATION: 'View Current Location',

  // menu profile
  PERSONAL_INFO: 'Personal Info',

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
    value: 'pengajuan',
    label: 'Pengajuan',
    path: '/',
    icon: <IconFeather name="calendar" size={28} color={COLORS.bgPrimary} />,
  },
  // {
  //   id: 3,
  //   value: 'cuti',
  //   label: 'Cuti',
  //   path: '/',
  //   icon: <IconFeather name="calendar" size={28} color={COLORS.bgPrimary} />,
  // },
  {
    id: 2,
    value: 'lembur',
    label: 'Lembur',
    path: '/profile',
    icon: (
      <IconSimpleLineIcons name="clock" size={28} color={COLORS.bgPrimary} />
    ),
  },
  // {
  //   id: 4,
  //   value: 'izin',
  //   label: 'Izin',
  //   path: '/settings',
  //   icon: <IconAntDesign name="message1" size={28} color={COLORS.bgPrimary} />,
  // },
];

export interface typeItemCategorySubmission {
  id: number;
  value: string;
  label: string;
}

export const categorySubmission: typeItemCategorySubmission[] = [
  {
    id: 1,
    value: 'cuti-tahunan',
    label: 'Cuti Tahunan',
  },
  {
    id: 1,
    value: 'izin-sakit',
    label: 'Izin Sakit',
  },
  {
    id: 1,
    value: 'lainnya',
    label: 'Lainnya',
  },
];

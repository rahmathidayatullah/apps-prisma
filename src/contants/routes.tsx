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
  LIST_OF_ANNOUCEMENT: 'List Of Annoucement',
  DETAIL_ANNOUCEMENT: 'Detail Annoucement',
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
import IconClockIn from '../components/atoms/svg/clockIn';
import IconOvertime2 from '../components/atoms/svg/overtime2';
import IconPenjualan from '../components/atoms/svg/penjualan';
import IconAkad from '../components/atoms/svg/akad';
import IconHome from '../components/atoms/svg/home';
import IconLogistik from '../components/atoms/svg/logistik';
import moment from 'moment';

// export const routeMenuItem: MenuItem[] = [
//   {
//     id: 1,
//     value: 'pengajuan',
//     label: 'Pengajuan',
//     path: '/',
//     icon: <IconFeather name="calendar" size={28} color={COLORS.bgPrimary} />,
//   },
//   // {
//   //   id: 3,
//   //   value: 'cuti',
//   //   label: 'Cuti',
//   //   path: '/',
//   //   icon: <IconFeather name="calendar" size={28} color={COLORS.bgPrimary} />,
//   // },
//   {
//     id: 2,
//     value: 'lembur',
//     label: 'Lembur',
//     path: '/profile',
//     icon: (
//       <IconSimpleLineIcons name="clock" size={28} color={COLORS.bgPrimary} />
//     ),
//   },
//   // {
//   //   id: 4,
//   //   value: 'izin',
//   //   label: 'Izin',
//   //   path: '/settings',
//   //   icon: <IconAntDesign name="message1" size={28} color={COLORS.bgPrimary} />,
//   // },
// ];
export const routeMenuItem: MenuItem[] = [
  {
    id: 1,
    value: 'pengajuan',
    label: 'Kehadiran',
    path: '/',
    icon: (
      // <IconFeather name="calendar" size={28} color={COLORS.bgPrimary} />
      <IconOvertime2 />
    ),
  },
  {
    id: 3,
    value: 'cuti',
    label: 'Penjualan',
    path: '/',
    icon: <IconPenjualan />,
    // <IconFeather name="calendar" size={28} color={COLORS.bgPrimary} />
  },
  {
    id: 2,
    value: 'lembur',
    label: 'List Persiapan Akad',
    path: '/profile',
    icon: (
      // <IconSimpleLineIcons name="clock" size={28} color={COLORS.bgPrimary} />
      <IconAkad />
    ),
  },
  {
    id: 4,
    value: 'izin',
    label: 'Progress Rumah',
    path: '/settings',
    icon: (
      // <IconAntDesign name="message1" size={28} color={COLORS.bgPrimary} />
      <IconHome />
    ),
  },
  {
    id: 5,
    value: 'izin',
    label: 'Management Logistik',
    path: '/settings',
    icon: (
      // <IconAntDesign name="message1" size={28} color={COLORS.bgPrimary} />
      <IconLogistik />
    ),
  },
];

export interface typeItemCategorySubmission {
  id: number;
  value: string;
  label: string;
}

export const categorySubmission: typeItemCategorySubmission[] = [
  {
    id: 1,
    value: '1',
    label: 'Cuti Tahunan',
  },
  {
    id: 2,
    value: '2',
    label: 'Izin Sakit',
  },
  {
    id: 3,
    value: '3',
    label: 'Lainnya',
  },
  {
    id: 4,
    value: '4',
    label: 'Libur',
  },
];

export const listAnnouncement = [
  {
    id: '1',
    title: 'Open Blok The Arthera Hill Extension Tahap 4',
    description:
      'The Arthera Hill Tahap 4, dibuka penjualan saat berita ini diterbitkan, Senin 17 Maret 2024 dengan rincian...',
    img: require('../assets/images/img-1.png'),
  },
  {
    id: '2',
    title: 'Buka Bersama Prisma Properties & Mitra',
    description:
      'Dalam raga menjaga sinergi dan kerjasama tim, kami mengundang seluruh karyawan Prisma Properties dan Mitra ...',
    img: require('../assets/images/img-2.png'),
  },
  {
    id: '3',
    title: 'Soft Launching NUP The Magnolia Grande',
    description:
      'Telah perkenalkan Perumahan Subsidi terbaru The Magnolia Grande Cikarang ',
    // img: '../../../assets/images/logoprisma-03.png',
    img: require('../assets/images/img-3.png'),
  },
  {
    id: '4',
    title: 'Persiapan Launching Tanggal 14 Maret 2024',
    description:
      'Telah perkenalkan Perumahan Subsidi terbaru The Magnolia Grande Cikarang ',
    img: require('../assets/images/img-4.png'),
  },
];

const currentYear = moment().year();

// Generate start date for January 1st of the current year
export const currentDateWithFormat = moment(`${currentYear}-01-01`).format(
  "YYYY-MM-DD"
);

// Generate end date for December 31st of the current year
export const futureDateOneYear = moment(`${currentYear}-12-31`).format(
  "YYYY-MM-DD"
);
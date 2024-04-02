import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {COLORS} from '../../../contants';
// import Badge from '../../atoms/badge/Badge';
import ImageProfile from '../home/ImageProfile';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {routeMenu} from '../../../contants/routes';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../redux/features/auth/actions';
import LinearGradient from 'react-native-linear-gradient';
import {stateGlobalAuth} from '../../../redux/features/auth/interface';
import moment from 'moment';
import {fetchProfile} from '../../../redux/features/profile/actions';

const Profile = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const auth = useSelector((state: stateGlobalAuth) => state.auth);
  const {userData} = auth;
  const newData =
    typeof userData === 'string' ? JSON.parse(userData) : userData;
  const profile = useSelector((state: any) => state.profile);
  const dataMenu = [
    {
      id: 1,
      menu: 'Data Diri',
      subMenu: [
        {
          id: 2,
          menu: 'Informasi Pribadi',
          subMenu: [],
          path: routeMenu.PERSONAL_INFO,
          icon: <IconAntDesign name="user" size={21} color="#6D6D6D" />,
        },
      ],
      path: '',
    },
    {
      id: 3,
      menu: 'Lainnya',
      subMenu: [
        {
          id: 4,
          menu: 'Keluar',
          subMenu: [],
          path: '',
          icon: <IconSimpleLineIcons name="login" size={21} color="#6D6D6D" />,
        },
      ],
      path: '',
    },
  ];

  const onPressMenu = (itemMenu: any) => {
    if (itemMenu.menu === 'Keluar') {
      dispatch(logout());
    } else {
      navigation.navigate(itemMenu.path);
    }
  };

  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'));
    }, 1000); // Update every second
    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    if (profile.status === 'success') {
      setRefresh(false);
    }
  }, [profile.status]);

  const [refresh, setRefresh] = useState(false);
  const pullMe = () => {
    dispatch(fetchProfile());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullMe} />
        }>
        <View style={{paddingBottom: 10}}>
          <LinearGradient
            start={{x: 0.5, y: 0.1}}
            end={{x: 0.5, y: 0.9}}
            colors={['#219C90', '#219C90', '#FBB03B']}
            style={styles.containerHead}>
            <View style={styles.containerHeadTitleImage}>
              <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
                <ImageProfile />
                <View>
                  <Text style={styles.titleName}>
                    {profile?.profile?.user?.name ?? '-'}
                  </Text>
                  <Text style={styles.titleRole}>
                    {profile?.profile?.user?.role?.name ?? '-'}
                  </Text>
                  <View style={{height: 22}}>
                    {profile?.profile?.user?.companies?.length !== 0 ? (
                      newData.user.companies.map((item: any) => {
                        return (
                          <Text style={styles.titleRole} key={item.id}>
                            {item.name}
                          </Text>
                        );
                      })
                    ) : (
                      <Text style={styles.titleRole}></Text>
                    )}
                  </View>
                </View>
              </View>
              <View>
                <Text style={{fontSize: 12, color: 'white', fontWeight: '500'}}>
                  {moment().format('dddd')}, {moment().format('DD MMMM YYYY')}
                </Text>
                <Text
                  style={{
                    textAlign: 'right',
                    fontSize: 10,
                    color: 'white',
                  }}>
                  {currentTime} WIB
                </Text>
              </View>
            </View>
          </LinearGradient>

          <View style={{paddingHorizontal: 10, paddingTop: 10}}>
            <View
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 14,
                borderRadius: 6,
                paddingBottom: 10,

                shadowColor: COLORS.bgBlackShadow,
                shadowOffset: {
                  width: 3,
                  height: 3,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                // box shadow android
                elevation: 4,
              }}>
              {dataMenu.map((item: any) => {
                return (
                  <View style={{marginTop: 20}} key={item.id}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>
                      {item.menu}
                    </Text>
                    {item.subMenu.map((items: any) => {
                      return (
                        <TouchableOpacity
                          key={items.id}
                          onPress={() => onPressMenu(items)}>
                          <View
                            style={{
                              marginTop: 14,
                              borderBottomColor: '#ECECEC',
                              borderBottomWidth: 1,
                              paddingBottom: 14,
                              paddingLeft: 16,
                              flexDirection: 'row',
                              gap: 10,
                            }}>
                            {items.icon}
                            <Text style={{fontSize: 15, fontWeight: '400'}}>
                              {items.menu}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  containerHeadTitleImage: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // position: 'relative',
    // width: '100%',

    marginTop: 5,
    paddingHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    position: 'relative',
  },

  titleName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 1,
  },
  titleRole: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
    marginTop: 2,
    letterSpacing: 1,
  },

  container: {},
  containerHead: {
    // paddingHorizontal: 20,
    // paddingVertical: 24,
    // backgroundColor: COLORS.bgPrimary,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',

    paddingTop: 14,
    paddingLeft: 10,
    paddingRight: 14,
    paddingBottom: 60,
    backgroundColor: COLORS.bgPrimary,
  },
  line: {
    height: 2,
    width: '100%',
    // backgroundColor: '#ECECEC',
    marginBottom: 12,
    marginTop: 12,
  },
});

export default Profile;

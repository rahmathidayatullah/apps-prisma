import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../../contants';
import Badge from '../../atoms/badge/Badge';
import ImageProfile from '../home/ImageProfile';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {routeMenu} from '../../../contants/routes';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logout} from '../../../redux/features/auth/actions';

const Profile = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const dataMenu = [
    {
      id: 1,
      menu: 'My Info',
      subMenu: [
        {
          id: 2,
          menu: 'Personal Info',
          subMenu: [],
          path: routeMenu.PERSONAL_INFO,
          icon: <IconAntDesign name="user" size={21} color="#6D6D6D" />,
        },
      ],
      path: '',
    },
    {
      id: 3,
      menu: 'Other',
      subMenu: [
        {
          id: 4,
          menu: 'Logout',
          subMenu: [],
          path: routeMenu.LOGIN,
          icon: <IconSimpleLineIcons name="login" size={21} color="#6D6D6D" />,
        },
      ],
      path: '',
    },
  ];

  const onPressMenu = (itemMenu: any) => {
    if (itemMenu.menu === 'Logout') {
      dispatch(logout());
    } else {
      navigation.navigate(itemMenu.path);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={{paddingBottom: 10}}>
          <View style={styles.containerHead}>
            <View>
              <Badge />
              <View style={styles.containerHeadTitleImage}>
                <View>
                  <Text style={styles.titleName}>Rahmat Hidayatullah</Text>
                  <Text style={styles.titleRole}>Karyawan</Text>
                </View>
                <ImageProfile />
              </View>
            </View>
          </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
  },

  titleName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 1,
  },
  titleRole: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginTop: 2,
    letterSpacing: 1,
  },

  container: {},
  containerHead: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: COLORS.bgPrimary,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchProject} from '../../redux/features/project/actions';
import {routeMenu} from '../../contants/routes';
import {SvgUri} from 'react-native-svg';
import {COLORS} from '../../contants';

const Proyek2 = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const project = useSelector((state: any) => state.project);
  const {listProject, errorListProject, statusListProject} = project;

  const [refresh, setRefresh] = useState(false);
  const pullMe = () => {
    dispatch(fetchProject());
  };

  useEffect(() => {
    if (statusListProject === 'success') {
      setRefresh(false);
    }
  }, [statusListProject]);

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  if (statusListProject === 'process') {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.bgPrimary} />
      </SafeAreaView>
    );
  }

  if (statusListProject === 'error') {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Text>Terjadi kesalahan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 20}}>
        {listProject?.length ? (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={pullMe} />
            }
            data={listProject}
            numColumns={2}
            columnWrapperStyle={{gap: 10, paddingHorizontal: 12}}
            contentContainerStyle={{gap: 10, paddingBottom: 20}}
            keyExtractor={(item, idx) => item.project_name + idx}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(routeMenu.PROJECT_DETAIL, {
                      projectId: item.id,
                    })
                  }
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    flex: 1,
                    height: 200,
                    borderRadius: 20,
                    borderColor: '#EDEDED',
                    borderWidth: 2,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      // backgroundColor: 'red',
                      width: '100%',
                      height: '100%',
                      // display: 'flex',
                      // justifyContent: 'center',
                      // alignItems: 'center',
                      // flexDirection: 'column',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#F9F9F9',
                        padding: 20,
                      }}>
                      <Image
                        source={{uri: item.project_image}}
                        width={100}
                        height={100}
                      />
                    </View>
                    <Text
                      style={{
                        marginTop: 10,
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: '500',
                      }}>
                      {item.project_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Text>Terjadi Kesalahan</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignContent: 'flex-start',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: '50%',
    height: 100,
  },
  item: {
    padding: 8,
    margin: 8,
    backgroundColor: '#EEEEEE',
    // height: 'calc(100% - 8px)',
  },
});

export default Proyek2;

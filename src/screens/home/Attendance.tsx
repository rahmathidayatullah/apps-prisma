import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {ListAttendace} from '../../components/templates/home/ListAttendace';
import {ListSubmission} from '../../components/templates/home/ListSubmission';
import {ListOvertime} from '../../components/templates/home/ListOvertime';
import {useDispatch, useSelector} from 'react-redux';
import {stateGlobalHome} from '../../redux/features/home/interface';
import {
  getListAttendancesMine,
  getListOvertimesMine,
  getListSubmissionsMine,
} from '../../redux/features/home/actions';

const Attendance = () => {
  const dispatch: any = useDispatch();

  const home = useSelector((state: stateGlobalHome) => state.home);

  const {
    statusListAttendaceMine,
    statusListOvertimesMine,
    statusListSubmissionsMine,

    dataAttendaceMine,
    dataOvertimesMine,
    datSubmissionsMine,
  } = home;

  useEffect(() => {
    if (statusListAttendaceMine === 'success') {
      setRefresh(false);
    }
  }, [statusListAttendaceMine]);

  useEffect(() => {
    dispatch(getListAttendancesMine());
    dispatch(getListOvertimesMine());
    dispatch(getListSubmissionsMine());
  }, []);

  const [refresh, setRefresh] = useState(false);
  const pullMe = () => {
    dispatch(getListAttendancesMine());
    dispatch(getListOvertimesMine());
    dispatch(getListSubmissionsMine());
  };

  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullMe} />
      }>
      <View style={styles.container}>
        <View style={styles.containerListAttendace}>
          <ListAttendace
            dataAttendaceMine={dataAttendaceMine}
            loading={statusListAttendaceMine === 'process'}
          />
        </View>
        <View style={styles.containerListAttendace}>
          <ListSubmission
            datSubmissionsMine={datSubmissionsMine}
            loading={statusListSubmissionsMine === 'process'}
          />
        </View>
        <View style={styles.containerListAttendace}>
          <ListOvertime
            dataOvertimesMine={dataOvertimesMine}
            loading={statusListOvertimesMine === 'process'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 24,
  },
  containerListAttendace: {
    // paddingHorizontal: 12,
    // marginTop: 38,
    borderBottomColor: '#ccc',
    paddingVertical: 30,
    borderBottomWidth: 1,
  },
});

export default Attendance;

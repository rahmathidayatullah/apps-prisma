import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ListItemAttendace} from './ListItemAttendace';
import {getListAttendances} from '../../../redux/features/attendances/actions';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../contants';
import CalendarPicker from 'react-native-calendar-picker';
import {
  CLEAR_START_DATE_END_DATE,
  SET_END_DATE,
  SET_START_DATE,
} from '../../../redux/features/attendances/constants';

interface typeInputTextWithIcon {
  placeholder: string;
  icon?: any;
  icon2?: any;
  right?: boolean;
  stylesProps?: any;
  onChangeText?: any;
  value?: string;
  editable?: boolean;
  onPressInputContainer?: any;
  isValueExist?: boolean;
  clearValue?: any;
}

const CInputTextWithIconLabel = ({
  placeholder,
  icon,
  icon2,
  right,
  stylesProps,
  onChangeText,
  value,
  editable = false,
  onPressInputContainer,
  isValueExist = false,
  clearValue,
}: typeInputTextWithIcon) => {
  return (
    <View style={[styles.containerInputIconLabel, stylesProps]}>
      <View style={styles.containerInput}>
        {isValueExist && (
          <TouchableOpacity
            onPress={clearValue}
            style={{
              position: 'absolute',
              top: '35%',
              right: '1%',
              zIndex: 1,
              width: 30,
              height: 30,
            }}>
            {icon2}
          </TouchableOpacity>
        )}

        <View
          style={{
            position: 'absolute',
            top: '35%',
            left: '1%',
            zIndex: 1,
          }}>
          {icon}
        </View>

        <TouchableOpacity
          onPress={onPressInputContainer}
          style={{width: '100%'}}>
          <TextInput
            editable={editable}
            placeholderTextColor="#ccc"
            style={[styles.input, right ? styles.inputRight : styles.inputLeft]}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            onPressIn={onPressInputContainer}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TemplateListAttendaceLog = () => {
  const dispatch: any = useDispatch();
  const attendances = useSelector((state: any) => state.attendances);

  const {
    dataListAttendaces,
    page,
    take,
    order,
    keyword,
    startDate,
    endDate,
    statusListAttendaces,
  } = attendances;

  const [showCalender, setShowCalender] = useState<any>(false);

  const handleClearValue = () => {
    dispatch({type: CLEAR_START_DATE_END_DATE});
  };
  const onPressInputContainer = () => {
    setShowCalender(!showCalender);
  };
  const onDateChange = (date: any, type: any) => {
    const newDate = JSON.stringify(date);
    const newDate1 = newDate.substring(1, newDate.length - 1);
    const dates = newDate1.split('T');
    const date1 = dates[0].split('-');
    const day = date1[2];
    const month = date1[1];
    const year = date1[0];

    if (type == 'END_DATE') {
      if (day == undefined) {
        dispatch({
          type: SET_END_DATE,
          value: '',
        });
      } else {
        setShowCalender(false);
        dispatch({
          type: SET_END_DATE,
          value: year + '-' + month + '-' + day,
        });
      }
    } else {
      dispatch({
        type: SET_START_DATE,
        value: year + '-' + month + '-' + day,
      });
    }
  };

  useEffect(() => {
    dispatch(getListAttendances());
  }, [page, take, order, keyword, endDate]);

  useEffect(() => {
    if (statusListAttendaces === 'success') {
      setRefresh(false);
    }
  }, [statusListAttendaces]);

  if (statusListAttendaces === 'error') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Text style={{textAlign: 'center'}}>Somthing when wrong</Text>
      </View>
    );
  }

  const [refresh, setRefresh] = useState(false);
  const pullMe = () => {
    dispatch(getListAttendances());
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullMe} />
      }>
      <View style={styles.container}>
        <View style={styles.containerTitleList}>
          <CInputTextWithIconLabel
            onPressInputContainer={onPressInputContainer}
            placeholder="Filter By Start date - End date"
            icon={
              <IconAntDesign
                style={styles.iconInput}
                name="search1"
                size={19}
                color="#B8B8B8"
              />
            }
            icon2={
              <IconAntDesign name="closecircleo" size={19} color="#B8B8B8" />
            }
            clearValue={handleClearValue}
            value={`${startDate ? `${startDate} - ` : ''}${endDate}`}
            isValueExist={startDate && startDate}
          />
        </View>
        {showCalender ? (
          <View>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#7300e6"
              selectedDayTextColor="#FFFFFF"
              onDateChange={onDateChange}
            />
          </View>
        ) : (
          ''
        )}

        {statusListAttendaces === 'process' ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: 40,
            }}>
            <ActivityIndicator size="large" color={COLORS.bgPrimary} />
          </View>
        ) : (
          <View>
            {dataListAttendaces.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
                  height: '100%',
                  marginTop: 40,
                }}>
                <Text style={{textAlign: 'center'}}>Data kosong</Text>
              </View>
            ) : (
              dataListAttendaces.map((item: any) => (
                <View key={item.id} style={{marginTop: 12}}>
                  <ListItemAttendace item={item} />
                </View>
              ))
            )}
          </View>
        )}
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
  containerTitleList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  textAttendaceLog: {
    fontSize: 16,
    fontWeight: '500',
  },

  containerInputIconLabel: {
    width: '100%',
  },
  containerInput: {
    position: 'relative',
    flexDirection: 'row',
  },
  input: {
    paddingTop: 15,
    paddingBottom: 15,
    marginVertical: 10,
    borderRadius: 8,
    height: 50,
    flex: 1,
    color: COLORS.bgGrey,
    backgroundColor: COLORS.bgGreyList,

    // box shadow ios
    shadowColor: COLORS.bgBlackShadow,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // box shadow android
    elevation: 0.1,
  },
  inputLeft: {
    paddingLeft: 50,
  },
  inputRight: {
    paddingLeft: 15,
  },

  iconInput: {
    position: 'absolute',
    left: 15,
    top: '34%',
    zIndex: 1,
  },
});

export default TemplateListAttendaceLog;

import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ListItemSubmission} from './ListItemSubmission';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../contants';
import {useDispatch, useSelector} from 'react-redux';
import {getListSubmissions} from '../../../redux/features/submissions/actions';

interface typeInputTextWithIcon {
  placeholder: string;
  icon?: any;
  right?: boolean;
  stylesProps?: any;
  onChangeText?: any;
  value?: string;
  editable?: boolean;
}

const CInputTextWithIconLabel = ({
  placeholder,
  icon,
  right,
  stylesProps,
  onChangeText,
  value,
  editable = true,
}: typeInputTextWithIcon) => {
  return (
    <View style={[styles.containerInputIconLabel, stylesProps]}>
      <View style={styles.containerInput}>
        {right ? (
          <View style={{position: 'absolute', top: '32%', right: '15%'}}>
            {icon}
          </View>
        ) : (
          <View>{icon}</View>
        )}
        <TextInput
          editable={editable}
          placeholderTextColor="#ccc"
          style={[styles.input, right ? styles.inputRight : styles.inputLeft]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
  );
};

const TemplateListOfSubmission = () => {
  const dispatch: any = useDispatch();
  const submissions = useSelector((state: any) => state.submissions);

  const {dataListSubmissions, page, take, order, statusListSubmissions} =
    submissions;

  useEffect(() => {
    dispatch(getListSubmissions());
  }, [page, take, order]);

  if (statusListSubmissions === 'process') {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.bgPrimary} />
      </View>
    );
  }

  if (statusListSubmissions === 'error') {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <Text>Somthing when wrong</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerTitleList}>
          <CInputTextWithIconLabel
            placeholder="Filter By Start date - End date"
            icon={
              <IconAntDesign
                style={styles.iconInput}
                name="search1"
                size={19}
                color="#B8B8B8"
              />
            }
            // onChangeText={(newText: string) => setEmail(newText)}
          />
        </View>
        <View>
          {dataListSubmissions.length === 0 ? (
            <Text>Data Kosong</Text>
          ) : (
            dataListSubmissions.map((item: any) => (
              <View key={item.id} style={{marginTop: 12}}>
                <ListItemSubmission item={item} />
              </View>
            ))
          )}
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
    elevation: 2,
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

export default TemplateListOfSubmission;

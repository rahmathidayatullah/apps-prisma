import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import {COLORS} from '../../contants';

interface typeInputTextWithIcon {
  placeholder: string;
  label: string;
  icon?: any;
  right?: boolean;
  stylesProps?: any;
  onChangeText?: any;
  value?: string;
  editable?: boolean;
}

const CInputTextWithIconLabel = ({
  placeholder,
  label,
  icon,
  right,
  stylesProps,
  onChangeText,
  value,
  editable = true,
}: typeInputTextWithIcon) => {
  return (
    <View style={[styles.containerInputIconLabel, stylesProps]}>
      <Text style={{color: '#AFAFAF', fontWeight: '500'}}>{label}</Text>
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

const PersonalInfo = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginTop: 10}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Fullname"
              editable={false}
              right
              value="Rahmat Hidayatullah"
            />
          </View>
          <View style={{marginTop: 10}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Role"
              editable={false}
              right
              value="Admin Puchasing"
            />
          </View>
          <View style={{marginTop: 10}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Email"
              editable={false}
              right
              value="rahmathidayatullah996@gmail.com"
            />
          </View>
          <View style={{marginTop: 10}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Gender"
              editable={false}
              right
              value="Laki - laki"
            />
          </View>
          <View style={{marginTop: 10}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Place Of Birth"
              editable={false}
              right
              value="Lampung"
            />
          </View>
          <View style={{marginTop: 10}}>
            <CInputTextWithIconLabel
              placeholder="Please input password"
              label="Mobile Phone"
              editable={false}
              right
              value="089630912247"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 18,
  },
  containerTitleList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // paddingTop: 15,
    paddingBottom: 15,
    // marginVertical: 10,
    borderRadius: 16,
    height: 50,
    flex: 1,
    color: COLORS.bgGrey,
    fontWeight: '600',
  },
  inputLeft: {
    paddingLeft: 50,
  },
  inputRight: {
    // paddingLeft: 15,
  },
});

export default PersonalInfo;

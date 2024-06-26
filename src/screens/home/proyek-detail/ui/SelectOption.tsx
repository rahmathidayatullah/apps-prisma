import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../../../../contants';

interface typeSelectOption {
  onChange: any;
  value: any;
  label?: string;
  placeholder?: string;
  dataOption?: any;
}

const CSelectOption = ({
  onChange,
  value,
  label,
  placeholder,
  dataOption = [],
}: typeSelectOption) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.containerInput}>
        <Text style={{color: COLORS.bgGrey}}>{label}</Text>
        <Dropdown
          key="value"
          style={styles.dropdown}
          data={dataOption}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  containerInput: {
    position: 'relative',
    flexDirection: 'column',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingTop: 15,
    paddingBottom: 15,
    marginVertical: 10,
    borderRadius: 4,
    height: 50,
    flex: 1,
    color: COLORS.bgGrey,
    paddingHorizontal: 16,
  },
});

export default CSelectOption;

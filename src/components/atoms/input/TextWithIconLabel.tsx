import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../../../contants';

interface typeInputTextWithIcon {
  placeholder: string;
  label: string;
  icon?: any;
}

const CInputTextWithIconLabel = ({
  placeholder,
  label,
  icon,
}: typeInputTextWithIcon) => {
  return (
    <View style={styles.containerInputIconLabel}>
      <Text style={{color: COLORS.bgGrey}}>{label}</Text>
      <View style={styles.containerInput}>
        {icon}
        <TextInput
          placeholderTextColor="#ccc"
          style={styles.input}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInputIconLabel: {
    width: '100%',
  },
  containerInput: {
    position: 'relative',
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    marginVertical: 10,
    borderRadius: 16,
    height: 50,
    paddingVertical: 0,
    flex: 1,
    color: COLORS.bgGrey,
  },
});

export default CInputTextWithIconLabel;

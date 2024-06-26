import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../../../contants';

interface typeInputText {
  placeholder: string;
  label: string;
  onChangeText?: any;
  value?: string;
  editable?: boolean;
  multiline?: boolean;
}

const CTextArea = ({
  placeholder,
  label,
  onChangeText,
  value,
  multiline = false,
}: typeInputText) => {
  return (
    <View style={[styles.containerInputIconLabel]}>
      <Text>{label}</Text>
      <View style={styles.containerInput}>
        <TextInput
          placeholderTextColor="#ccc"
          style={[styles.input, {height: 80}]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          multiline={multiline}
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
    marginVertical: 10,
    paddingLeft: 14,
    borderRadius: 16,
    flex: 1,
    color: COLORS.bgGrey,
    textAlignVertical: 'top',
  },
});
export default CTextArea;

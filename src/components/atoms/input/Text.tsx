import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface typeInputText {
  placeholder: string;
}

const CInputText = ({placeholder}: typeInputText) => {
  return <TextInput style={styles.input} placeholder={placeholder} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    marginVertical: 10,
    borderRadius: 16,
    height: 50,
    paddingVertical: 0,
    flex: 1,
  },
});

export default CInputText;

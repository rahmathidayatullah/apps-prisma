import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../contants';

interface typeInputTextWithIcon {
  placeholder: string;
  label: string;
  icon?: any;
  right?: boolean;
  stylesProps?: any;
  onChangeText?: any;
  value?: string;
  onPressInputContainer?: any;
  onPressInInput?: any;
}

const CInputTextWithIconLabelImage = ({
  placeholder,
  label,
  icon,
  right,
  stylesProps,
  onChangeText,
  value,
  onPressInputContainer,
  onPressInInput,
}: typeInputTextWithIcon) => {
  return (
    <View style={[styles.containerInputIconLabel, stylesProps]}>
      <Text style={{color: COLORS.bgGrey}}>{label}</Text>
      <View style={styles.containerInput}>
        {right ? (
          <View style={{position: 'absolute', top: '32%', right: '15%'}}>
            {icon}
          </View>
        ) : (
          <View>{icon}</View>
        )}
        <TouchableOpacity
          onPress={onPressInputContainer}
          style={{width: '100%'}}>
          <TextInput
            placeholderTextColor="#ccc"
            style={[styles.input, right ? styles.inputRight : styles.inputLeft]}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            onPressIn={onPressInInput}
            editable={false}
          />
        </TouchableOpacity>
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
    marginVertical: 10,
    borderRadius: 16,
    height: 50,
    flex: 1,
    color: COLORS.bgGrey,
  },
  inputLeft: {
    paddingLeft: 50,
  },
  inputRight: {
    paddingLeft: 15,
  },
});

export default CInputTextWithIconLabelImage;

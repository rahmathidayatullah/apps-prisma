import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS} from '../../../contants';

interface typeTextWithLabelIconDate {
  valueDefaultDate?: any;
  valueDate?: string;
  isShowPicker?: boolean;
  isRight?: boolean;
  onConfirmIOSDate?: any;
  onChangeDatePicker?: any;
  onPressInputContainer?: any;
  onChangeText?: any;
  onPressInInput?: any;
  onPressCancelIOS?: any;
  placeholder: string;
  label: string;
}

const TextWithLabelIconDate = ({
  valueDefaultDate,
  valueDate,
  isShowPicker,
  isRight,
  onConfirmIOSDate,
  onChangeDatePicker,
  onPressInputContainer,
  onChangeText,
  onPressInInput,
  onPressCancelIOS,
  placeholder,
  label,
}: typeTextWithLabelIconDate) => {
  return (
    <View>
      <View style={styles.containerInputIconLabel}>
        <Text style={{color: COLORS.bgGrey}}>{label}</Text>
        <View style={styles.containerInput}>
          {isRight ? (
            <View style={{position: 'absolute', top: '32%', right: '15%'}}>
              <IconFeather
                style={styles.iconInput}
                name="calendar"
                size={22}
                color="#B8B8B8"
              />
            </View>
          ) : (
            <View>
              <IconFeather
                style={styles.iconInput}
                name="calendar"
                size={22}
                color="#B8B8B8"
              />
            </View>
          )}
          <TouchableOpacity
            onPress={onPressInputContainer}
            style={{width: '100%'}}>
            <TextInput
              placeholderTextColor="#ccc"
              style={[
                styles.input,
                isRight ? styles.inputRight : styles.inputLeft,
              ]}
              placeholder={placeholder}
              onChangeText={onChangeText}
              value={valueDate}
              editable={false}
              onPressIn={onPressInInput}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingBottom: 10}}>
        {isShowPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={valueDefaultDate}
            style={styles.datePicker}
            onChange={onChangeDatePicker}
          />
        )}
      </View>
      {isShowPicker && Platform.OS === 'ios' && (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.pickerButton,
              {backgroundColor: '#11182711'},
            ]}
            onPress={onPressCancelIOS}>
            <Text style={[styles.buttonText, {color: COLORS.bgPrimary}]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.pickerButton,
              {backgroundColor: '#11182711'},
            ]}
            onPress={onConfirmIOSDate}>
            <Text style={[styles.buttonText, {color: COLORS.bgPrimary}]}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconInput: {
    position: 'absolute',
    left: 15,
    top: '33%',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 3,
    marginBottom: 15,
    backgroundColor: '#075985',
  },

  containerInputIconLabel: {
    width: '100%',
    flexDirection: 'column',
  },
  containerInput: {
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
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

export default TextWithLabelIconDate;

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {resetValueBottomSheet} from '../../redux/features/home/actions';
import {useDispatch} from 'react-redux';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

interface typeBottomSheetManual {
  children: any;
}

const BottomSheetManual = ({children}: typeBottomSheetManual) => {
  const dispatch: any = useDispatch();
  const closeModal = () => {
    dispatch(resetValueBottomSheet());
  };
  return (
    <View style={styles.backdrop}>
      <View style={styles.bottomSheet}>
        <TouchableOpacity
          style={{position: 'absolute', right: 35, top: 25, zIndex: 3}}
          onPress={closeModal}>
          <IconAntDesign name="closecircleo" size={19} color="#B8B8B8" />
        </TouchableOpacity>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  backdrop: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    width: '100%',
    height: '60%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
  },
});

export default BottomSheetManual;

import React from 'react';
import {Alert, Platform, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../../contants';
import {downloadFile, getDownloadPermissionAndroid} from '../../../../utils';
import RNFetchBlob from 'rn-fetch-blob';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const FileInputRead = ({label, file, fileName, onClear}: any) => {
  // Split the URL into base and path
  const [base, ...pathParts] = file.split('/');
  const path = pathParts.join('/');

  // Encode the path part
  const encodedPath = encodeURIComponent(path);

  // Replace encoded slashes with normal slashes
  const correctedEncodedPath = encodedPath.replace(/%2F/g, '/');

  // Combine the base and the encoded path
  const encodedUrl = `${base}/${correctedEncodedPath}`;

  return (
    <View style={{width: '100%', marginBottom: 10}}>
      <Text style={{color: COLORS.bgGrey}}>{label}</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          //   justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (Platform.OS === 'android') {
              getDownloadPermissionAndroid()
                .then(granted => {
                  if (granted) {
                    downloadFile(encodedUrl);
                  }
                })
                .catch(() => {
                  Alert.alert('ini bukan link url gambar');
                });
            } else {
              downloadFile(encodedUrl)
                .then((res: any) => {
                  RNFetchBlob.ios.previewDocument(res.path());
                })
                .catch(() => {
                  Alert.alert('ini bukan link url gambar');
                });
            }
          }}>
          <Text>{fileName}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClear}>
          <IconAntDesign name="closecircleo" size={24} color="#B8B8B8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FileInputRead;

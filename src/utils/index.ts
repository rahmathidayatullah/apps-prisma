export function formatRupiah(number: number) {
  return 'Rp. ' + number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export function getFileNameFromPath(filePath: string) {
  // Split the URL by '/' and get the segments
  const segments = filePath.split('/');

  // The name is in the segment before the last one
  const nameSegment = segments[segments.length - 2];

  // Split the name segment by '-' and get the second part
  const name = nameSegment.split('-')[1];

  return name;
}

// export const getFileNameFromPath = (filePath: string) => {
//   return filePath.split('/').pop();
// };

import RNFetchBlob from 'rn-fetch-blob';
import {Platform, PermissionsAndroid} from 'react-native';

/// grant permission in android
export const getDownloadPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'File Download Permission',
        message: 'Your permission is required to save Files to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
  } catch (err) {
    console.log('err', err);
  }
};

export const downloadFile = async (url: any) => {
  // Get the app's cache directory
  const {config, fs} = RNFetchBlob;
  const cacheDir = fs.dirs.DownloadDir;

  // Generate a unique filename for the downloaded image
  const filename = url.split('/').pop();
  const imagePath = `${cacheDir}/${filename}`;

  try {
    // Download the file and save it to the cache directory
    const configOptions: any = Platform.select({
      ios: {
        fileCache: true,
        path: imagePath,
        appendExt: filename.split('.').pop(),
      },
      android: {
        fileCache: true,
        path: imagePath,
        appendExt: filename.split('.').pop(),
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path: imagePath,
          description: 'File',
        },
      },
    });

    const response = await RNFetchBlob.config(configOptions).fetch('GET', url);

    // Return the path to the downloaded file
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function removeEmptyAttributes(obj: any) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    }
  }
  return obj;
}

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {uploadBerkasBooking} from '../redux/features/booking/actions';
import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
//
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const useMultipleFileUpload = ({bookingId, files, setFiles}: any) => {
  const [responseImage, setResponseImage] = useState<any>(null);
  const booking = useSelector((state: any) => state.booking);
  const {statusUploadBerkasBooking, fileKey} = booking;
  const dispatch: any = useDispatch();

  const uploadFile = async (fileKey: any) => {
    if (fileKey !== 'file11') {
      let options: any = {
        mediaType: 'photo',
        quality: 0,
        includeBase64: true,
      };

      launchImageLibrary(options, (response: any) => {
        if (response.didCancel) {
          // Alert.alert('User canceled image picker');
          return;
        } else if (response.error) {
          Alert.alert(`${JSON.stringify(response.error)}`);
          return;
        }
        const fileData = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
        // setFiles((prevFiles: any) => ({
        //   ...prevFiles,
        //   [fileKey]: {
        //     name: response.assets[0].fileName,
        //     file: fileData,
        //     key: files[fileKey].key,
        //   },
        // }));
        setResponseImage(response);
        const body = {[files[fileKey].key]: fileData};
        dispatch(uploadBerkasBooking(bookingId, body, fileKey));
      });
    } else {
      try {
        const pickedFile = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.allFiles],
        });
        // console.log('pickedFile', pickedFile);
        // {
        //   "fileCopyUri": null,
        //   "name": "flpp.docx",
        //   "size": 621892,
        //   "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        //   "uri": "file:///Users/rahmathidayatullah/Library/Developer/CoreSimulator/Devices/952F5565-F6A5-4870-8E11-C492BE03371C/data/Containers/Data/Application/E46D6098-2C99-4DCA-A57B-E3D5FF8F077F/tmp/com.prismaproperties.ios-Inbox/flpp.docx"
        // }

        setResponseImage(pickedFile);

        await RNFS.readFile(pickedFile.uri, 'base64').then(data => {
          // console.log('base64', data);
          const body = {
            [files[fileKey].key]: `data:${pickedFile.type};base64,${data}`,
          };
          dispatch(uploadBerkasBooking(bookingId, body, fileKey));
        });
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // console.log(err);
        } else {
          Alert.alert(JSON.stringify(err));
          // console.log(err);
          throw err;
        }
      }
    }

    // ImageCropPicker.openPicker({
    //   // width: 300,
    //   // height: 400,

    //   cropping: true,
    //   includeBase64: true,
    // })
    //   .then((image: any) => {
    //     const fileName = getFileNameFromPath(image.path);
    //     const fileData = `data:${image.mime};base64,${image.data}`;
    //     setFiles((prevFiles: any) => ({
    //       ...prevFiles,
    //       [fileKey]: {
    //         name: fileName,
    //         file: `data:${image.mime};base64,${image.data}`,
    //       },
    //     }));

    //     const body = {[files[fileKey].key]: fileData};
    //     dispatch(uploadBerkasBooking(bookingId, body));
    //   })
    //   .catch(err => {
    //     Alert.alert(
    //       `Gagal upload file ${[
    //         files[fileKey].key,
    //       ]}, Silakan coba upload ulang, atau gunakan file lain`,
    //     );
    //     clearFile(fileKey);
    //   });
  };

  const clearFile = (fileKey: any) => {
    setFiles((prevFiles: any) => ({
      ...prevFiles,
      [fileKey]: {
        name: '',
        file: '',
        key: files[fileKey].key,
      },
    }));
  };

  useEffect(() => {
    if (statusUploadBerkasBooking === 'success') {
      console.log('fileKey', fileKey);
      setFiles((prevFiles: any) => ({
        ...prevFiles,
        [fileKey]: {
          name:
            fileKey !== 'file11'
              ? responseImage.assets[0].fileName
              : responseImage.name,
          file:
            fileKey !== 'file11'
              ? `data:${responseImage.assets[0].type};base64,${responseImage.assets[0].base64}`
              : 'file doc',
          key: files[fileKey].key,
        },
      }));
    }
  }, [statusUploadBerkasBooking]);

  return {
    files,
    uploadFile,
    clearFile,
  };
};

export default useMultipleFileUpload;

// initial from api

// import { useState, useEffect } from 'react';
// import ImageCropPicker from 'react-native-image-crop-picker';
// import axios from 'axios';

// const useMultipleFileUpload = () => {
//   const [files, setFiles] = useState({
//     file1: { name: null, file: '', key: 'slip_gajih' },
//     file2: { name: null, file: '', key: 'slip_koran' },
//   });

//   useEffect(() => {
//     // Fetch data from API and initialize file inputs
//     axios.get('https://api.example.com/your-endpoint')
//       .then(response => {
//         const { slip_gajih, slip_koran } = response.data;

//         setFiles({
//           file1: {
//             name: getFileNameFromPath(slip_gajih),
//             file: slip_gajih,
//             key: 'slip_gajih',
//           },
//           file2: {
//             name: getFileNameFromPath(slip_koran),
//             file: slip_koran,
//             key: 'slip_koran',
//           },
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching data from API', error);
//       });
//   }, []);

//   const uploadFile = (fileKey) => {
//     ImageCropPicker.openPicker({
//       width: 300,
//       height: 400,
//       cropping: true,
//       includeBase64: true,
//     }).then((image) => {
//       const fileName = getFileNameFromPath(image.path);
//       setFiles((prevFiles) => ({
//         ...prevFiles,
//         [fileKey]: {
//           ...prevFiles[fileKey],
//           name: fileName,
//           file: `data:${image.mime};base64,${image.data}`,
//         },
//       }));
//     });
//   };

//   const clearFile = (fileKey) => {
//     setFiles((prevFiles) => ({
//       ...prevFiles,
//       [fileKey]: {
//         ...prevFiles[fileKey],
//         name: '',
//         file: '',
//       },
//     }));
//   };

//   return {
//     files,
//     uploadFile,
//     clearFile,
//   };
// };

// export default useMultipleFileUpload;

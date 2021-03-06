import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {ListItem, CheckBox} from 'react-native-elements';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from '../../constants/colors';
import constants from '../../constants';
import toTimestamp from '../../utils/getDiscountEndTs';
import T from 'prop-types';
import * as DocumentPicker from 'expo-document-picker';

type ImageType = {
  filename: string,
  path : string,
  size : number,
}

const S = StyleSheet.create({
  title: {
    padding: 10,
    fontSize: 13,
  },
  subtitle: {
    paddingHorizontal: 10,
    color: 'gray',
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'black',
    height: constants.DEVICE_WIDTH * 0.5,
  },
  imageRow: {
    flexDirection: 'row',
    width: '100%',
    // height: constants.DEVICE_WIDTH * 0.5,
    flexWrap: 'wrap',
  },
  closeBtn: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 2,
  },
  imageBlock: {
    width: '50%',
    padding: 10,
  },
});

const ImagePickerRow = ({
  id,
  title,
  subtitle,
  onPress,
  titleStyle = {},
  imageExample,
  onImageUpload,
  source = {},
  imgs = [],
  multiple = false,
}) => {
  // let [image, setImage ] = useState({uri:  "https://via.placeholder.com/250x250?text=click-to-upload"})
  // let [images, setImages ] = useState([])
  let [image, setImage] = useState(source);
  let [images, setImages] = useState(imgs);
  let [lastUpdate, setLastUpdate] = useState(Date.now());

  const fileChangedHandler = event => {
    console.log('fileChangedHandler event',event)
    // this.setState({ selectedFile: event.target.files[0] })
  }
  
 const uploadHandler = () => {
    // console.log(this.state.selectedFile)
  }

  const options = {
    title: 'Select photo',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const deleteImage = () => {};

  const removeFromImages = i => {
    // console.log('removeFromImages', i);
    images.splice(i, 1);
    // console.log('new images length ', images.length);
    setImages(images);
    setLastUpdate(Date.now());
  };

  const uploadPictures = () => {
    DocumentPicker
    .getDocumentAsync({
      type: "image/*",
      multiple: true
    })
    .then(imgs => {
          setImages([...images, ...imgs]);
          // console.log(images);
      }
    )
    // ImagePicker.openPicker({
    //   multiple: true,
    //   // includeBase64: true
    // }).then(imgs => {
    //   setImages([...images, ...imgs]);
    //   // console.log(images);
    // });
  };

  const uploadPicture = () => {
    DocumentPicker
    .getDocumentAsync({
      type: "image/*",
    })
    .then( image => {
        image.filename = image.name
        image.path = image.uri
        setImage(image);
        // console.log(image);
        if (onImageUpload) {
          onImageUpload(image);
        }
    })
    // ImagePicker.openPicker({
    //   // includeBase64: true
    // }).then(image => {
    //   setImage(image);
    //   // console.log(image);
    //   if (onImageUpload) {
    //     onImageUpload(image);
    //   }
    // });
    // ImagePicker.showImagePicker(options, (response) => {
    //     // console.log('Response = ', response);

    //     if (response.didCancel) {
    //     //   console.log('User cancelled image picker');
    //     } else if (response.error) {
    //     //   console.log('ImagePicker Error: ', response.error);
    //     } else if (response.customButton) {
    //     //   console.log('User tapped custom button: ', response.customButton);
    //     } else {
    //       const source = { uri: response.uri };

    //       // You can also display the image using data:
    //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //       setSource(source)
    //       if(onSourceChange){
    //         onSourceChange(source)
    //       }
    //     }
    //   });
  };

  return (
    <View>
      <Text style={[S.title, titleStyle]}>{title}</Text>
      {subtitle && subtitle.length > 0 && (
        <Text style={S.subtitle}>{subtitle}</Text>
      )}
      <View style={S.imageRow}>
        {multiple &&
          images.map((image, i) => {
            return (
              <View key={i} style={S.imageBlock}>
                <TouchableOpacity
                  style={S.closeBtn}
                  onPress={() => removeFromImages(i)}>
                  <AntDesign name="close" size={25} />
                </TouchableOpacity>
                <Image
                  source={{uri: image.path}}
                  style={S.image}
                  resizeMode="contain"
                />
              </View>
            );
          })}
        <View style={{width: '50%', padding: 10}}>
          {multiple ? (
            <TouchableOpacity onPress={uploadPictures}>
              <Image
                source={{
                  uri:
                    'https://via.placeholder.com/250x250?text=click-to-upload',
                }}
                style={S.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            // <>
            // <input type="file" onChange={fileChangedHandler}/>
            // <button onClick={uploadHandler}>Upload!</button>
            // <img id="myImg" src="#" alt="your image" />
            // <br/>
            // </>
            <TouchableOpacity onPress={uploadPicture}>
              <Image
                source={{uri: image.path}}
                style={S.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
        {imageExample && (
          <View style={{width: '50%', padding: 10}}>
            <Image source={imageExample} style={S.image} resizeMode="contain" />
          </View>
        )}
      </View>
    </View>
  );
};

ImagePickerRow.propTypes = {
  title: T.string,
  subtitle: T.string,
  onPress: T.func,
  onImageUpload: T.func,
  imageExample: T.object,
  titleStyle: T.object,
  multiple: T.bool,
};

export default ImagePickerRow;

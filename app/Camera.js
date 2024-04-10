import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const CameraScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasCameraRollPermission, setHasCameraRollPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      if (Platform.OS === 'ios') {
        const rollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasCameraRollPermission(rollStatus.status === 'granted');
      } else {
        setHasCameraRollPermission(true);
      }
    })();
  }, []);

  const handleCameraTypePress = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleTakePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
    }
  };

  const handleChooseImagePress = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.error('Error picking image from library:', error);
    }
  };

  if (hasCameraPermission === null || hasCameraRollPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false || hasCameraRollPermission === false) {
    return <Text>No access to camera or camera roll</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.cameraPreview} type={cameraType} ref={cameraRef}>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCameraTypePress}
          >
            <Ionicons name="camera-reverse-sharp" size={30} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
            <Ionicons name="camera" size={30} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleChooseImagePress}
          >
            <Ionicons name="image-sharp" size={30} color="white"/>
          </TouchableOpacity>
        </View>
      </Camera>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraPreview: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    marginLeft: 70,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default CameraScreen;

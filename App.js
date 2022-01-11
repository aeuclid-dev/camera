import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import CameraRoll from "@react-native-community/cameraroll";

export default function App() {
  let camera = null;

  const [ cameraPermission, setCameraPermission ] = useState();
  const [ microphonePermission, setMicrophonePermission ] = useState();
  const [ hasStoragePermission, setHasStoragePermission ] = useState();

  useEffect(() => {
    async () => {
      const newCameraPermission = await Camera.requestCameraPermission();
      const newMicrophonePermission = await Camera.requestMicrophonePermission();
      const hasStoragePermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      setCameraPermission(newCameraPermission);
      setMicrophonePermission(newMicrophonePermission);
      setHasStoragePermission(hasStoragePermission);
    }, [cameraPermission, microphonePermission, hasStoragePermission];
    
  });

  const devices = useCameraDevices()
  const device = devices.back

  if(!device){
    return <View />
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={async () => {
          const photo = await camera.takePhoto();
          await CameraRoll.save(`file://${photo.path}`);
        }}>
        <Camera ref = {ref => camera = ref }
          device={device}
          isActive={true}
          photo={true}
          style={StyleSheet.absoluteFill}>
        </Camera>
      </TouchableOpacity>
    </View>
  );
}

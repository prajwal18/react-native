import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import {
  Camera,
  CameraType,
  CameraCapturedPicture,
  CameraView,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";

// Define types for the state
interface ImageScannerState {
  hasCameraPermission: boolean | null;
  hasMediaLibraryPermission: boolean | null;
  camera: any;
  image: string | null;
}

export default function ImageScanner() {
  // State initialization with types
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | null
  >(null);
  const [camera, setCamera] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const mediaLibraryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo: CameraCapturedPicture = await camera.takePictureAsync();
      setImage(photo.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const { uri } = result.assets[0];
      setImage(uri);
    }
  };

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting permissions...</Text>
      </View>
    );
  }
  if (hasCameraPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }
  if (hasMediaLibraryPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to media library</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {hasCameraPermission && (
          <View>
            <CameraView
              style={styles.camera}
              ref={(ref: any) => setCamera(ref)}
            />
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Take Picture" onPress={takePicture} />
        <Button title="Pick Image from Gallery" onPress={pickImage} />
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  cameraContainer: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  camera: {
    minWidth: 300, // Set width to 100% of its parent container
    minHeight: 600, // Set height to 100% of its parent container
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

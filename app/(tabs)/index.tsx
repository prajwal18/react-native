// app/(tabs)/index.js
import ImageScanner from "@/components/scanner/ImageScanner";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Best Image Scanner</Text>
      <ImageScanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  title: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center",
  },
});

export default HomeScreen;

import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { saveAs } from "../utils/exportFormat";

const DownloadOptions = ({ base64Img }: { base64Img: string }) => {
  const options = ["pdf", "png"];

  const handleSelect = (e: any) => {
    const type = options[e];
    saveAs(base64Img, type);
  };

  return (
    <View style={styles.container}>
      <ModalDropdown
        options={options}
        defaultValue="Download As"
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownMenu}
        onSelect={handleSelect}
        renderRow={(option: string) => (
          <View style={styles.dropdownRow}>
            <Text>{option}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  dropdown: {
    width: 200,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownMenu: {
    width: 200,
    height: 150,
  },
  dropdownRow: {
    padding: 10,
  },
});

export default DownloadOptions;

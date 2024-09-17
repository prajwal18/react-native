import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { PDFDocument } from "pdf-lib";

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
}

const saveAsPDF = async (base64String: string) => {
  const fileName = generateRandomString(8);
  const fullFileName = `${fileName}.pdf`;

  try {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Add a page to the PDF
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    // Embed the base64 image into the PDF
    const imgBytes = await fetch(`data:image/png;base64,${base64String}`).then(
      (res) => res.arrayBuffer()
    );
    const image = await pdfDoc.embedPng(imgBytes);

    // Get the dimensions of the image
    const { width: imgWidth, height: imgHeight } = image;

    // Draw the image on the PDF page
    page.drawImage(image, {
      x: 0,
      y: height - imgHeight,
      width: imgWidth,
      height: imgHeight,
    });

    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();

    // Write the PDF bytes to a file
    const fileUri = FileSystem.documentDirectory + "image.pdf";
    await FileSystem.writeAsStringAsync(fileUri, fullFileName, {
      encoding: FileSystem.EncodingType.Base64,
    });

    Alert.alert("Success", `PDF saved to: ${fileUri}`);
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Failed to create PDF");
  }
};

const saveAsPng = async (base64String: string) => {
  const fileName = generateRandomString(8);
  const fullFileName = `${fileName}.png`;
  try {
    // Define the file URI
    const fileUri = FileSystem.documentDirectory + fullFileName;

    // Write the base64 string to the file
    await FileSystem.writeAsStringAsync(fileUri, base64String, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Check if sharing is available
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      Alert.alert("Error", "Sharing is not available on this device.");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Failed to convert and download the image.");
  }
};

const saveAs = (base64img: string, format: string) => {
  if (format == "png") {
    saveAsPng(base64img);
  } else if (format == "pdf") {
    saveAsPDF(base64img);
  }
};

export { saveAs };

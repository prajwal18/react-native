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
    // Create HTML content
    const htmlContent = `
      <html>
        <body>
          <img src="data:image/png;base64,${base64String}" style="width:100%; height:auto;" />
        </body>
      </html>
    `;

    // Create a Blob and a URL for the PDF
    const blob = new Blob([htmlContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = fullFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(error);
    alert("Error: Failed to create PDF");
  }
};

const saveAsPng = async (base64String: string) => {
  const fileName = generateRandomString(8);
  const fullFileName = `${fileName}.png`;

  try {
    // Ensure the base64 string does not include the data URL prefix
    const base64WithoutPrefix = base64String.split(",")[1]; // Remove 'data:image/png;base64,' if included
    const byteString = atob(base64WithoutPrefix);

    const ab = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ab[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: "image/png" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = fullFileName;
    document.body.appendChild(link);
    link.click();

    // Clean up the DOM and revoke the object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert("Success! Image saved as: " + fullFileName);
  } catch (error) {
    console.error(error);
    alert("Error: Failed to convert and download the image.");
  }
};

const saveAs = (base64img: string, format: string) => {
  if (format === "png") {
    saveAsPng(base64img);
  } else if (format === "pdf") {
    saveAsPDF(base64img);
  }
};

export { saveAs };

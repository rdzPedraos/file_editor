import { useState, useEffect } from "react";

const FileDisplay = ({ selectedFile }) => {
  const [fileContent, setFileContent] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(selectedFile);

      const url = URL.createObjectURL(selectedFile);
      setDownloadUrl(url);
    }
  }, [selectedFile]);

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = selectedFile.name;
      link.click();
    }
  };

  return (
    <div>
      <h2>File Display</h2>
      <p>File Name: {selectedFile ? selectedFile.name : "No file selected"}</p>
      <pre>{fileContent}</pre>
      {selectedFile && <button onClick={handleDownload}>Download File</button>}
    </div>
  );
};

export default FileDisplay;

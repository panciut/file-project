// frontend/src/components/FileSelector.js

import React, { useState } from "react";

function FileSelector({ onAddFiles }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const paths = files.map((file) => {
      const path = file.webkitRelativePath || file.relativePath || file.name;
      return path;
    });
    setSelectedFiles(paths);
  };

  const handleAddFiles = () => {
    onAddFiles(selectedFiles);
  };

  return (
    <div>
      <h3>Add Files to Project</h3>
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        multiple
        onChange={handleFileChange}
      />
      <button onClick={handleAddFiles}>Add Selected Files</button>
    </div>
  );
}

export default FileSelector;

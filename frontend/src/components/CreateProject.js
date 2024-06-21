// frontend/src/components/CreateProject.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [basePath, setBasePath] = useState("");
  const navigate = useNavigate();

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/api/createProject",
        { projectName, basePath }
      );
      alert(response.data.message);
      navigate("/load");
    } catch (error) {
      console.error("Error creating project:", error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error creating project. Please try again.");
      }
    }
  };

  const handleBasePathChange = (e) => {
    if (e.target.files.length > 0) {
      const fullPath = e.target.files[0].webkitRelativePath;
      const baseDir = fullPath.split("/")[0];
      setBasePath(baseDir);
    }
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <form onSubmit={handleCreateProject}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Base Path:</label>
          <input
            type="file"
            webkitdirectory="true"
            directory="true"
            onChange={handleBasePathChange}
            required
          />
        </div>
        <button type="submit">Save Project</button>
      </form>
    </div>
  );
}

export default CreateProject;

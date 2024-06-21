// frontend/src/components/LoadProject.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import FileSelector from "./FileSelector";

function LoadProject() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/configs");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleLoadProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/api/loadProject",
        { projectName: selectedProject }
      );
      setProjectDetails(response.data);
    } catch (error) {
      console.error("Error loading project:", error);
      alert("Error loading project. Please try again.");
    }
  };

  const handleAddFiles = async (srcPaths) => {
    try {
      const response = await axios.post("http://localhost:3002/api/addFiles", {
        projectName: selectedProject,
        srcPaths,
      });
      alert("Files added successfully");
      setProjectDetails((prevDetails) => ({
        ...prevDetails,
        srcPaths: [...new Set([...prevDetails.srcPaths, ...srcPaths])],
      })); // Update project details
    } catch (error) {
      console.error("Error adding files:", error);
      alert("Error adding files. Please try again.");
    }
  };

  return (
    <div>
      <h2>Load Existing Project</h2>
      <form onSubmit={handleLoadProject}>
        <div>
          <label>Select Project:</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            required
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Load Project</button>
      </form>
      {projectDetails && (
        <div>
          <h3>Project Details</h3>
          <p>
            <strong>Base Path:</strong> {projectDetails.basePath}
          </p>
          <p>
            <strong>Source Paths:</strong>
          </p>
          <ul>
            {projectDetails.srcPaths && projectDetails.srcPaths.length > 0 ? (
              projectDetails.srcPaths.map((path, index) => (
                <li key={index}>{path}</li>
              ))
            ) : (
              <li>No files added yet</li>
            )}
          </ul>
          <FileSelector onAddFiles={handleAddFiles} />
        </div>
      )}
    </div>
  );
}

export default LoadProject;

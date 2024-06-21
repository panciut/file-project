// backend/src/routes.js

const express = require("express");
const { listConfigs, saveConfig, loadConfig } = require("./configManager");

const router = express.Router();

router.get("/api/configs", (req, res) => {
  try {
    const configs = listConfigs();
    res.json(configs);
  } catch (error) {
    console.error("Error fetching configs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/api/createProject", (req, res) => {
  try {
    const { projectName, basePath } = req.body;
    const config = {
      basePath,
      srcPaths: [],
    };
    saveConfig(projectName, config);
    res.json({ message: `Project ${projectName} saved.` });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/api/loadProject", (req, res) => {
  try {
    const { projectName } = req.body;
    const config = loadConfig(projectName);
    if (config) {
      res.json(config);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    console.error("Error loading project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/api/addFiles", (req, res) => {
  try {
    const { projectName, srcPaths } = req.body;
    const config = loadConfig(projectName);
    if (config) {
      // Filter out empty strings from srcPaths before saving
      config.srcPaths = [
        ...new Set([...config.srcPaths, ...srcPaths.filter((path) => path)]),
      ];
      saveConfig(projectName, config);
      res.json({ message: `Files added to project ${projectName}.`, config });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    console.error("Error adding files:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

// backend/src/configManager.js

const fs = require("fs");
const path = require("path");

const PROJECTS_DIR = path.resolve(__dirname, "../projects");

function getConfigFilePath(projectName) {
  return path.join(PROJECTS_DIR, `${projectName}.json`);
}

function saveConfig(projectName, config) {
  const configFilePath = getConfigFilePath(projectName);
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
}

function loadConfig(projectName) {
  const configFilePath = getConfigFilePath(projectName);
  if (fs.existsSync(configFilePath)) {
    return JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
  }
  return null;
}

function listConfigs() {
  return fs
    .readdirSync(PROJECTS_DIR)
    .map((file) => path.basename(file, ".json"));
}

module.exports = {
  saveConfig,
  loadConfig,
  listConfigs,
};

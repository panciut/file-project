const fs = require("fs");
const path = require("path");
const { loadConfig } = require("./configManager");

function copyFilesToSingleFile(
  srcPaths,
  outputFile,
  basePath,
  filterFn = () => true
) {
  console.time(`Copying to ${outputFile}`);
  const writeStream = fs.createWriteStream(path.join(basePath, outputFile), {
    flags: "w",
  }); // Updated path

  srcPaths.forEach((srcPath) => {
    const absoluteSrcPath = path.resolve(__dirname, "../", srcPath); // Updated path
    if (fs.existsSync(absoluteSrcPath)) {
      if (fs.statSync(absoluteSrcPath).isDirectory()) {
        copyDirectory(basePath, absoluteSrcPath, writeStream, filterFn); // Updated path
      } else if (fs.statSync(absoluteSrcPath).isFile()) {
        const relativePath = `./${path.relative(basePath, absoluteSrcPath)}`;
        if (filterFn(relativePath)) {
          copyFile(absoluteSrcPath, relativePath, writeStream);
        }
      }
    } else {
      console.error(`Path does not exist: ${absoluteSrcPath}`);
    }
  });

  writeStream.end(() => {
    console.timeEnd(`Copying to ${outputFile}`);
  });
}

function copyDirectory(baseDir, currentDir, writeStream, filterFn) {
  const files = fs.readdirSync(currentDir);
  files.forEach((file) => {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      copyDirectory(baseDir, fullPath, writeStream, filterFn);
    } else if (fs.statSync(fullPath).isFile()) {
      const relativePath = `./${path.relative(baseDir, fullPath)}`;
      if (filterFn(relativePath)) {
        copyFile(fullPath, relativePath, writeStream);
      }
    }
  });
}

function copyFile(filePath, relativePath, writeStream) {
  writeStream.write(`# ${relativePath}\n`);
  const data = fs.readFileSync(filePath, "utf-8");
  writeStream.write(data + "\n\n");
}

function copyProjectFiles(projectName) {
  const config = loadConfig(projectName);
  if (!config) {
    console.error(`No configuration found for project: ${projectName}`);
    return;
  }

  const projectsDir = path.resolve(__dirname, "../projects"); // Updated path
  copyFilesToSingleFile(
    config.srcPaths,
    "all.md",
    projectsDir,
    (relativePath) => {
      // Adjust filter function if needed
      return true; // Example filter function, you may adjust as per your requirements
    }
  );
}

module.exports = {
  copyProjectFiles,
};

const fs = require('fs').promises;
const path = require('path');
const logger = require('./utils/logger')('file_sync');

const copyFiles = async (sourceDir, targetDir, currentDir = '') => {
  try {
    // Read the contents of the current directory
    const files = await fs.readdir(path.join(sourceDir, currentDir));

    for (const file of files) {
      const sourcePath = path.join(sourceDir, currentDir, file);
      const targetPath = path.join(targetDir, currentDir, file);

      // Check if the current path is a directory
      const stats = await fs.stat(sourcePath);

      // If it is a directory, create the directory in the target directory
      if (stats.isDirectory()) {
        await fs.mkdir(targetPath, { recursive: true });
        await copyFiles(sourceDir, targetDir, path.join(currentDir, file));

        // Skip the rest of the loop if the current path is a directory
        continue;
      }

      try {
        await fs.access(targetPath);
        logger.warn(`File ${file} already exists in target directory.`);
      } catch (error) {
        await fs.copyFile(sourcePath, targetPath);
        logger.info(`Copied ${file} to target directory.`);
      }
    }
  } catch (error) {
    logger.error(`Error copying files: ${error.message}`);
  }
};

const start = async () => {
  const sourceDir = path.join(__dirname, 'source');
  const targetDir = path.join(__dirname, 'target');

  await copyFiles(sourceDir, targetDir);
};

module.exports = {
  start,
};

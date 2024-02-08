function createLogMessage(moduleName, args) {
  return `${new Date().toISOString()} ${moduleName}: ${args.join(' ')}\n`;
}

module.exports = {
  createLogMessage,
};

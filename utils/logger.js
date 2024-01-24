function logger(moduleName) {
  return {
    info: (...args) => console.log(`${moduleName}:`, ...args),
    warn: (...args) => console.warn(`${moduleName}:`, ...args),
    error: (...args) => console.error(`${moduleName}:`, ...args)
  };
}

module.exports = logger;

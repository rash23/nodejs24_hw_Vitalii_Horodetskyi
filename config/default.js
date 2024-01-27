const logLevel = process.env.LOG_LEVEL || 'warn';
const colorsEnabled = process.env.COLORS_ENABLED || 0;

module.exports = {
  logLevel,
  colorsEnabled,
};

const logLevel = process.env.LOG_LEVEL || 'warn';
const colorsEnabled = process.env.COLORS_ENABLED || 0;
const port = process.env.PORT || 3000;

module.exports = {
  logLevel,
  colorsEnabled,
  port,
};

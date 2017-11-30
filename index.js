const commandLineArgs = require('command-line-args')
const getUsage = require('command-line-usage')
const commandLineOptions = require('./assets/commandLineOptions')
const colorConfig = require('./assets/colorConfig')
var colors = require('colors')

colors.setTheme(colorConfig)

var options
try {
  options = commandLineArgs(commandLineOptions.definitions)
} catch (e) {
  console.error(colors.error(e.message))
  console.error(getUsage(commandLineOptions.sections))
  process.exit(1)
}

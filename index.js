const commandLineArgs = require('command-line-args')
const getUsage = require('command-line-usage')
const commandLineOptions = require('./assets/commandLineOptions')
const colorConfig = require('./assets/colorConfig')
var colors = require('colors')
const path = require('path')
const fs = require('fs')
const jsmetrics = require('./lib/jsmetrics')

colors.setTheme(colorConfig)

var walkSync = function (dir, filelist) {
  var files = fs.readdirSync(dir)
  filelist = filelist || []
  files.forEach(function (file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist)
    } else if (path.extname(dir + file) === '.js') {
      filelist.push(path.resolve(dir + file))
    }
  })
  return filelist
}

function gatherSourceFiles (paths) {
  var normalizedAbsPaths = []
  for (var i = 0; i < paths.length; i++) {
    if (fs.existsSync(paths[i])) {
      if (fs.lstatSync(paths[i]).isDirectory()) {
        normalizedAbsPaths = normalizedAbsPaths.concat(walkSync(paths[i]))
      } else if (fs.lstatSync(paths[i]).isFile() && path.extname(paths[i]) === '.js') {
        normalizedAbsPaths.push(path.resolve(paths[i]))
      }
    }		else {
      console.warn(paths[i] + ' does not exists.')
    }
  }

  return normalizedAbsPaths
}

var options
try {
  options = commandLineArgs(commandLineOptions.definitions)
} catch (e) {
  console.error(colors.error(e.message))
  console.error(getUsage(commandLineOptions.sections))
  process.exit(1)
}

if (options.help) {
  console.error(getUsage(commandLineOptions.sections))
  process.exit()
}

if (!options.input) {
  console.error(colors.error('At least one input should be passed'))
  console.error(getUsage(commandLineOptions.sections))
  process.exit()
}

var sourceFiles = gatherSourceFiles(options.input)
if (sourceFiles.length < 1) {
  console.error(colors.error('At least one valid input is needed'))
  process.exit(1)
}

// perform esprima parsing on the source files
console.log(sourceFiles)
for (var i = 0; i < sourceFiles.length; i++) {
  jsmetrics.calculateMetrics(sourceFiles[i])
}

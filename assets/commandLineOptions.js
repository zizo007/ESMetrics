const definitions = [
  { name: 'help', alias: 'h' },
  { name: 'input', alias: 'i', type: String, multiple: true, defaultOption: true },
  { name: 'ast', alias: 'a', type: String}
]

module.exports.definitions = definitions

module.exports.sections = [
  {
    header: 'JSMetrics',
    content: 'A static source code metric calculator.'
  },
  {
    header: 'Options',
    optionList: definitions
  }
]

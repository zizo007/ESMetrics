const definitions = [
  { name: 'help', alias: 'h', type: Boolean, description: 'Prints out this help.'},
  { name: 'input', alias: 'i', type: String, multiple: true, defaultOption: true, description: 'A list of javascript files/directories to be analyzed.' }/*,
  { name: 'ast', alias: 'a', type: String, description: 'An esprima AST'} */
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

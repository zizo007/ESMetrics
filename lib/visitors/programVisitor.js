var globals = require('../globalInfo')

module.exports.enter = function (node, parent) {
  node.metrics = {}
	// Esprima sets the start of the program to the first non-empty and non-comment line which distorts the loc metric
  node.loc.start.line = 1
}

module.exports.leave = function (node, parent) {
  node.metrics.loc = node.loc.end.line - node.loc.start.line + 1
}

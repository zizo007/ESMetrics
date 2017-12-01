var globals = require('../globalInfo')

module.exports.enter = function (node, parent) {
  node.metrics = {}
}

module.exports.leave = function (node, parent) {
  node.metrics.loc = node.loc.end.line - node.loc.start.line + 1
}

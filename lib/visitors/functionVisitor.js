var globals = require('../globalInfo')

module.exports.enter = function (node, parent) {
  var functionInfo = {};
  functionInfo.node = node;
  functionInfo.lines = [];

  pushToFunctionStack(functionInfo)
  node.metrics = {}
}

module.exports.leave = function (node, parent) {
  node.metrics.loc = node.loc.end.line - node.loc.start.line + 1
}

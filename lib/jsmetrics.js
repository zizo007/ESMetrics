const estraverse = require('estraverse')
const util = require('util')

function visitNode (node, parent, enter) {
  var visitor
  if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration') {
    visitor = require('./visitors/functionVisitor')
  } else if (node.type === 'ClassExpression' || node.type === 'ClassDeclaration') {
    visitor = require('./visitors/classVisitor')
  } /*else if (node.type === 'MethodDefinition') {
    visitor = require('./visitors/methodVisitor')
  }*/ else if (node.type === 'Program') {
    visitor = require('./visitors/programVisitor')
  } else {
    visitor = require('./visitors/generalVisitor')
  }

  // if not interested in node type
  if (visitor === undefined) {
    return
  }

  if (enter) {
    visitor.enter(node, parent)
  } else {
    visitor.leave(node, parent)
  }
}

module.exports.calculateMetrics = function (asts) {
  for (var i = 0; i < asts.length; i++) {
    estraverse.traverse(asts[i], {
      enter: function (node, parent) {
        visitNode(node, parent, true)
      },
      leave: function (node, parent) {
        visitNode(node, parent, false)
      }
    })
    console.log(util.inspect(asts[i], {depth: null}))
  }
}

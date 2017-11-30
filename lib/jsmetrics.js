const esprima = require('esprima')
const estraverse = require('estraverse')
const util = require('util')

module.exports.calculateMetrics = function (ast, options) {
  ast = esprima.parseScript('function asd(){return 42;}', { loc: true })

  console.log(util.inspect(ast, { depth: null }))

  estraverse.traverse(ast, {
    enter: function (node, parent) {

    },
    leave: function (node, parent) {
      if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration') {
        node.metrics = {}
        node.metrics.loc = node.loc.end.line - node.loc.start.line + 1
      }
    }
  })

  console.log(util.inspect(ast, { depth: null }))
}

const esprima = require('esprima')
const estraverse = require('estraverse')
const util = require('util')
const fs = require('fs')

function parse (sourceCode) {
  var ast
  try {
    ast = esprima.parseScript(sourceCode, {loc: true})
  } catch (e) {
    try {
      ast = esprima.parseScript(sourceCode, {loc: true})
    } catch (err) {
      return null
    }
  }
  return ast
}

module.exports.calculateMetrics = function (sourceFile) {
  var fileContent = fs.readFileSync(sourceFile, 'utf8')
  console.log(fileContent)
  var ast = parse(fileContent)

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

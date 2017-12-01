var functionStack = [];
var classStack = [];


module.exports.clearFunctionStack = function(){
	functionStack = [];
}

module.exports.clearClassStack = function(){
	classStack = [];
}

module.exports.pushToFunctionStack = function(node){
	functionStack.push(node)
}

module.exports.pushToClassStack = function(node){
	classStack.push(node)
}

module.exports.functionStackTop = function(){
	return functionStack[functionStack.length - 1];
}

module.exports.classStackTop = function(){
	return classStack[classStack.length - 1];
}

module.exports.popFunctionStack = function(){
	return functionStack.pop();
}

module.exports.popClassStack = function(){
	return classStack.pop();
}

module.exports.functionStackIsEmpty = function(){
	return functionStack.length < 1;
}

module.exports.classStackIsEmpty = function(){
	return classStack.length < 1;
}

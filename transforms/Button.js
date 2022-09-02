"use strict";

const getExtension = require("./getJscodeshiftExtension");
const {
  replacePropAndValues,
  addPropAndValue,
  removeProp,
} = require("./utils");

module.exports = function (file, api) {
  const j = api.jscodeshift;
  j.registerMethods(getExtension(j));
  const ast = j(file.source);

  addPropAndValue(ast, j, {
    component: "Button",
    prop: "size",
    value: "small",
  });
  removeProp(ast, j, {
    component: "Button",
    prop: "size",
    value: "large",
  });

  replacePropAndValues(ast, j, {
    component: "Button",
    prop: "size",
    values: [{ from: "xlarge", to: "large" }],
  });

  return ast.toSource();
};

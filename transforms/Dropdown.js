"use strict";

const getExtension = require("./getJscodeshiftExtension");
const { replacePropAndValues } = require("./utils");

module.exports = function (file, api) {
  const j = api.jscodeshift;
  j.registerMethods(getExtension(j));
  const ast = j(file.source);

  replacePropAndValues(ast, j, {
    component: "Dropdown",
    prop: { from: "ulProps", to: "dropdownProps" },
  });

  return ast.toSource();
};

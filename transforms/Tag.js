'use strict';

const getExtension = require('../getJscodeshiftExtension');
const { replacePropAndValues } = require('./utils');

module.exports = function(file, api) {
  const j = api.jscodeshift;
  j.registerMethods(getExtension(j));
  const ast = j(file.source);

  replacePropAndValues(ast, j, {
    component: 'Tag',
    prop: { from: 'style', to: 'type' },
  });

  replacePropAndValues(ast, j, {
    component: 'Tag',
    prop: { from: 'color', to: 'style' },
    values: [
      { from: 'red', to: 'danger' },
      { from: 'blue', to: 'primary' },
      { from: 'green', to: 'success' },
      { from: 'yellow', to: 'warning' },
      { from: 'gray', to: 'inactive' },
    ],
  });

  replacePropAndValues(ast, j, {
    component: 'Tag',
    prop: { from: 'indicatorColor', to: 'indicatorStyle' },
    values: [
      { from: 'red', to: 'danger' },
      { from: 'blue', to: 'primary' },
      { from: 'green', to: 'success' },
      { from: 'yellow', to: 'warning' },
      { from: 'gray', to: 'inactive' },
    ],
  });

  return ast.toSource();
};

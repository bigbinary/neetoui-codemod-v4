'use strict';

const getExtension = require('../getJscodeshiftExtension');
const { replacePropAndValues } = require('./utils');

module.exports = function(file, api) {
  const j = api.jscodeshift;
  j.registerMethods(getExtension(j));
  const ast = j(file.source);

  replacePropAndValues(ast, j, {
    component: 'Modal',
    prop: 'size',
    values: [
      { from: 'sm', to: 'small' },
      { from: 'md', to: 'medium' },
      { from: 'lg', to: 'large' },
    ],
  });

  return ast.toSource();
};

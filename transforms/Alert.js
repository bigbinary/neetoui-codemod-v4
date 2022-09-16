'use strict';

const getExtension = require('../getJscodeshiftExtension');
const { replacePropAndValues } = require('./utils');

module.exports = function(file, api) {
  const j = api.jscodeshift;
  j.registerMethods(getExtension(j));
  const ast = j(file.source);

  replacePropAndValues(ast, j, {
    component: 'Alert',
    prop: 'size',
    values: [
      { from: 'xs', to: 'small' },
      { from: 'sm', to: 'medium' },
      { from: 'md', to: 'large' },
    ],
  });

  return ast.toSource();
};

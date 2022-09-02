'use strict';

const getExtension = require('./getJscodeshiftExtension');
const { replacePropAndValues } = require('./utils');

module.exports = function(file, api) {
  const j = api.jscodeshift;
  j.registerMethods(getExtension(j));
  const ast = j(file.source);

  replacePropAndValues(ast, j, {
    component: 'Avatar',
    prop: 'size',
    values: [{ from: 'xlarge', to: 'extraLarge' }],
  });

  return ast.toSource();
};

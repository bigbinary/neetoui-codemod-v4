'use strict';

const getExtension = require('../getJscodeshiftExtension');
const { addPropAndValue, removeProp } = require('./utils');

module.exports = function(file, api) {
  const j = api.jscodeshift;
  j.registerMethods(getExtension(j));
  const ast = j(file.source);

  addPropAndValue(ast, j, {
    component: 'Select',
    prop: 'size',
    value: 'large',
  });
  removeProp(ast, j, {
    component: 'Select',
    prop: 'size',
    value: 'small',
  });

  return ast.toSource();
};

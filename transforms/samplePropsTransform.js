'use strict';

const getExtension = require('../getJscodeshiftExtension');

module.exports = function(file, api) {
  const j = api.jscodeshift;
  j.registerMethods(getExtension(j));
  const ast = j(file.source);

  ast
    .find(j.JSXOpeningElement, {
      name: {
        type: 'JSXIdentifier',
        name: 'Button',
      },
    })
    .map((nodePath) => {
      let attributes = j(nodePath.get('attributes'));
      const attrResults = attributes.children(j.JSXAttribute, {
        name: {
          type: 'JSXIdentifier',
          name: 'size',
        },
      });

      if (attrResults.length === 0) {
        attributes
          .get(0)
          .insertBefore(
            j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('large'))
          );
      }
      return nodePath;
    });

  // .children(j.JSXAttribute, {
  //   name: {
  //     type: "JSXIdentifier",
  //     name: "size",
  //   },
  // })
  // .map(nodePath => {
  //   // console.log(nodePath, "nodePath");
  //   return nodePath.get("name");
  // })
  // .replaceWith(j.jsxIdentifier("style"));

  return ast.toSource();
};

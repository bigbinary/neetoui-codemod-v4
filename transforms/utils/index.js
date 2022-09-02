const replacePropAndValues = (root, j, { component, prop, values = null }) => {
  let fromProp = "";
  let toProp = "";

  if (typeof prop === "object") {
    fromProp = prop.from;
    toProp = prop.to;
  } else if (typeof prop === "string") {
    fromProp = prop;
  }
  root
    .find(j.JSXOpeningElement, {
      name: {
        type: "JSXIdentifier",
        name: component,
      },
    })
    .map((nodePath) => nodePath.get("attributes"))
    .children(j.JSXAttribute, {
      name: {
        type: "JSXIdentifier",
        name: fromProp,
      },
    })
    .map((nodePath) => {
      const nodeValue = nodePath.get("value");
      const nodeProp = nodePath.get("name");
      if (values && values.length) {
        values.forEach((value) => {
          if (nodeValue.value.value === value.from) {
            j(nodeValue).replaceWith(j.literal(value.to));
          }
        });
      }
      if (toProp) j(nodeProp).replaceWith(toProp);

      return nodePath;
    });
};

const addPropAndValue = (root, j, { component, prop, value }) => {
  root
    .find(j.JSXOpeningElement, {
      name: {
        type: "JSXIdentifier",
        name: component,
      },
    })
    .map((nodePath) => {
      let attributes = j(nodePath.get("attributes"));
      const attrResults = attributes.children(j.JSXAttribute, {
        name: {
          type: "JSXIdentifier",
          name: prop,
        },
      });

      if (attrResults.length === 0) {
        attributes
          .get(0)
          .insertBefore(
            j.jsxAttribute(j.jsxIdentifier(prop), j.stringLiteral(value))
          );
      }
      return nodePath;
    });
};

const removeProp = (root, j, { component, prop, value }) => {
  root
    .find(j.JSXOpeningElement, {
      name: {
        type: "JSXIdentifier",
        name: component,
      },
    })
    .map((nodePath) => nodePath.get("attributes"))
    .children(j.JSXAttribute, {
      name: {
        type: "JSXIdentifier",
        name: prop,
      },
    })
    .filter((nodePath) => {
      const nodeValue = nodePath.get("value");
      return nodeValue.value.value === value;
    })
    .replaceWith();
};

module.exports = {
  replacePropAndValues,
  addPropAndValue,
  removeProp,
};

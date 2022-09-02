'use strict';

const { replaceString } = require('./utils');

const CLASSNAMES_TO_BE_REPLACED = [
  { from: 'neeto-ui-text-success', to: 'neeto-ui-text-success-500' },
  { from: 'neeto-ui-text-error', to: 'neeto-ui-text-error-500' },
  { from: 'neeto-ui-text-warning', to: 'neeto-ui-text-warning-500' },
  { from: 'neeto-ui-text-info', to: 'neeto-ui-text-info-500' },
  { from: 'neeto-ui-bg-success', to: 'neeto-ui-bg-success-500' },
  { from: 'neeto-ui-bg-error', to: 'neeto-ui-bg-error-500' },
  { from: 'neeto-ui-bg-warning', to: 'neeto-ui-bg-warning-500' },
  { from: 'neeto-ui-bg-info', to: 'neeto-ui-bg-info-500' },
  { from: 'neeto-ui-text-accent1-700', to: 'neeto-ui-text-primary-800' },
  { from: 'neeto-ui-bg-accent1-700', to: 'neeto-ui-bg-primary-800' },
  { from: 'neeto-ui-text-accent1-500', to: 'neeto-ui-text-primary-600' },
  { from: 'neeto-ui-bg-accent1-500', to: 'neeto-ui-bg-primary-600' },
  { from: 'neeto-ui-text-accent1-300', to: 'neeto-ui-text-primary-500' },
  { from: 'neeto-ui-bg-accent1-300', to: 'neeto-ui-bg-primary-500' },
  { from: 'neeto-ui-text-accent2-700', to: 'neeto-ui-text-success-800' },
  { from: 'neeto-ui-bg-accent2-700', to: 'neeto-ui-bg-success-800' },
  { from: 'neeto-ui-text-accent2-500', to: 'neeto-ui-text-success-600' },
  { from: 'neeto-ui-bg-accent2-500', to: 'neeto-ui-bg-success-600' },
  { from: 'neeto-ui-text-accent2-300', to: 'neeto-ui-text-success-500' },
  { from: 'neeto-ui-bg-accent2-300', to: 'neeto-ui-bg-success-500' },
  { from: 'neeto-ui-text-accent4-700', to: 'neeto-ui-text-error-800' },
  { from: 'neeto-ui-bg-accent4-700', to: 'neeto-ui-bg-error-800' },
  { from: 'neeto-ui-text-accent4-500', to: 'neeto-ui-text-error-600' },
  { from: 'neeto-ui-bg-accent4-500', to: 'neeto-ui-bg-error-600' },
  { from: 'neeto-ui-text-accent4-300', to: 'neeto-ui-text-error-500' },
  { from: 'neeto-ui-bg-accent4-300', to: 'neeto-ui-bg-error-500' },
  { from: 'neeto-ui-text-secondary-indigo', to: 'neeto-ui-text-primary-500' },
  { from: 'neeto-ui-bg-secondary-indigo', to: 'neeto-ui-bg-primary-500' },
  { from: 'neeto-ui-text-secondary-green', to: 'neeto-ui-text-success-500' },
  { from: 'neeto-ui-bg-secondary-green', to: 'neeto-ui-bg-success-500' },
  { from: 'neeto-ui-text-pastel-teal', to: '' },
  { from: 'neeto-ui-bg-pastel-teal', to: '' },
  { from: 'neeto-ui-text-accent3-700', to: '' },
  { from: 'neeto-ui-text-accent3-500', to: '' },
  { from: 'neeto-ui-text-accent3-300', to: '' },
  { from: 'neeto-ui-bg-accent3-700', to: '' },
  { from: 'neeto-ui-bg-accent3-500', to: '' },
  { from: 'neeto-ui-bg-accent3-300', to: '' },
  { from: 'neeto-ui-text-secondary-teal', to: '' },
  { from: 'neeto-ui-bg-secondary-teal', to: '' },
];

module.exports = function(file, api) {
  let root = file.source;
  root = replaceString(root, CLASSNAMES_TO_BE_REPLACED);
  return root;
};

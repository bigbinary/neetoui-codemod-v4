'use strict';

const { replaceString } = require('./utils');

const VARIABLES_TO_BE_REPLACED = [
  { from: '$neeto-ui-white', to: 'rgb(var(--neeto-ui-white))' },
  { from: '$neeto-ui-black', to: 'rgb(var(--neeto-ui-black))' },
  { from: '$neeto-ui-gray-800', to: 'rgb(var(--neeto-ui-gray-800))' },
  { from: '$neeto-ui-gray-700', to: 'rgb(var(--neeto-ui-gray-700))' },
  { from: '$neeto-ui-gray-600', to: 'rgb(var(--neeto-ui-gray-600))' },
  { from: '$neeto-ui-gray-500', to: 'rgb(var(--neeto-ui-gray-500))' },
  { from: '$neeto-ui-gray-400', to: 'rgb(var(--neeto-ui-gray-400))' },
  { from: '$neeto-ui-gray-300', to: 'rgb(var(--neeto-ui-gray-300))' },
  { from: '$neeto-ui-gray-200', to: 'rgb(var(--neeto-ui-gray-200))' },
  { from: '$neeto-ui-gray-100', to: 'rgb(var(--neeto-ui-gray-100))' },
  { from: '$neeto-ui-success', to: 'rgb(var(--neeto-ui-success-500))' },
  { from: '$neeto-ui-info', to: 'rgb(var(--neeto-ui-info-500))' },
  { from: '$neeto-ui-warning', to: 'rgb(var(--neeto-ui-warning-500))' },
  { from: '$neeto-ui-error', to: 'rgb(var(--neeto-ui-error-500))' },
  { from: '$neeto-ui-pastel-blue', to: 'rgb(var(--neeto-ui-pastel-blue))' },
  { from: '$neeto-ui-pastel-green', to: 'rgb(var(--neeto-ui-pastel-green))' },
  { from: '$neeto-ui-pastel-yellow', to: 'rgb(var(--neeto-ui-pastel-yellow))' },
  { from: '$neeto-ui-pastel-red', to: 'rgb(var(--neeto-ui-pastel-red))' },
  { from: '$neeto-ui-pastel-teal', to: 'rgb(var(--neeto-ui-pastel-blue))' },
  { from: '$neeto-ui-accent1-700', to: 'rgb(var(--neeto-ui-primary-800))' },
  { from: '$neeto-ui-accent1-500', to: 'rgb(var(--neeto-ui-primary-600))' },
  { from: '$neeto-ui-accent1-300', to: 'rgb(var(--neeto-ui-primary-500))' },
  { from: '$neeto-ui-accent2-700', to: 'rgb(var(--neeto-ui-success-800))' },
  { from: '$neeto-ui-accent2-500', to: 'rgb(var(--neeto-ui-success-600))' },
  { from: '$neeto-ui-accent2-300', to: 'rgb(var(--neeto-ui-success-500))' },
  { from: '$neeto-ui-accent3-700', to: 'rgb(var(--neeto-ui-info-800))' },
  { from: '$neeto-ui-accent3-500', to: 'rgb(var(--neeto-ui-info-600))' },
  { from: '$neeto-ui-accent3-300', to: 'rgb(var(--neeto-ui-info-500))' },
  { from: '$neeto-ui-accent4-700', to: 'rgb(var(--neeto-ui-error-800))' },
  { from: '$neeto-ui-accent4-500', to: 'rgb(var(--neeto-ui-error-600))' },
  { from: '$neeto-ui-accent4-300', to: 'rgb(var(--neeto-ui-error-500))' },
  {
    from: '$neeto-ui-secondary-indigo',
    to: 'rgb(var(--neeto-ui-primary-500))',
  },
  { from: '$neeto-ui-secondary-green', to: 'rgb(var(--neeto-ui-success-500))' },
  { from: '$neeto-ui-secondary-teal', to: 'rgb(var(--neeto-ui-primary-500))' },
  { from: '$neeto-ui-font-thin', to: 'var(--neeto-ui-font-thin)' },
  { from: '$neeto-ui-font-extralight', to: 'var(--neeto-ui-font-extralight)' },
  { from: '$neeto-ui-font-light', to: 'var(--neeto-ui-font-light)' },
  { from: '$neeto-ui-font-normal', to: 'var(--neeto-ui-font-normal)' },
  { from: '$neeto-ui-font-medium', to: 'var(--neeto-ui-font-medium)' },
  { from: '$neeto-ui-font-semibold', to: 'var(--neeto-ui-font-semibold)' },
  { from: '$neeto-ui-font-bold', to: 'var(--neeto-ui-font-bold)' },
  { from: '$neeto-ui-font-extrabold', to: 'var(--neeto-ui-font-extrabold)' },
  { from: '$neeto-ui-font-black', to: 'var(--neeto-ui-font-black)' },
  { from: '$neeto-ui-text-xxs', to: 'var(--neeto-ui-text-xxs)' },
  { from: '$neeto-ui-text-xs', to: 'var(--neeto-ui-text-xs)' },
  { from: '$neeto-ui-text-sm', to: 'var(--neeto-ui-text-sm)' },
  { from: '$neeto-ui-text-base', to: 'var(--neeto-ui-text-base)' },
  { from: '$neeto-ui-text-lg', to: 'var(--neeto-ui-text-lg)' },
  { from: '$neeto-ui-text-xl', to: 'var(--neeto-ui-text-xl)' },
  { from: '$neeto-ui-text-2xl', to: 'var(--neeto-ui-text-2xl)' },
  { from: '$neeto-ui-text-3xl', to: 'var(--neeto-ui-text-3xl)' },
  { from: '$neeto-ui-text-4xl', to: 'var(--neeto-ui-text-4xl)' },
  { from: '$neeto-ui-leading-none', to: 'var(--neeto-ui-leading-none)' },
  { from: '$neeto-ui-leading-tight', to: 'var(--neeto-ui-leading-tight)' },
  { from: '$neeto-ui-leading-snug', to: 'var(--neeto-ui-leading-snug)' },
  { from: '$neeto-ui-leading-normal', to: 'var(--neeto-ui-leading-normal)' },
  { from: '$neeto-ui-leading-relaxed', to: 'var(--neeto-ui-leading-relaxed)' },
  { from: '$neeto-ui-leading-loose', to: 'var(--neeto-ui-leading-loose)' },
  {
    from: '$neeto-ui-text-transform-none',
    to: 'var(--neeto-ui-text-transform-none)',
  },
  {
    from: '$neeto-ui-text-transform-capitalize',
    to: 'var(--neeto-ui-text-transform-capitalize)',
  },
  {
    from: '$neeto-ui-text-transform-uppercase',
    to: 'var(--neeto-ui-text-transform-uppercase)',
  },
  {
    from: '$neeto-ui-text-transform-lowercase',
    to: 'var(--neeto-ui-text-transform-lowercase)',
  },
  {
    from: '$neeto-ui-text-transform-fullwidth',
    to: 'var(--neeto-ui-text-transform-fullwidth)',
  },
  {
    from: '$neeto-ui-text-transform-inherit',
    to: 'var(--neeto-ui-text-transform-inherit)',
  },
  {
    from: '$neeto-ui-text-transform-initial',
    to: 'var(--neeto-ui-text-transform-initial)',
  },
  {
    from: '$neeto-ui-text-transform-revert',
    to: 'var(--neeto-ui-text-transform-revert)',
  },
  {
    from: '$neeto-ui-text-transform-unset',
    to: 'var(--neeto-ui-text-transform-unset)',
  },
  { from: '$neeto-ui-rounded-none', to: 'var(--neeto-ui-rounded-none)' },
  { from: '$neeto-ui-rounded-sm', to: 'var(--neeto-ui-rounded-sm)' },
  { from: '$neeto-ui-rounded', to: 'var(--neeto-ui-rounded)' },
  { from: '$neeto-ui-rounded-md', to: 'var(--neeto-ui-rounded-md)' },
  { from: '$neeto-ui-rounded-lg', to: 'var(--neeto-ui-rounded-lg)' },
  { from: '$neeto-ui-rounded-xl', to: 'var(--neeto-ui-rounded-xl)' },
  { from: '$neeto-ui-rounded-full', to: 'var(--neeto-ui-rounded-full)' },
  { from: '$neeto-ui-transition', to: 'var(--neeto-ui-transition)' },
  { from: '$neeto-ui-shadow', to: 'var(--neeto-ui-shadow-m)' },
  { from: '$neeto-ui-shadow-md', to: 'var(--neeto-ui-shadow-m)' },
  { from: '$neeto-ui-shadow-xs', to: 'var(--neeto-ui-shadow-xs)' },
  { from: '$neeto-ui-shadow-s', to: 'var(--neeto-ui-shadow-s)' },
  { from: '$neeto-ui-shadow-m', to: 'var(--neeto-ui-shadow-m)' },
  { from: '$neeto-ui-shadow-l', to: 'var(--neeto-ui-shadow-l)' },
  { from: '$neeto-ui-shadow-xl', to: 'var(--neeto-ui-shadow-xl)' },
];

module.exports = function(file, api) {
  let root = file.source;
  root = replaceString(root, VARIABLES_TO_BE_REPLACED);
  return root;
};

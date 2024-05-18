import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginReactHooks from 'eslint-plugin-react-hooks/configs/recommended.js';
import pluginJSXa11y from 'eslint-plugin-jsx-a11y/configs/recommended.js';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginAirbnb from 'eslint-config-airbnb-base';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  pluginReactHooks,
  pluginJSXa11y,
  pluginImport,
  pluginPrettier,
  pluginAirbnb,
];

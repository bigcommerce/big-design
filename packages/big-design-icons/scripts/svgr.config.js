const prettierConfig = require('../prettier.config');

module.exports = {
  titleProp: true,
  ext: 'tsx',
  svgProps: {
    stroke: 'currentColor',
    fill: 'currentColor',
    strokeWidth: '0',
  },
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  template({ template }, opts, { imports, componentName, props, jsx, exports }) {
    const code = `
    // **********************************
    // Auto-generated file, do NOT modify
    // **********************************
    import React from 'react';
    BREAK
    import { IconProps } from './../Icon';
    BREAK

    export const COMPONENT_NAME = React.memo<IconProps>(({ title, ...props }) => (
      JSX
    ));
    `;

    const typeScriptTpl = template.smart(code, {
      plugins: ['typescript'],
      preserveComments: true,
    });

    return typeScriptTpl({
      COMPONENT_NAME: componentName,
      BREAK: '\n',
      JSX: jsx,
    });
  },
  svgoConfig: {
    plugins: {
      removeViewBox: false,
    },
  },
  prettierConfig: {
    ...prettierConfig,
    parser: 'typescript',
  },
};

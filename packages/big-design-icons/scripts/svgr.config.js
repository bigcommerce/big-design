const prettierConfig = require('../prettier.config');

module.exports = {
  titleProp: true,
  ref: true,
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

    import { createStyledIcon, IconProps, PrivateIconProps } from '../base';
    import { useUniqueId } from '../utils';
    BREAK

    const Icon: React.FC<IconProps & PrivateIconProps> = ({ svgRef, title, theme, ...props }) => {
      const titleId = useUniqueId('icon');

      BREAK
      return (
        JSX
      );
    };

    BREAK
    const IconWithForwardedRef = React.forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => <Icon {...iconProps} svgRef={ref} />);

    BREAK
    export const COMPONENT_NAME = React.memo(createStyledIcon(IconWithForwardedRef as React.FC<IconProps>));

    BREAK
    COMPONENT_NAME.displayName = '${componentName.name}';
    `;

    const typeScriptTpl = template.smart(code, {
      plugins: ['jsx', 'typescript'],
      preserveComments: true,
      placeholderPattern: false,
      placeholderWhitelist: new Set(['BREAK', 'COMPONENT_NAME', 'JSX']),
    });

    return typeScriptTpl({
      COMPONENT_NAME: componentName,
      BREAK: '\n',
      JSX: jsx,
    });
  },
  svgoConfig: {
    plugins: [{ removeViewBox: false }],
  },
  prettierConfig: {
    ...prettierConfig,
    parser: 'typescript',
  },
};

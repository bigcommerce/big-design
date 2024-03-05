const prettierConfig = require('../../../prettier.config');

/** @type {import('@svgr/core').Config} */
module.exports = {
  titleProp: true,
  ref: false,
  typescript: true,
  prettier: true,
  svgProps: {
    stroke: 'currentColor',
    fill: 'currentColor',
    strokeWidth: '0',
    'aria-hidden': '{ariaHidden}',
    ref: '{svgRef}',
  },
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  template: (variables, { tpl }) => {
    return tpl`
      // **********************************
      // Auto-generated file, do NOT modify
      // **********************************
      import React, { forwardRef, memo, useId } from 'react';

      import { createStyledIcon, IconProps, PrivateIconProps } from '../base';

      const Icon: React.FC<IconProps & PrivateIconProps> = ({ svgRef, title, theme, ...props }) => {
        const uniqueTitleId = useId();
        const titleId = title ? props.titleId || uniqueTitleId : undefined;
        const ariaHidden = titleId ? undefined : true;

        return (
          ${variables.jsx}
        );
      };

      const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => <Icon {...iconProps} svgRef={ref} />);

      export const ${variables.componentName} = memo(createStyledIcon(IconWithForwardedRef));

      ${variables.componentName}.displayName = '${variables.componentName}';
  `;
  },
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      'removeXMLNS',
    ],
  },
  prettierConfig: {
    ...prettierConfig,
    parser: 'typescript',
  },
};

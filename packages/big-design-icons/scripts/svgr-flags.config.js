const prettierConfig = require('../../../prettier.config');

module.exports = {
  titleProp: true,
  ref: false,
  typescript: true,
  prettier: true,
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  svgProps: {
    'aria-hidden': '{ariaHidden}',
    ref: '{svgRef}',
  },
  template: (variables, { tpl }) => {
    const flagTitle = `${variables.componentName.replace('FlagIcon', '')} flag`;

    return tpl`
      // **********************************
      // Auto-generated file, do NOT modify
      // **********************************
      import React, { forwardRef, memo, useId } from 'react';

      import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

      const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = '${flagTitle}', theme, ...props }) => {
        const uniqueTitleId = useId();
        const titleId = title ? props.titleId || uniqueTitleId : undefined;
        const ariaHidden = titleId ? undefined : true;

        return (
          ${variables.jsx}
        );
      };

      const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => <FlagIcon {...iconProps} svgRef={ref} />);

      export const ${variables.componentName} = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

      ${variables.componentName}.displayName = '${variables.componentName}';
  `;
  },
  prettierConfig: {
    ...prettierConfig,
    parser: 'typescript',
  },
};

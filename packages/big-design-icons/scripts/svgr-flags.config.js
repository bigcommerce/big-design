const prettierConfig = require('../../../prettier.config');

module.exports = {
  titleProp: true,
  ref: true,
  ext: 'tsx',
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  svgProps: {
    'aria-hidden': '{ariaHidden}',
  },
  template({ template }, _, { componentName, jsx }) {
    const flagName = componentName.name.replace('FlagIcon', '');

    const code = `
    // **********************************
    // Auto-generated file, do NOT modify
    // **********************************
    import React, { forwardRef, memo, useId } from 'react';
    BREAK

    import { PrivateIconProps } from '../../base';
    import { createStyledFlagIcon, FlagIconProps } from '../base';
    BREAK

    const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = '${flagName} flag', theme, ...props }) => {
      const uniqueTitleId = useId();
      const titleId = title ? props.titleId || uniqueTitleId : undefined;
      const ariaHidden = titleId ? undefined : true;

      BREAK
      return (
        JSX
      );
    };

    BREAK
    const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => <FlagIcon {...iconProps} svgRef={ref} />);

    BREAK
    export const COMPONENT_NAME = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

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
  prettierConfig: {
    ...prettierConfig,
    parser: 'typescript',
  },
};

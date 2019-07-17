module.exports = {
  titleProp: true,
  ext: 'tsx',
  svgProps: {
    height: '{size}',
    width: '{size}',
  },
  template({ template }, opts, { imports, componentName, props, jsx, exports }) {
    componentName.name = componentName.name.replace('Svg', '');

    const code = `
    // **********************************
    // Auto-generated file, do NOT modify
    // **********************************
    import React from 'react';
    BREAK

    import { Icon } from './Icon';
    BREAK

    export class COMPONENT_NAME extends Icon {
      render() {
        const { title, theme, ...rest } = this.props;
        const size = this.getSize();
        const style = {
          ...rest.style,
          width: size,
          height: size
        };
        const props = { ...rest, style };

        BREAK
        return JSX;
      }
    }`;

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
};

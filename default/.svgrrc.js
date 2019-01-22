module.exports = {
  titleProp: true,
  ext: 'tsx',
  svgProps: {
    height: '{size}',
    width: '{size}',
  },
  template({ template }, opts, { imports, componentName, props, jsx, exports }) {
    const typeScriptTpl = template.smart({ plugins: ['typescript'] });

    return typeScriptTpl.ast`
    // Auto-generated file, don't modify
    import React from 'react';

    import { Icon } from './Icon';

    export default class ${componentName} extends Icon {
      render() {
        const props = this.props;
        const { title } = props;
        const size = this.getSize();

        return (${jsx});
      }
    }
  `;
  },
  svgoConfig: {
    plugins: {
      removeViewBox: false,
    },
  },
};

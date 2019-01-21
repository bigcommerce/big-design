module.exports = {
  titleProp: true,
  ext: 'tsx',
  template({ template }, opts, { imports, componentName, props, jsx, exports }) {
    const typeScriptTpl = template.smart({ plugins: ['typescript'] });

    return typeScriptTpl.ast`
    import React from 'react';

    interface Props extends React.SVGProps<SVGSVGElement> {
      title?: string;
    }

    const ${componentName} = ({ title, ...props }: Props) => ${jsx};
    export default ${componentName};
  `;
  },
  svgoConfig: {
    plugins: {
      removeViewBox: false,
    },
  },
};

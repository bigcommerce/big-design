module.exports = {
  name: 'removeInkscapeAttrs',
  description: 'Removes all inkscape vendor prefix style attributes.',
  fn: () => {
    return {
      element: {
        enter: (node) => {
          if (node.attributes.style?.includes('-inkscape')) {
            const style = node.attributes.style
              .split(';')
              .filter((style) => !style.includes('-inkscape'))
              .join(';');

            if (!style.length) {
              delete node.attributes.style;

              return;
            }

            node.attributes.style = style;
          }
        },
      },
    };
  },
};

import { addParameters, configure } from '@storybook/react';

const req = require.context('../stories', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  backgrounds: [
    {
      default: true,
      name: 'Grey',
      value: '#f6f7f9',
    },
    {
      name: 'White',
      value: '#ffffff',
    },
  ],
});
configure(loadStories, module);

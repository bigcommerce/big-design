import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import '@storybook/addon-console';

// Option defaults:
addDecorator(
  withOptions({
    name: 'BC Playground',
    url: '#',
    addonPanelInRight: false,
  }),
);

const req = require.context('../stories', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

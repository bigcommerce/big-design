import { checkA11y } from '@storybook/addon-a11y';
import { withBackgrounds } from '@storybook/addon-backgrounds';
// import centered from '@storybook/addon-centered';
import { withConsole } from '@storybook/addon-console';
import { withKnobs } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';
import { addDecorator } from '@storybook/react';

// addDecorator(centered);
addDecorator(withKnobs);
addDecorator(checkA11y);
addDecorator(withViewport());
addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator(
  withBackgrounds([
    {
      default: true,
      name: 'Grey',
      value: '#f6f7f9',
    },
    {
      name: 'White',
      value: '#ffffff',
    },
  ]),
);

const req = require.context('../src', true, /.story.tsx$/);

req.keys().forEach(filename => req(filename));

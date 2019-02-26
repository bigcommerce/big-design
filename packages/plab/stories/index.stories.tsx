import { checkA11y } from '@storybook/addon-a11y';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { withKnobs } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';
import { addDecorator } from '@storybook/react';
import React from 'react';

import { GlobalStyle } from '../src/components';

addDecorator(withKnobs);
addDecorator(checkA11y);
addDecorator(withViewport());
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

addDecorator(storyFn => (
  <React.Fragment>
    <GlobalStyle />
    {storyFn()}
  </React.Fragment>
));

const req = require.context('../src', true, /.story.tsx$/);

req.keys().forEach(filename => req(filename));

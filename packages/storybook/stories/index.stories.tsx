import { GlobalStyle } from '@bigcommerce/plab';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/react';
import React from 'react';

addDecorator(withKnobs);
addDecorator(withA11y);

addDecorator(storyFn => (
  <React.Fragment>
    <GlobalStyle />
    {storyFn()}
  </React.Fragment>
));

const req = require.context('../src', true, /.story.tsx$/);

req.keys().forEach(filename => req(filename));

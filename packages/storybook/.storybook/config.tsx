import { GlobalStyle } from '@bigcommerce/big-design';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';

const req = require.context('../stories', true, /\.story\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  viewport: {},
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

addDecorator(withKnobs);

addParameters({
  a11y: {
    options: {
      rules: {
        'form-field-multiple-labels': {
          enabled: false,
        },
      },
    },
  },
});

addDecorator(storyFn => (
  <React.Fragment>
    <GlobalStyle />
    {storyFn()}
  </React.Fragment>
));

configure(loadStories, module);

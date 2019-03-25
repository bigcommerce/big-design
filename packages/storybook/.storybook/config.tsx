import { GlobalStyle } from '@bigcommerce/big-design';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';

// Looks like there is a bug and the order of imports matters for a11y :(
// https://github.com/storybooks/storybook/issues/6185
// tslint:disable-next-line:ordered-imports
import { withA11y } from '@storybook/addon-a11y';

addDecorator(withA11y);
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

function loadStories() {
  const req = require.context('../stories', true, /\.story\.tsx$/);

  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

import { defaultTheme, Panel } from '@bigcommerce/big-design';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';
import { addReadme } from 'storybook-readme-source';

import { StoryWrapper } from '../components/StoryWrapper/StoryWrapper';

import bcTheme from './bc-theme';

addDecorator(withA11y);
addParameters({
  options: {
    panelPosition: 'right',
    brandTitle: 'Big Design',
    // enableShortcuts currently not working
    // https://github.com/storybookjs/storybook/issues/6569
    enableShortcuts: false,
    showSearchBox: false,
    showPanel: false,
    theme: bcTheme,
  },
  backgrounds: [
    {
      default: true,
      name: 'Default',
      value: defaultTheme.colors.secondary10,
    },
    {
      name: 'White',
      value: '#ffffff',
    },
  ],
  readme: {
    codeTheme: 'a11y-dark',
    StoryPreview: (props: any) => <Panel>{props.children}</Panel>,
  },
});

addDecorator(addReadme);
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

addDecorator(storyFn => <StoryWrapper storyFn={storyFn} />);

function loadStories() {
  const req = require.context('../stories', true, /\.story\.tsx$/);

  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

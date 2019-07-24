import { theme } from '@bigcommerce/big-design-theme';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';

import { StoryWrapper } from '../components/StoryWrapper/StoryWrapper';

import bcTheme from './bc-theme';

const { colors } = theme;

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
      value: colors.secondary10,
    },
    {
      name: 'White',
      value: '#ffffff',
    },
  ],
});

addDecorator(withKnobs);
addDecorator(storyFn => <StoryWrapper storyFn={storyFn} />);

function loadStories() {
  const req = require.context('../stories', true, /\.story\.tsx$/);

  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

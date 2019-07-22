import { storiesOf } from '@storybook/react';
import React from 'react';

import { MarginStory, PaddingStory } from './index';

storiesOf('Utilities', module)
  .add('Margin', () => <MarginStory />)
  .add('Padding', () => <PaddingStory />);

import { ProgressBar } from '@bigcommerce/big-design';
import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import ProgressBarReadme from '../../big-design/src/components/ProgressBar/README.md';

const label = 'percentage';
const defaultValue = 10;
const options = {
  range: true,
  min: 0,
  max: 100,
  step: 10,
};

storiesOf('ProgressBar', module)
  .addParameters({
    readme: {
      content: ProgressBarReadme,
    },
  })
  .add('Determinant', () => <ProgressBar percent={number(label, defaultValue, options)} state={'incomplete'} />)
  .add('Indeterminant', () => <ProgressBar />);

import { ProgressCircle } from '@bigcommerce/big-design';
import { ProgressCircleSizes } from '@bigcommerce/big-design/dist/src/components/ProgressCircle/ProgressCircle';
import { boolean, number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import ProgressCircleReadme from '../../big-design/src/components/ProgressCircle/README.md';

const label = 'percentage';
const defaultValue = 10;
const options = {
  range: true,
  min: 0,
  max: 100,
  step: 1,
};

const sizes: ProgressCircleSizes[] = ['large', 'medium', 'small', 'xSmall'];

storiesOf('ProgressCircle', module)
  .addParameters({
    readme: {
      content: ProgressCircleReadme,
    },
  })
  .add('Determinant', () => (
    <ProgressCircle
      isComplete={boolean('isComplete', false)}
      percent={number(label, defaultValue, options)}
      showError={boolean('showError', false)}
      size={select('size', sizes, 'large')}
    />
  ))
  .add('Indeterminant', () => (
    <ProgressCircle
      isComplete={boolean('isComplete', false)}
      showError={boolean('showError', false)}
      size={select('size', sizes, 'large')}
      variant={'indeterminant'}
    />
  ));

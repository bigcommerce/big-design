import { ProgressCircle } from '@bigcommerce/big-design';
import { boolean, number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import ProgressCircleReadme from '../../big-design/src/components/ProgressCircle/README.md';

const percentKnob = {
  name: 'percentage',
  value: 50,
  options: {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  },
};

const sizes = ['large' as 'large', 'medium' as 'medium', 'small' as 'small', 'xSmall' as 'xSmall'];

storiesOf('ProgressCircle', module)
  .addParameters({
    readme: {
      content: ProgressCircleReadme,
    },
  })
  .add('Determinant', () => (
    <ProgressCircle
      error={boolean('error', false)}
      percent={number(percentKnob.name, percentKnob.value, percentKnob.options)}
      size={select('size', sizes, 'large')}
    />
  ))
  .add('Indeterminant', () => <ProgressCircle size={select('size', sizes, 'large')} />);

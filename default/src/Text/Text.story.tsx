import { storiesOf } from '@storybook/react';
import React from 'react';

import { H0, H1, H2, H3, H4, P, Small } from './index';

storiesOf('Text', module).add('Overview', () => (
  <div>
    <H0>Hero header - h0</H0>
    <H1>Page header - h1</H1>
    <H2>Panel header - h2</H2>
    <H3>Section header - h3</H3>
    <H4>Group header - h4</H4>
    <P>Text - p</P>
    <Small>Small text - small</Small>
  </div>
));

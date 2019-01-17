import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Button } from '../Button/Button';

import { Spinner } from './index';

const size = ['small' as 'small', 'medium' as 'medium', 'large' as 'large'];

storiesOf('Spinner', module).add('Overview', () => (
  <div>
    <p>Use knobs to 👀</p>
    <div
      style={{
        width: 400,
        height: 400,
        position: 'relative',
        backgroundColor: 'lightblue',
      }}
    >
      Enim ullamco nulla ut cupidatat anim dolore cillum et sunt occaecat. Adipisicing anim deserunt consequat do
      laborum laboris laborum ut amet ullamco ipsum. Aute laborum deserunt do ut ex anim tempor cillum eu proident
      occaecat. Amet ea irure nulla proident cillum ad ipsum sit. Incididunt sit irure commodo ipsum occaecat veniam
      esse qui. Pariatur eu velit enim quis. Minim culpa ullamco mollit do enim nisi dolore magna Lorem. Ad in officia
      minim amet elit ullamco. Irure excepteur excepteur occaecat duis ipsum consectetur quis. Nostrud commodo tempor
      sunt nostrud labore. Magna voluptate exercitation laboris ex eu labore ut nisi minim culpa. Anim officia proident
      consequat in fugiat culpa tempor sit sint in voluptate. Id laborum est exercitation commodo pariatur proident
      mollit occaecat ad.
      <Spinner overlay={boolean('overlay', true)} size={select('size', size, 'medium')} />
    </div>

    <hr />

    <p>In a button:</p>
    <Button isLoading={true}>Label</Button>
  </div>
));

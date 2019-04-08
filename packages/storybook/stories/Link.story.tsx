import { H3, Link, Panel } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Link', module).add('Overview', () => (
  <div style={{ padding: '2rem' }}>
    <Panel>
      <H3>Links that point to other places</H3>
      Links are not underlined and have the correct color.&nbsp;
      <Link href="https://www.bigcommerce.com" target="_blank">
        Learn more.
      </Link>
    </Panel>
  </div>
));

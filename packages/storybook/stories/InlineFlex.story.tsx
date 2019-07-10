import { H2, InlineFlex, Link, PlusIcon, Text } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('InlineFlex', module).add('Overview', () => (
  <>
    <H2>Inline flex</H2>
    <Text>
      Some text that is inline-flex aligned with some other elements inside it.
      <Link href="https://www.bigcommerce.com">
        <InlineFlex alignItems="center">
          &nbsp;Learn more
          <PlusIcon size="medium" />
        </InlineFlex>
      </Link>
    </Text>
  </>
));

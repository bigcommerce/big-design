import { Box, H1, H2, H3, Panel, ProgressBar } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { CodePreview, PropTable } from '../components';

storiesOf('ProgressBar', module).add('Overview', () => (
  <Panel>
    <H1>ProgressBar</H1>
    <H2>Examples</H2>
    <H3 marginTop="xLarge">Determinant</H3>
    <CodePreview>
      <Box marginVertical="large">
        <ProgressBar percent={50} />
      </Box>
    </CodePreview>
    <p>
      Determinant Progress represents a known amount of time or completeness for a task. A <code>percent</code> prop
      needs to be passed to render a determinate progress.
    </p>

    <H3 marginTop="xLarge">Indeterminant</H3>
    <CodePreview>
      <Box marginVertical="large">
        <ProgressBar />
      </Box>
    </CodePreview>
    <p>
      Indeterminant Progress represents an unknown amount of time for a task to complete. Component will render an
      indeterminant progress when missing a <code>percent</code> prop.
    </p>

    <H2 marginTop="xxxLarge">Properties & Methods</H2>
    <PropTable>
      <PropTable.Prop name="percent" types={['number']} defaults="">
        Sets the fill length from 0 to 100.
      </PropTable.Prop>
    </PropTable>
  </Panel>
));

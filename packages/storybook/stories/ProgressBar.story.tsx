import { Box, H1, H2, H3, Panel, ProgressBar } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Code, CodePreview, PropTable } from '../components';

storiesOf('ProgressBar', module).add('Overview', () => (
  <Panel>
    <H1>ProgressBar</H1>
    <H2>Examples</H2>
    <H3 marginTop="xLarge">Determinant</H3>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Box marginVertical="large">
        <ProgressBar percent={50} />
      </Box>
      {/* jsx-to-string:end */}
    </CodePreview>
    <p>
      Determinant Progress represents a known amount of time or completeness for a task. A <Code>percent</Code> prop
      needs to be passed to render a determinate progress.
    </p>

    <H3 marginTop="xLarge">Indeterminant</H3>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Box marginVertical="large">
        <ProgressBar />
      </Box>
      {/* jsx-to-string:end */}
    </CodePreview>
    <p>
      Indeterminant Progress represents an unknown amount of time for a task to complete. Component will render an
      indeterminant progress when missing a <Code>percent</Code> prop.
    </p>

    <H2 marginTop="xxxLarge">Properties & Methods</H2>
    <PropTable>
      <PropTable.Prop name="percent" types="number">
        Sets the fill length from 0 to 100.
      </PropTable.Prop>
    </PropTable>
  </Panel>
));

import { Box, H0, H1, H2, Link, ProgressBar, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { ProgressBarPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Progress Bar</H0>

    <Text>
      <Link href="https://design.bigcommerce.com/components/progress-indicators" target="_blank">
        Progress Indicator Design Guidelines
      </Link>
    </Text>

    <H1>Determinant</H1>

    <Text>
      Determinant Progress represents a known amount of time or completeness for a task. A <Code primary>percent</Code>{' '}
      prop needs to be passed to render a determinate progress.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Box marginVertical="large">
        <ProgressBar percent={50} />
      </Box>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Indeterminant</H1>

    <Text>
      Indeterminant Progress represents an unknown amount of time for a task to complete. Component will render an
      indeterminant progress when missing a <Code primary>percent</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Box marginVertical="large">
        <ProgressBar />
      </Box>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>ProgressBar</H2>

    <ProgressBarPropTable />
  </>
);

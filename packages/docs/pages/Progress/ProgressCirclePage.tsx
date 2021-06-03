import { H1, H3, Link, ProgressCircle, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { ProgressCirclePropTable } from '../../PropTables';

const ProgressCirclePage = () => (
  <>
    <H1>Progress Circle</H1>

    <Text>
      <Link href="https://design.bigcommerce.com/components/progress-indicators" target="_blank">
        Progress Indicator Design Guidelines
      </Link>
      .
    </Text>

    <H3>Determinant</H3>

    <Text>
      Determinant Progress represents a known amount of time or completeness for a task. A <Code primary>percent</Code>{' '}
      prop needs to be passed to render a determinate progress.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <ProgressCircle error={false} percent={50} size="large" />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H3>Indeterminant</H3>

    <Text>
      Indeterminant Progress represents an unknown amount of time for a task to complete. Component will render an
      indeterminant progress when missing a <Code primary>percent</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <ProgressCircle size="large" />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H3>API</H3>
    <ProgressCirclePropTable />
  </>
);

export default ProgressCirclePage;

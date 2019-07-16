import { H1, H2, H3, Panel, ProgressCircle } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { CodePreview, PropTable } from '../components';

storiesOf('ProgressCircle', module).add('Overview', () => (
  <Panel>
    <H1>ProgressCircle</H1>
    <H2>Examples</H2>
    <H3 marginTop="xLarge">Determinant</H3>
    <CodePreview>
      <ProgressCircle error={false} percent={50} size={'large'} />
    </CodePreview>
    <p>
      Determinant Progress represents a known amount of time or completeness for a task. A <code>percent</code> prop
      needs to be passed to render a determinate progress.
    </p>

    <H3 marginTop="xLarge">Indeterminant</H3>
    <CodePreview>
      <ProgressCircle size={'large'} />
    </CodePreview>
    <p>
      Indeterminant Progress represents an unknown amount of time for a task to complete. Component will render an
      indeterminant progress when missing a <code>percent</code> prop.
    </p>

    <H2 marginTop="xxxLarge">Properties & Methods</H2>
    <PropTable>
      <PropTable.Prop name="error" types={['boolean']} defaults="">
        Sets state to error.
      </PropTable.Prop>
      <PropTable.Prop name="percent" types={['number']} defaults="">
        Sets the fill length from 0 to 100.
      </PropTable.Prop>
      <PropTable.Prop name="size" types={['xSmall', 'small', 'medium', 'large']} defaults="medium">
        Size of the component.
      </PropTable.Prop>
    </PropTable>
  </Panel>
));

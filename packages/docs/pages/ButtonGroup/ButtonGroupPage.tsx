import { Box, ButtonGroup, H0, H1, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { ButtonGroupPropTable } from '../../PropTables/ButtonGroupPropTable';

const ButtonGroupPage = () => (
  <>
    <H0>Button Group</H0>

    <Text>
      The <Code primary>Button Group</Code> component is used for grouping actions like <Code primary>Button</Code>
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <ButtonGroup actions={[{ text: 'Button' }, { text: 'Button' }, { text: 'Button' }]} />
      {/* jsx-to-string:end */}
    </CodePreview>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Box style={{ width: 300 }}>
        <ButtonGroup
          actions={[{ text: 'Button' }, { text: 'Button' }, { text: 'Button' }, { text: 'Button' }, { text: 'Button' }]}
        />
      </Box>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <ButtonGroupPropTable />
  </>
);

export default ButtonGroupPage;

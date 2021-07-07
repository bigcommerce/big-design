import { Box, ButtonGroup, H0, H1, H2, Text } from '@bigcommerce/big-design';
import { CheckIcon, InfoIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { ButtonGroupPropTable } from '../../PropTables/ButtonGroupPropTable';

const ButtonGroupPage = () => (
  <>
    <H0>Button Group</H0>

    <Text>
      The <Code primary>Button Group</Code> component is used for grouping actions like <Code primary>Button</Code>.
      Allows to save space and reduce visual overload when there are multiple actions available for the same entity.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Box style={{ width: 400 }}>
        <ButtonGroup
          actions={[
            { text: 'Button 1' },
            { text: 'Button 2' },
            { text: 'Button 3' },
            { text: 'Button 4' },
            { text: 'Button 5' },
          ]}
        />
      </Box>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <ButtonGroupPropTable />

    <H1>Examples</H1>
    <H2>Action type destructive</H2>
    <Text>
      By default action with <Code>actionsType: 'destructive'</Code> hides under the ellipsis.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <ButtonGroup
        actions={[{ actionType: 'destructive', text: 'Button 1' }, { text: 'Button 2' }, { text: 'Button 3' }]}
      />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Icon property</H2>
    <Text>Icon is available only for actions which is hidden under the ellipsis.</Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Box style={{ width: 400 }}>
        <ButtonGroup
          actions={[
            { icon: <InfoIcon />, text: 'Button 1' },
            { text: 'Button 2' },
            { text: 'Button 3' },
            { icon: <InfoIcon />, text: 'Button 4' },
            { icon: <CheckIcon />, text: 'Button 5' },
          ]}
        />
      </Box>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);

export default ButtonGroupPage;

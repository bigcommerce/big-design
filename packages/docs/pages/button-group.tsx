import { Box, ButtonGroup, H1, Panel, Text } from '@bigcommerce/big-design';
import { CheckIcon, InfoIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { ButtonGroupPropTable } from '../PropTables';

const ButtonGroupPage = () => {
  return (
    <>
      <H1>Button Group</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          Allows to save space and reduce visual overload when there are multiple actions available for the same entity.
        </Text>
        <Text bold>When to use it:</Text>
        <List>
          <List.Item>In tables as a list of bulk actions available for the selected items.</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'basic',
              title: 'Basic',
              render: () => (
                <>
                  <Text>
                    The <Code primary>Button Group</Code> component is used for grouping actions like{' '}
                    <Code primary>Button</Code>. Allows to save space and reduce visual overload when there are multiple
                    actions available for the same entity.
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
                </>
              ),
            },
            {
              id: 'action-type-destructive',
              title: 'Action type destructive',
              render: () => (
                <>
                  <Text>
                    By default action with <Code>actionsType: 'destructive'</Code> hides under the ellipsis.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <ButtonGroup
                      actions={[
                        { actionType: 'destructive', text: 'Button 1' },
                        { text: 'Button 2' },
                        { text: 'Button 3' },
                      ]}
                    />
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </>
              ),
            },
            {
              id: 'icon-property',
              title: 'Icon property',
              render: () => (
                <>
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
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ButtonGroupPropTable renderPanel={false} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            'Hide secondary actions or actions that doesn’t fit the container under ellipsis.',
            'Hide destructive actions under ellipsis.',
            'Keep all the controls in the same outlined style.',
            'Show only actions that are available for the entity.',
          ]}
          discouraged={[
            'Move some controls to the second row.',
            'Stylize some of the actions in the group differently (disabled, primary, destructive, etc.)',
            'Use icons or text + icon for actions (except for ellipsis).',
          ]}
        />
      </Panel>
    </>
  );
};

export default ButtonGroupPage;

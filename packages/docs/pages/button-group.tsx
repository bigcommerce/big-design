import { Box, ButtonGroup, H1, Panel, Text } from '@bigcommerce/big-design';
import { CheckIcon, InfoIcon } from '@bigcommerce/big-design-icons';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List, NextLink } from '../components';
import { ButtonGroupPropTable } from '../PropTables';

const ButtonGroupPage = () => {
  return (
    <>
      <H1>ButtonGroup</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          Allows to save space and reduce visual overload when there are multiple actions available for the same entity.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            In <NextLink href="/table">Tables</NextLink> as a list of bulk actions available for the selected items.
          </List.Item>
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
                <Fragment key="basic">
                  <Text>
                    The <Code primary>ButtonGroup</Code> component is used for grouping actions like{' '}
                    <NextLink href="/button">Button</NextLink>. Allows to save space and reduce visual overload when
                    there are multiple actions available for the same entity.
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
                </Fragment>
              ),
            },
            {
              id: 'action-type-destructive',
              title: 'Action type destructive',
              render: () => (
                <Fragment key="action-type-destructive">
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
                </Fragment>
              ),
            },
            {
              id: 'icon-property',
              title: 'Icon property',
              render: () => (
                <Fragment key="icon-property">
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
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ButtonGroupPropTable />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            <>
              Hide <Code>secondary</Code> actions or <Code primary>actions</Code> that don’t fit the container under
              ellipsis.
            </>,
            <>
              Hide <Code>destructive</Code> actions under ellipsis.
            </>,
            <>Keep all the controls in the same outlined style.</>,
            <>
              Show only <Code primary>actions</Code> that are available for the entity.
            </>,
          ]}
          discouraged={[
            <>Move some controls to the second row.</>,
            <>
              Stylize some of the <Code primary>actions</Code> in the group differently (disabled, primary, destructive,
              etc.).
            </>,
            <>
              Use icons or text + icon for <Code primary>actions</Code>(except for ellipsis).
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default ButtonGroupPage;

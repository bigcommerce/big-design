import { Box, ButtonGroup, H1, Panel, Text } from '@bigcommerce/big-design';
import { CheckIcon, InfoIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview, PageNavigation } from '../../components';
import { ButtonGroupPropTable } from '../../PropTables/ButtonGroupPropTable';

const ButtonGroupPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel>
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
          </Panel>
          <Panel header="Action type destructive">
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
          </Panel>
          <Panel header="Icon property">
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
          </Panel>
        </>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => <ButtonGroupPropTable />,
    },
  ];

  return (
    <>
      <H1>Button Group</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default ButtonGroupPage;

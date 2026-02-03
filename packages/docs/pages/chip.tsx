import { Chip, H1, Panel, Text } from '@bigcommerce/big-design';
import { AddIcon } from '@bigcommerce/big-design-icons';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { ChipPropTable, MarginPropTable } from '../PropTables';

const ChipPage = () => {
  return (
    <>
      <H1>Chip</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Chips</Code> are compact elements that represent an input, attribute, or
          action. They can show a label with an optional leading icon and an optional remove
          control.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use <Code primary>Chips</Code> to display selected filters, tags, or choices that can be
            removed.
          </List.Item>
          <List.Item>
            Use the <Code primary>icon</Code> prop to add context (e.g. a category icon, status
            icon).
          </List.Item>
          <List.Item>
            Use the <Code primary>onDelete</Code> prop when the user should be able to remove the
            chip (e.g. selected filters, multi-select values).
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
                    A basic <Code primary>Chip</Code> displays a label. It does not include a remove
                    button unless <Code primary>onDelete</Code> is provided.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Chip label="Basic chip" />
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'with-icon',
              title: 'With icon',
              render: () => (
                <Fragment key="with-icon">
                  <Text>
                    Use the <Code primary>icon</Code> prop to display an icon before the label. Pass
                    any icon from <Code>@bigcommerce/big-design-icons</Code>.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <Chip icon={<AddIcon size="medium" />} label="With icon" />
                      <Chip
                        icon={<AddIcon size="medium" />}
                        label="With icon and remove"
                        onDelete={() => null}
                      />
                    </>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'removable',
              title: 'Removable',
              render: () => (
                <Fragment key="removable">
                  <Text>
                    Provide an <Code primary>onDelete</Code> callback to show a remove button. When
                    the user clicks it, your handler can update state to remove the chip.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Chip label="Removable chip" onDelete={() => null} />
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ChipPropTable inheritedProps={<MarginPropTable collapsible />} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>Use chips for primary actions; use buttons instead.</>,
            <>Use chips when a simple badge or label is enough (e.g. status).</>,
          ]}
          recommended={[
            <>Use chips for selected filters, tags, or removable choices.</>,
            <>Use the icon to give quick visual context when it helps (e.g. category, type).</>,
            <>Keep chip labels short and scannable.</>,
          ]}
        />
      </Panel>
    </>
  );
};

export default ChipPage;

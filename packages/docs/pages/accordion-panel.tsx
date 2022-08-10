import { AccordionGroup, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import {
  AccordionGroupPropTable,
  AccordionPanelPropTable,
} from '../PropTables/AccordionPanelPropTable';

const AccordionPanelPage = () => {
  return (
    <>
      <H1>Accordion Panel</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Accordion panels</Code> are containers for content of relative importance to
          the user that can be selectively expanded or collapsed. They can be useful for reducing
          the content on a page &amp; the cognitive load for the user.
        </Text>
        <Text>
          An <Code primary>accordion panel</Code> can display different types of content such as
          text, images, tables, media, buttons, etc. Components are added into the drop zone and
          render when the user expands the corresponding panel.
        </Text>

        <Text bold>When to use:</Text>
        <List>
          <List.Item>On similar or redundant information that must be presented together</List.Item>
          <List.Item>Step-by-step or sequential processes</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <CodePreview>
          {/* jsx-to-string:start */}
          {function Example() {
            const [isExpanded, setIsExpanded] = useState(false);

            const onClick = () => {
              setIsExpanded(!isExpanded);
            };

            const panels = [
              {
                defaultExpanded: true,
                header: 'Panel Header',
                isExpanded,
                onClick,
                children: (
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Pulvinar mattis nunc sed blandit
                    libero volutpat. Eu lobortis elementum nibh tellus molestie nunc non.
                  </Text>
                ),
              },
              {
                header: 'Panel Header',
                isExpanded,
                onClick,
                children: (
                  <Text>
                    Nullam eleifend a lectus non consequat. Fusce non mauris at velit sodales
                    venenatis vitae ut erat. In hac habitasse platea dictumst. Quisque venenatis
                    turpis at dapibus posuere. Phasellus pulvinar velit id tellus luctus, ac
                    pharetra libero consequat.
                  </Text>
                ),
              },
            ];

            return (
              <>
                <AccordionGroup header="Accordion Group Panel Header" panels={panels} />
              </>
            );
          }}
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'accordion-group',
              title: 'AccordionGroup',
              render: () => <AccordionGroupPropTable />,
            },
            {
              id: 'accordion',
              title: 'AccordionPanel',
              render: () => <AccordionPanelPropTable id="accordion-panel-prop-table" />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            'Do not use accordions to hide important user tasks.',
            'Do not use the icon prop unless it provides benefit to the user.',
            'Do not nest accordions within accordions.',
            'Do not use an accordion to hide a singular piece of content.',
          ]}
          recommended={[
            'Choose meaningful headers that describe the content revealed on expand.',
            'Use the icon prop sparingly; an appropriate use would be the status of a task hidden in the accordion.',
            'Use accordions to present parallel content or like items.',
            'Limit the number of tasks hidden in each accordion to one.',
            'Start with all panels collapsed unless the user has been redirected to the content.',
          ]}
        />
      </Panel>
    </>
  );
};

export default AccordionPanelPage;

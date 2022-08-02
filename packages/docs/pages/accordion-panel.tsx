import {
  AccordionGroup,
  AccordionPanel,
  Form,
  FormGroup,
  H1,
  InputProps,
  Panel,
  Radio,
  Text,
} from '@bigcommerce/big-design';
import { ErrorIcon } from '@bigcommerce/big-design-icons';
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
              const nextIsExpanded = !isExpanded;

              setIsExpanded(nextIsExpanded);
            };

            const [selected, setSelected] = useState('');

            const handleChange: InputProps['onChange'] = (event) => setSelected(event.target.value);

            return (
              <>
                <AccordionGroup header="Accordion Group Panel Header">
                  <AccordionPanel
                    defaultExpanded={true}
                    header="Panel Header"
                    isExpanded={isExpanded}
                    onClick={onClick}
                  >
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Pulvinar mattis nunc sed blandit
                      libero volutpat. Eu lobortis elementum nibh tellus molestie nunc non.
                    </Text>
                  </AccordionPanel>
                  <AccordionPanel
                    header="Panel Header"
                    iconLeft={<ErrorIcon color="danger40" />}
                    isExpanded={isExpanded}
                  >
                    <Form>
                      <FormGroup>
                        <Radio
                          checked={selected === 'catalog'}
                          label="Entire Catalog"
                          onChange={handleChange}
                          value="catalog"
                        />
                        <Radio
                          checked={selected === 'product'}
                          label="Individual Product"
                          onChange={handleChange}
                          value="product"
                        />
                      </FormGroup>
                    </Form>
                  </AccordionPanel>
                </AccordionGroup>
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
              title: 'Accordion Group',
              render: () => <AccordionGroupPropTable />,
            },
            {
              id: 'accordion',
              title: 'Accordion Panel',
              render: () => <AccordionPanelPropTable />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>Do not use accordions to hide important user tasks.</>,
            <>Do not use the icon prop unless it provides benefit to the user.</>,
            <>Do not nest accordions within accordions.</>,
            <>Do not use an accordions to hide a singular piece of content.</>,
          ]}
          recommended={[
            <>Choose meaningful headers that describe the content revealed on expand.</>,
            <>
              Use the icon prop sparingly; an appropriate use would be the status of a task hidden
              in the accordions.
            </>,
            <>Use accordions to present parallel content or like items.</>,
            <>Limit the number of tasks hidden in each accordions to one.</>,
            <>
              Start with all panels collapsed unless the user has been redirected to the content.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default AccordionPanelPage;

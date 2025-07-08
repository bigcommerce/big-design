import { H1, Panel, PanelContents, Table, Text } from '@bigcommerce/big-design';
import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import {
  ButtonPropTable,
  DropdownPropTable,
  MarginPropTable,
  PanelActionPropTable,
  PanelContentsPropTable,
  PanelDropdownPropTable,
  PanelPropTable,
} from '../PropTables';

const PanelPage = () => {
  return (
    <>
      <H1>Panel</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Panel</Code> allows group content within a page. Content and actions on a
          page that are not in the header should be contained in a panel.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use seperate <Code primary>Panels</Code> to group related content or tasks on a page.
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
                <CodePreview>
                  {/* jsx-to-string:start */}
                  <Panel
                    action={{
                      variant: 'secondary',
                      text: 'Button',
                      onClick: () => {
                        // Do some action
                      },
                    }}
                    badge={{
                      label: 'Status',
                      variant: 'success',
                    }}
                    description="This is the panel's optional description."
                    header="Panel header"
                    lozenge={{
                      label: 'Beta',
                      variant: 'beta',
                    }}
                  >
                    <PanelContents>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sem erat,
                        sollicitudin quis varius sed, lacinia finibus sem. Pellentesque habitant
                        morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis
                        efficitur risus quis ante volutpat finibus. In varius mattis orci, et
                        volutpat erat rhoncus nec. Mauris lectus nisi, pharetra eget mollis id,
                        pulvinar in nisi. In dapibus urna turpis. Proin iaculis tincidunt turpis ac
                        viverra. Nullam auctor, leo non imperdiet consectetur, purus orci posuere
                        magna, eu varius nisl magna semper arcu. In sit amet scelerisque enim. In
                        varius, libero euismod finibus congue, turpis neque semper dolor,
                        sollicitudin pellentesque ante quam lobortis enim. Mauris posuere velit
                        magna, quis aliquet arcu pulvinar in.
                      </Text>
                    </PanelContents>
                  </Panel>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'dropdown-action',
              title: 'Dropdown Action',
              render: () => (
                <CodePreview>
                  {/* jsx-to-string:start */}
                  <Panel
                    action={{
                      items: [
                        {
                          content: 'Action 1',
                          onItemClick: (item) => {
                            // Do some action
                            return item.content;
                          },
                        },
                        {
                          content: 'Action 2',
                          onItemClick: (item) => {
                            // Do some action
                            return item.content;
                          },
                        },
                      ],
                      toggle: {
                        variant: 'utility',
                        iconOnly: <MoreHorizIcon />,
                      },
                    }}
                    description="Use this option when you want to have more than one action."
                    header="Panel with dropdown action"
                  >
                    <PanelContents>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sem erat,
                        sollicitudin quis varius sed, lacinia finibus sem. Pellentesque habitant
                        morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis
                        efficitur risus quis ante volutpat finibus. In varius mattis orci, et
                        volutpat erat rhoncus nec. Mauris lectus nisi, pharetra eget mollis id,
                        pulvinar in nisi. In dapibus urna turpis. Proin iaculis tincidunt turpis ac
                        viverra. Nullam auctor, leo non imperdiet consectetur, purus orci posuere
                        magna, eu varius nisl magna semper arcu. In sit amet scelerisque enim. In
                        varius, libero euismod finibus congue, turpis neque semper dolor,
                        sollicitudin pellentesque ante quam lobortis enim. Mauris posuere velit
                        magna, quis aliquet arcu pulvinar in.
                      </Text>
                    </PanelContents>
                  </Panel>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'unpadded-contents',
              title: 'Unpadded Contents',
              render: () => (
                <CodePreview>
                  {/* jsx-to-string:start */}
                  <Panel
                    description="Use this option when you want the contents to reach the panel side boundaries."
                    header="Panel with table"
                  >
                    <PanelContents padded={false}>
                      <Table
                        columns={[
                          {
                            header: 'Sku',
                            hash: 'sku',
                            render: ({ sku }) => sku,
                          },
                          { header: 'Name', hash: 'name', render: ({ name }) => name },
                          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
                        ]}
                        items={[
                          { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
                          { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
                          { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
                          { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
                          { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
                        ]}
                      />
                    </PanelContents>
                  </Panel>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'scrollable-contents',
              title: 'Scrollable Contents',
              render: () => (
                <CodePreview>
                  {/* jsx-to-string:start */}
                  <Panel
                    description="Use this option when you want the contents to be presented in a scrollable area."
                    header="Panel with scrollable contents"
                  >
                    <PanelContents height="300px" scrollable>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sem erat,
                        sollicitudin quis varius sed, lacinia finibus sem. Pellentesque habitant
                        morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis
                        efficitur risus quis ante volutpat finibus. In varius mattis orci, et
                        volutpat erat rhoncus nec. Mauris lectus nisi, pharetra eget mollis id,
                        pulvinar in nisi. In dapibus urna turpis. Proin iaculis tincidunt turpis ac
                        viverra. Nullam auctor, leo non imperdiet consectetur, purus orci posuere
                        magna, eu varius nisl magna semper arcu. In sit amet scelerisque enim. In
                        varius, libero euismod finibus congue, turpis neque semper dolor,
                        sollicitudin pellentesque ante quam lobortis enim. Mauris posuere velit
                        magna, quis aliquet arcu pulvinar in.
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sem erat,
                        sollicitudin quis varius sed, lacinia finibus sem. Pellentesque habitant
                        morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis
                        efficitur risus quis ante volutpat finibus. In varius mattis orci, et
                        volutpat erat rhoncus nec. Mauris lectus nisi, pharetra eget mollis id,
                        pulvinar in nisi. In dapibus urna turpis. Proin iaculis tincidunt turpis ac
                        viverra. Nullam auctor, leo non imperdiet consectetur, purus orci posuere
                        magna, eu varius nisl magna semper arcu. In sit amet scelerisque enim. In
                        varius, libero euismod finibus congue, turpis neque semper dolor,
                        sollicitudin pellentesque ante quam lobortis enim. Mauris posuere velit
                        magna, quis aliquet arcu pulvinar in.
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sem erat,
                        sollicitudin quis varius sed, lacinia finibus sem. Pellentesque habitant
                        morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis
                        efficitur risus quis ante volutpat finibus. In varius mattis orci, et
                        volutpat erat rhoncus nec. Mauris lectus nisi, pharetra eget mollis id,
                        pulvinar in nisi. In dapibus urna turpis. Proin iaculis tincidunt turpis ac
                        viverra. Nullam auctor, leo non imperdiet consectetur, purus orci posuere
                        magna, eu varius nisl magna semper arcu. In sit amet scelerisque enim. In
                        varius, libero euismod finibus congue, turpis neque semper dolor,
                        sollicitudin pellentesque ante quam lobortis enim. Mauris posuere velit
                        magna, quis aliquet arcu pulvinar in.
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sem erat,
                        sollicitudin quis varius sed, lacinia finibus sem. Pellentesque habitant
                        morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis
                        efficitur risus quis ante volutpat finibus. In varius mattis orci, et
                        volutpat erat rhoncus nec. Mauris lectus nisi, pharetra eget mollis id,
                        pulvinar in nisi. In dapibus urna turpis. Proin iaculis tincidunt turpis ac
                        viverra. Nullam auctor, leo non imperdiet consectetur, purus orci posuere
                        magna, eu varius nisl magna semper arcu. In sit amet scelerisque enim. In
                        varius, libero euismod finibus congue, turpis neque semper dolor,
                        sollicitudin pellentesque ante quam lobortis enim. Mauris posuere velit
                        magna, quis aliquet arcu pulvinar in.
                      </Text>
                    </PanelContents>
                  </Panel>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        {/* <PanelPropTable inheritedProps={<MarginPropTable collapsible />} /> */}
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'header',
              title: 'Header',
              render: () => <PanelPropTable inheritedProps={<MarginPropTable collapsible />} />,
            },
            {
              id: 'panel-action',
              title: 'PanelAction',
              render: () => (
                <PanelActionPropTable
                  id="panel-action-prop-table"
                  inheritedProps={<ButtonPropTable collapsible />}
                />
              ),
            },
            {
              id: 'panel-dropdown',
              title: 'PanelDropdown',
              render: () => (
                <PanelDropdownPropTable
                  id="panel-dropdown-prop-table"
                  inheritedProps={<DropdownPropTable collapsible />}
                />
              ),
            },
            {
              id: 'panel-contents',
              title: 'PanelContents',
              render: () => <PanelContentsPropTable id="panel-contents-prop-table" />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              <Code primary>Panel</Code> should avoid too many call-to-action buttons or links and
              have only one primary call to action.
            </>,
          ]}
          recommended={[
            <>
              <Code primary>Panel</Code> should use headings that set clear expectations about the
              content inside.
            </>,
            <>
              <Code primary>Panel</Code> should prioritize information so the most important content
              comes first.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default PanelPage;

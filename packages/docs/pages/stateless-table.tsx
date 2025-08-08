import { H1, Panel, Small, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import {
  StatelessTablePropTable,
  TRPropTable,
  THPropTable,
  TDPropTable,
  BasicTableComponentPropTable,
} from '../PropTables';
import {
  StatelessTable,
  Button,
  Caption,
  Checkbox,
  THead,
  TH,
  TBody,
  TR,
  TD,
  TFoot,
} from '@bigcommerce/big-design';
import { MoreHorizIcon } from '@bigcommerce/big-design-icons';

const StatelessTablePage = () => {
  return (
    <>
      <H1>StatelessTable</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>StatelessTable</Code> provides low-level building blocks for creating
          custom table components. Unlike the high-level <Code primary>Table</Code> component,
          StatelessTable gives you direct control over the table structure and behavior.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            When you need complete control over table structure and behavior.
          </List.Item>
          <List.Item>
            When building custom table components with specific requirements.
          </List.Item>
          <List.Item>
            When the high-level Table component doesn't meet your needs.
          </List.Item>
          <List.Item>
            When you need to implement custom sorting, filtering, or pagination logic.
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
                <CodePreview key="basic">
                  {/* jsx-to-string:start */}
                  <StatelessTable>
                    <THead>
                      <TR>
                        <TH>SKU</TH>
                        <TH>Name</TH>
                        <TH>Stock</TH>
                      </TR>
                    </THead>
                    <TBody>
                      <TR>
                        <TD mobileHeader="SKU">SM13</TD>
                        <TD mobileHeader="Name">[Sample] Smith Journal 13</TD>
                        <TD mobileHeader="Stock">25</TD>
                      </TR>
                      <TR>
                        <TD mobileHeader="SKU">DPB</TD>
                        <TD mobileHeader="Name">[Sample] Dustpan & Brush</TD>
                        <TD mobileHeader="Stock">34</TD>
                      </TR>
                      <TR>
                        <TD mobileHeader="SKU">OFSUC</TD>
                        <TD mobileHeader="Name">[Sample] Utility Caddy</TD>
                        <TD mobileHeader="Stock">45</TD>
                      </TR>
                    </TBody>
                  </StatelessTable>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'with-caption',
              title: 'With Caption',
              render: () => (
                <CodePreview key="with-caption">
                  {/* jsx-to-string:start */}
                  <StatelessTable>
                    <Caption>Product Inventory Summary</Caption>
                    <THead>
                      <TR>
                        <TH>SKU</TH>
                        <TH>Name</TH>
                        <TH>Stock</TH>
                      </TR>
                    </THead>
                    <TBody>
                      <TR>
                        <TD mobileHeader="SKU">SM13</TD>
                        <TD mobileHeader="Name">[Sample] Smith Journal 13</TD>
                        <TD mobileHeader="Stock">25</TD>
                      </TR>
                      <TR>
                        <TD mobileHeader="SKU">DPB</TD>
                        <TD mobileHeader="Name">[Sample] Dustpan & Brush</TD>
                        <TD mobileHeader="Stock">34</TD>
                      </TR>
                    </TBody>
                  </StatelessTable>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'with-footer',
              title: 'With Footer',
              render: () => (
                <CodePreview key="with-footer">
                  {/* jsx-to-string:start */}
                  <StatelessTable>
                    <THead>
                      <TR>
                        <TH>Product</TH>
                        <TH align="right">Quantity</TH>
                        <TH align="right">Price</TH>
                      </TR>
                    </THead>
                    <TBody>
                      <TR>
                        <TD mobileHeader="Product">Smith Journal 13</TD>
                        <TD mobileHeader="Quantity" align="right">2</TD>
                        <TD mobileHeader="Price" align="right">$29.99</TD>
                      </TR>
                      <TR>
                        <TD mobileHeader="Product">Dustpan & Brush</TD>
                        <TD mobileHeader="Quantity" align="right">1</TD>
                        <TD mobileHeader="Price" align="right">$14.99</TD>
                      </TR>
                    </TBody>
                    <TFoot>
                      <TR>
                        <TD mobileHeader="Product">
                          <Text bold>Total</Text>
                        </TD>
                        <TD mobileHeader="Quantity" align="right">
                          <Text bold>3</Text>
                        </TD>
                        <TD mobileHeader="Price" align="right">
                          <Text bold>$74.97</Text>
                        </TD>
                      </TR>
                    </TFoot>
                  </StatelessTable>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'mobile-headers',
              title: 'Mobile Headers',
              render: () => (
                <Fragment key="mobile-headers">
                  <Text>
                    Use <Code primary>mobileHeader</Code> prop on <Code primary>TD</Code> components
                    to provide column labels that appear on mobile devices when the table stacks
                    vertically.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <StatelessTable>
                      <THead>
                        <TR>
                          <TH>SKU</TH>
                          <TH>Name</TH>
                          <TH>Stock</TH>
                        </TR>
                      </THead>
                      <TBody>
                        <TR>
                          <TD mobileHeader="SKU">SM13</TD>
                          <TD mobileHeader="Name">[Sample] Smith Journal 13</TD>
                          <TD mobileHeader="Stock">25</TD>
                        </TR>
                        <TR>
                          <TD mobileHeader="SKU">DPB</TD>
                          <TD mobileHeader="Name">[Sample] Dustpan & Brush</TD>
                          <TD mobileHeader="Stock">34</TD>
                        </TR>
                      </TBody>
                    </StatelessTable>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'row-status',
              title: 'Row Status',
              render: () => (
                <Fragment key="row-status">
                  <Text>
                    Use the <Code primary>status</Code> prop on <Code primary>TR</Code> components
                    to indicate different row states.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <StatelessTable>
                      <THead>
                        <TR>
                          <TH>Product</TH>
                          <TH>Status</TH>
                          <TH>Stock</TH>
                        </TR>
                      </THead>
                      <TBody>
                        <TR status="success">
                          <TD mobileHeader="Product">Smith Journal 13</TD>
                          <TD mobileHeader="Status">In Stock</TD>
                          <TD mobileHeader="Stock">25</TD>
                        </TR>
                        <TR status="warning">
                          <TD mobileHeader="Product">Dustpan & Brush</TD>
                          <TD mobileHeader="Status">Low Stock</TD>
                          <TD mobileHeader="Stock">3</TD>
                        </TR>
                        <TR status="danger">
                          <TD mobileHeader="Product">Canvas Laundry Cart</TD>
                          <TD mobileHeader="Status">Out of Stock</TD>
                          <TD mobileHeader="Stock">0</TD>
                        </TR>
                        <TR status="info">
                          <TD mobileHeader="Product">Utility Caddy</TD>
                          <TD mobileHeader="Status">Reordering</TD>
                          <TD mobileHeader="Stock">45</TD>
                        </TR>
                      </TBody>
                    </StatelessTable>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'checkbox-cells',
              title: 'Checkbox Cells',
              render: () => (
                <Fragment key="checkbox-cells">
                  <Text>
                    Use <Code primary>isCheckbox</Code> prop on <Code primary>TD</Code> components
                    for selection functionality.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <StatelessTable>
                      <THead>
                        <TR>
                          <TH>
                            <Checkbox label={''}></Checkbox>
                          </TH>
                          <TH>Product</TH>
                          <TH>Stock</TH>
                        </TR>
                      </THead>
                      <TBody>
                        <TR>
                          <TD isCheckbox>
                            <Checkbox label={''}></Checkbox>
                          </TD>
                          <TD mobileHeader="Product">Smith Journal 13</TD>
                          <TD mobileHeader="Stock">25</TD>
                        </TR>
                        <TR>
                          <TD isCheckbox>
                            <Checkbox label={''}></Checkbox>
                          </TD>
                          <TD mobileHeader="Product">Dustpan & Brush</TD>
                          <TD mobileHeader="Stock">34</TD>
                        </TR>
                      </TBody>
                    </StatelessTable>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'action-cells',
              title: 'Action Cells',
              render: () => (
                <Fragment key="action-cells">
                  <Text>
                    Use <Code primary>isAction</Code> prop on <Code primary>TD</Code> components
                    for action buttons and controls.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <StatelessTable>
                      <THead>
                        <TR>
                          <TH>Product</TH>
                          <TH>Stock</TH>
                          <TH>Actions</TH>
                        </TR>
                      </THead>
                      <TBody>
                        <TR>
                          <TD mobileHeader="Product">Smith Journal 13</TD>
                          <TD mobileHeader="Stock">25</TD>
                          <TD isAction>
                            <Button
                              mobileWidth="auto"
                              variant="utility"
                              iconOnly={<MoreHorizIcon />}
                            ></Button>
                          </TD>
                        </TR>
                        <TR>
                          <TD mobileHeader="Product">Dustpan & Brush</TD>
                          <TD mobileHeader="Stock">34</TD>
                          <TD isAction>
                            <Button
                              mobileWidth="auto"
                              variant="utility"
                              iconOnly={<MoreHorizIcon />}
                            ></Button>
                          </TD>
                        </TR>
                      </TBody>
                    </StatelessTable>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'alignment',
              title: 'Text Alignment',
              render: () => (
                <Fragment key="alignment">
                  <Text>
                    Use the <Code primary>align</Code> prop on <Code primary>TH</Code> and{' '}
                    <Code primary>TD</Code> components to control text alignment.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <StatelessTable>
                      <THead>
                        <TR>
                          <TH align="left">Product</TH>
                          <TH align="center">Category</TH>
                          <TH align="right">Price</TH>
                        </TR>
                      </THead>
                      <TBody>
                        <TR>
                          <TD mobileHeader="Product" align="left">Smith Journal 13</TD>
                          <TD mobileHeader="Category" align="center">Books</TD>
                          <TD mobileHeader="Price" align="right">$29.99</TD>
                        </TR>
                        <TR>
                          <TD mobileHeader="Product" align="left">Dustpan & Brush</TD>
                          <TD mobileHeader="Category" align="center">Tools</TD>
                          <TD mobileHeader="Price" align="right">$14.99</TD>
                        </TR>
                      </TBody>
                    </StatelessTable>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'column-widths',
              title: 'Column Widths',
              render: () => (
                <Fragment key="column-widths">
                  <Text>
                    Use the <Code primary>width</Code> prop on <Code primary>TH</Code> and{' '}
                    <Code primary>TD</Code> components to control column widths.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <StatelessTable>
                      <THead>
                        <TR>
                          <TH width="100px">SKU</TH>
                          <TH width="60%">Product Name</TH>
                          <TH width="80px">Stock</TH>
                        </TR>
                      </THead>
                      <TBody>
                        <TR>
                          <TD mobileHeader="SKU" width="100px">SM13</TD>
                          <TD mobileHeader="Product Name" width="60%">[Sample] Smith Journal 13 - A very long product name that demonstrates text wrapping</TD>
                          <TD mobileHeader="Stock" width="80px">25</TD>
                        </TR>
                        <TR>
                          <TD mobileHeader="SKU" width="100px">DPB</TD>
                          <TD mobileHeader="Product Name" width="60%">[Sample] Dustpan & Brush</TD>
                          <TD mobileHeader="Stock" width="80px">34</TD>
                        </TR>
                      </TBody>
                    </StatelessTable>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Components" headerId="components">
        <Text>
          The StatelessTable is composed of several sub-components that can be used together:
        </Text>
        <List>
          <List.Item>
            <Code primary>StatelessTable</Code> - The main table wrapper
          </List.Item>
          <List.Item>
            <Code primary>Caption</Code> - Table caption for accessibility and context
          </List.Item>
          <List.Item>
            <Code primary>THead</Code> - Table header section
          </List.Item>
          <List.Item>
            <Code primary>TH</Code> - Table header cell
          </List.Item>
          <List.Item>
            <Code primary>TBody</Code> - Table body section
          </List.Item>
          <List.Item>
            <Code primary>TR</Code> - Table row
          </List.Item>
          <List.Item>
            <Code primary>TD</Code> - Table data cell
          </List.Item>
          <List.Item>
            <Code primary>TFoot</Code> - Table footer section
          </List.Item>
        </List>
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'stateless-table',
              title: 'StatelessTable',
              render: () => <StatelessTablePropTable />,
            },
            {
              id: 'tr',
              title: 'TR (Table Row)',
              render: () => <TRPropTable />,
            },
            {
              id: 'th',
              title: 'TH (Table Header)',
              render: () => <THPropTable />,
            },
            {
              id: 'td',
              title: 'TD (Table Data)',
              render: () => <TDPropTable />,
            },
            {
              id: 'caption',
              title: 'Caption',
              render: () => <BasicTableComponentPropTable title="Caption" />,
            },
            {
              id: 'thead',
              title: 'THead',
              render: () => <BasicTableComponentPropTable title="THead" />,
            },
            {
              id: 'tbody',
              title: 'TBody',
              render: () => <BasicTableComponentPropTable title="TBody" />,
            },
            {
              id: 'tfoot',
              title: 'TFoot',
              render: () => <BasicTableComponentPropTable title="TFoot" />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Don't use StatelessTable when the high-level <Code primary>Table</Code> component
              meets your needs.
            </>,
            <>
              Don't forget to provide <Code primary>mobileHeader</Code> props for responsive
              behavior.
            </>,
            <>
              Don't mix StatelessTable components with regular HTML table elements (
              <Code primary>table</Code>, <Code primary>thead</Code>, etc.).
            </>,
            <>
              Don't forget to use proper semantic structure (<Code primary>THead</Code>,{' '}
              <Code primary>TBody</Code>, <Code primary>TFoot</Code>) for accessibility.
            </>,
          ]}
          recommended={[
            'Use StatelessTable when you need complete control over table behavior.',
            'Always provide meaningful mobile headers for responsive design.',
            'Use row status indicators to communicate important state information.',
            'Implement proper keyboard navigation for interactive elements.',
            'Consider using the high-level Table component first before reaching for StatelessTable.',
          ]}
        />
      </Panel>
    </>
  );
};

export default StatelessTablePage;

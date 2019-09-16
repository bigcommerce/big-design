import { Flex, H0, Table } from '@bigcommerce/big-design';

import { CodePreview } from '../../components';

export default () => {
  return (
    <>
      <H0>Basic Table</H0>
      {/* <Text>
        Intro text.
        <Link href="https://design.bigcommerce.com/components" target="_blank">
          Design Guidelines
        </Link>
        .
      </Text> */}
      <CodePreview>
        {/* jsx-to-string:start */}
        {function Example() {
          return (
            <>
              <Table selectable>
                <Table.Actions justifyContent="space-between">
                  <Flex.Item>Test</Flex.Item>
                </Table.Actions>
                <Table.Head>
                  <Table.Row>
                    <Table.Cell>Prop Name</Table.Cell>
                    <Table.Cell>Type</Table.Cell>
                    <Table.Cell>Default</Table.Cell>
                    <Table.Cell>Description</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>isOpen</Table.Cell>
                    <Table.Cell>boolean</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>Determine if the modal/dialog is open</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>isOpen</Table.Cell>
                    <Table.Cell>boolean</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>Determine if the modal/dialog is open</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>isOpen</Table.Cell>
                    <Table.Cell>boolean</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>Determine if the modal/dialog is open</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </>
          );
        }}
        {/* jsx-to-string:end */}
      </CodePreview>
      {/* <H1>API</H1>
      <H2>Component Name</H2>
      <H2>Static Member</H2>
      <H2>Inherited Props</H2>
      <Collapsible title="Inherited Props">
        <InheritedPropTable />
      </Collapsible>
      <H1>Examples</H1>
      <H2>Example 1</H2>
      <CodePreview></CodePreview> || <CodeSnippet></CodeSnippet>
      <H2>Example 2</H2>
      <CodePreview></CodePreview> || <CodeSnippet></CodeSnippet> */}
    </>
  );
};

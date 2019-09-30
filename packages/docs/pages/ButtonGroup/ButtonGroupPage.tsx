import { Button, ButtonGroup, Dropdown, H0, H1, H2, Text } from '@bigcommerce/big-design';
import { ArrowDropDownIcon } from '@bigcommerce/big-design-icons';

import { Code, CodePreview, CodeSnippet, Collapsible } from '../../components';
import { FlexPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Button Group</H0>

    <Text>Group a series of Buttons.</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <ButtonGroup>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button iconRight={<ArrowDropDownIcon />}>Button</Button>
      </ButtonGroup>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Inherited Props</H2>

    <Collapsible title="Flex Props">
      <FlexPropTable />
    </Collapsible>

    <H1>Examples</H1>

    <H2>Secondary Button Group</H2>

    <CodePreview>
      {/* jsx-to-string:start */}
      <ButtonGroup>
        <Button variant="secondary">Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="secondary" iconRight={<ArrowDropDownIcon />}>
          Button
        </Button>
      </ButtonGroup>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Button Group with Dropdown</H2>

    <Text>
      Button Groups only allow <Code>Button</Code>'s and <Code>Dropdowns</Code> as children.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <ButtonGroup>
        <Button>Button</Button>
        <Button>Button</Button>
        <Dropdown placement="bottom-end" trigger={<Button iconRight={<ArrowDropDownIcon />}>Button</Button>}>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
        </Dropdown>
      </ButtonGroup>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);

import { Button, Flex, H0, H1, H2, Link, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview, Collapsible } from '../../components';
import { BoxPropTable, MarginPropTable, PanelPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Panels</H0>

    <Text>
      The panel component is used to contain content in a structured format.{' '}
      <Link href="https://design.bigcommerce.com/components/panels" target="_blank">
        Panel Design Guidlines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Panel>
        <Flex justifyContent="space-between" flexDirection="row">
          <Flex.Item>
            <H2>Panel header</H2>
          </Flex.Item>
          <Flex.Item>
            <Button variant="secondary">Button</Button>
          </Flex.Item>
        </Flex>
        <Text>
          Lorem ipsum dolor amet officia humblebrag selvage, subway tile vexillologist id pickled adaptogen fashion axe.
          Ennui meh pitchfork banh mi. Keffiyeh PBRB echo park gastropub. Pop-up neutra brunch ullamco affogato shaman
          vexillologist quinoa post-ironic locavore. Retro selfies proident synth ethical quinoa marfa chartreuse dolor
          vexillologist gochujang. Tempor poke unicorn, readymade crucifix fugiat culpa. Kinfolk hella asymmetrical,
          meggings et consectetur lomo farm-to-table exercitation DIY.
        </Text>
        <Text>
          Leggings consectetur heirloom, sustainable 90's scenester sartorial sint meditation portland health goth
          bespoke gastropub authentic. Flannel iceland narwhal, laborum adaptogen paleo glossier reprehenderit. Ethical
          ugh copper mug voluptate brooklyn velit 3 wolf moon tacos. Bushwick vexillologist air plant, veniam jianbing
          poke semiotics wayfarers. Typewriter single-origin coffee cray, thundercats asymmetrical succulents green
          juice irure cred taxidermy celiac.
        </Text>
      </Panel>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Panel</H2>

    <PanelPropTable />

    <H2>Inherited Props</H2>

    <Collapsible title="Margin Props">
      <MarginPropTable />
    </Collapsible>
  </>
);

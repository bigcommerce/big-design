import { Button, Flex, H2, Panel, Text } from '@bigcommerce/plab';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Panel', module).add('Overview', () => (
  <div style={{ padding: 50 }}>
    <Panel>
      <Flex justifyContent="space-between">
        <H2>Panel header - h2</H2>
        <Button variant="secondary">Button</Button>
      </Flex>
      <Text>Text -p</Text>
    </Panel>

    <Panel>
      <H2>Panel header - h2</H2>
      <Text>Text -p</Text>
    </Panel>

    <Panel>
      <Flex justifyContent="space-between">
        <H2>Panel header - h2</H2>
        <Button variant="secondary">Button</Button>
      </Flex>
      <Text>
        Occaecat eiusmod elit laboris pariatur aute esse dolore nostrud ipsum laboris qui. Reprehenderit exercitation
        nisi consectetur deserunt tempor fugiat sunt eiusmod consectetur nisi magna. Consequat aute magna aliquip
        deserunt in magna labore cillum nisi aliquip sit irure anim exercitation.
      </Text>
      <Text>
        Eu occaecat mollit laborum pariatur pariatur excepteur. Voluptate eiusmod ea sit ad deserunt dolore consectetur
        nulla veniam in est aliquip anim adipisicing. Aute sit est mollit commodo qui et anim eu officia proident et.
        Deserunt ipsum et cupidatat magna consectetur aute ad fugiat enim fugiat. Nisi nisi labore anim occaecat non
        aliqua dolor sit nostrud. Do nulla enim proident proident. Fugiat consectetur culpa exercitation veniam culpa
        Lorem irure.
      </Text>
    </Panel>

    <Panel>
      <H2>Panel header - h2</H2>
      <Text>
        Occaecat eiusmod elit laboris pariatur aute esse dolore nostrud ipsum laboris qui. Reprehenderit exercitation
        nisi consectetur deserunt tempor fugiat sunt eiusmod consectetur nisi magna. Consequat aute magna aliquip
        deserunt in magna labore cillum nisi aliquip sit irure anim exercitation.
      </Text>
      <Text>
        Eu occaecat mollit laborum pariatur pariatur excepteur. Voluptate eiusmod ea sit ad deserunt dolore consectetur
        nulla veniam in est aliquip anim adipisicing. Aute sit est mollit commodo qui et anim eu officia proident et.
        Deserunt ipsum et cupidatat magna consectetur aute ad fugiat enim fugiat. Nisi nisi labore anim occaecat non
        aliqua dolor sit nostrud. Do nulla enim proident proident. Fugiat consectetur culpa exercitation veniam culpa
        Lorem irure.
      </Text>
    </Panel>
  </div>
));

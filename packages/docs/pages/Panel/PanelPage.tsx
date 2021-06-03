import { H1, H3, H2, Link, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview } from '../../components';
import { MarginPropTable, PanelPropTable } from '../../PropTables';

const PanelPage = () => (
  <>
    <H1>Panels</H1>

    <Panel>
      <Text>The panel component is used to contain content in a structured format.</Text>

      <CodePreview lastChild>
        {/* jsx-to-string:start */}
        <Panel
          header="Panel header"
          action={{
            variant: 'secondary',
            text: 'Button',
            onClick: () => {
              // Do some action
            },
          }}
        >
          <Text>
            Lorem ipsum dolor amet officia humblebrag selvage, subway tile vexillologist id pickled adaptogen fashion
            axe. Ennui meh pitchfork banh mi. Keffiyeh PBRB echo park gastropub. Pop-up neutra brunch ullamco affogato
            shaman vexillologist quinoa post-ironic locavore. Retro selfies proident synth ethical quinoa marfa
            chartreuse dolor vexillologist gochujang. Tempor poke unicorn, readymade crucifix fugiat culpa. Kinfolk
            hella asymmetrical, meggings et consectetur lomo farm-to-table exercitation DIY.
          </Text>
          <Text>
            Leggings consectetur heirloom, sustainable 90's scenester sartorial sint meditation portland health goth
            bespoke gastropub authentic. Flannel iceland narwhal, laborum adaptogen paleo glossier reprehenderit.
            Ethical ugh copper mug voluptate brooklyn velit 3 wolf moon tacos. Bushwick vexillologist air plant, veniam
            jianbing poke semiotics wayfarers. Typewriter single-origin coffee cray, thundercats asymmetrical succulents
            green juice irure cred taxidermy celiac.
          </Text>
        </Panel>
        {/* jsx-to-string:end */}
      </CodePreview>
    </Panel>

    <PanelPropTable inheritedProps={<MarginPropTable collapsible />} />
  </>
);

export default PanelPage;

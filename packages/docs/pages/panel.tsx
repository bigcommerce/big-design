import { H1, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, GuidelinesTable, List } from '../components';
import { MarginPropTable, PanelPropTable } from '../PropTables';

const PanelPage = () => {
  return (
    <>
      <H1>Panel</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Panel</Code> allows group content within a page. Content and actions on a page that are not in
          the header should be contained in a panel.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use seperate <Code primary>Panels</Code> to group related content or tasks on a page.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <CodePreview>
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
          </Panel>
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <PanelPropTable inheritedProps={<MarginPropTable collapsible />} renderPanel={false} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            <>
              <Code primary>Panel</Code> should use headings that set clear expectations about the content inside.
            </>,
            <>
              <Code primary>Panel</Code> should prioritize information so the most important content comes first.
            </>,
          ]}
          discouraged={[
            <>
              <Code primary>Panel</Code> should avoid too many call-to-action buttons or links and have only one primary
              call to action.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default PanelPage;

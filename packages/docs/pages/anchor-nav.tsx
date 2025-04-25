import { AnchorNav, H1, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable } from '../components';
import { AnchorNavElementPropsTable, AnchorNavPropsTable } from '../PropTables/AnchorNavPropTable';

const AnchorNavPage = () => {
  return (
    <>
      <H1>AnchorNav</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The <Code primary>AnchorNav</Code> component provides a way to navigate through various
          sections of a page by anchoring to specific parts of the content. It updates the URL hash
          as the user scrolls and highlights the currently active section.
        </Text>

        <Text>
          Use this component on long-form pages or documentation where it’s helpful to quickly jump
          between sections.
        </Text>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <CodePreview>
          {/* jsx-to-string:start */}
          <AnchorNav
            elements={[
              {
                label: 'First Section',
                element: (
                  <Panel header="First Section">
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sem erat,
                      sollicitudin quis varius sed, lacinia finibus sem. Pellentesque habitant morbi
                      tristique senectus et netus et malesuada fames ac turpis egestas. Duis
                      efficitur risus quis ante volutpat finibus. In varius mattis orci, et volutpat
                      erat rhoncus nec. Mauris lectus nisi, pharetra eget mollis id, pulvinar in
                      nisi. In dapibus urna turpis. Proin iaculis tincidunt turpis ac viverra.
                      Nullam auctor, leo non imperdiet consectetur, purus orci posuere magna, eu
                      varius nisl magna semper arcu. In sit amet scelerisque enim. In varius, libero
                      euismod finibus congue, turpis neque semper dolor, sollicitudin pellentesque
                      ante quam lobortis enim. Mauris posuere velit magna, quis aliquet arcu
                      pulvinar in.
                    </Text>
                  </Panel>
                ),
                id: 'first-section',
              },
              {
                label: 'Second Section',
                element: (
                  <Panel header="Second Section">
                    <Text>
                      Etiam id velit tincidunt, feugiat arcu quis, venenatis magna. Fusce egestas
                      facilisis enim sed ullamcorper. Nulla condimentum at sem id aliquam. Sed
                      ultrices, tortor et tristique suscipit, est velit rhoncus ligula, eget iaculis
                      enim dolor sit amet sem. Maecenas vitae condimentum dolor, et feugiat metus.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                      turpis egestas. In cursus turpis vel metus consectetur tempor. Cras quis
                      sollicitudin sem, vitae egestas ipsum. Sed vitae augue pulvinar, lobortis
                      magna quis, rhoncus eros. Nulla accumsan in ligula et fringilla. Nunc
                      dignissim nibh at ornare malesuada.
                    </Text>
                  </Panel>
                ),
                id: 'second-section',
              },
              {
                label: 'Third Section',
                element: (
                  <Panel header="Third Section">
                    <Text>
                      Nulla porttitor luctus malesuada. Pellentesque est leo, placerat a risus quis,
                      congue viverra neque. Aenean venenatis et nisl eu posuere. Phasellus vitae
                      maximus sapien. Cras ac tempor neque. Fusce tristique odio eget libero
                      dignissim, nec mattis lorem volutpat. In non tortor venenatis, faucibus odio
                      at, aliquet eros. Praesent bibendum lacus at ultrices vehicula. Mauris tempor
                      mauris ligula, quis efficitur risus sodales in. Aliquam vulputate euismod sem
                      non maximus. Phasellus varius tellus viverra condimentum fringilla. Fusce
                      euismod eleifend sagittis. Duis non iaculis nunc. Proin ac quam malesuada,
                      porta sapien ut, molestie massa. Vivamus non sodales dolor, nec euismod massa.
                    </Text>
                  </Panel>
                ),
                id: 'third-section',
              },
            ]}
          />
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'anchor-nav-props',
              title: 'AnchorNav',
              render: () => <AnchorNavPropsTable />,
            },
            {
              id: 'anchor-nav-element-props',
              title: 'AnchorNavElement',
              render: () => <AnchorNavElementPropsTable />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            "Don't use AnchorNav on pages that are too short to require section navigation.",
            'Avoid having too many sections which can clutter the navigation.',
          ]}
          recommended={[
            'Use on long pages to improve navigation between sections.',
            'Label sections clearly and use descriptive IDs.',
            'Keep section content well-spaced to improve visibility of the active section.',
          ]}
        />
      </Panel>
    </>
  );
};

export default AnchorNavPage;

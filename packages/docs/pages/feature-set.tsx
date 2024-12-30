import { FeatureSet, H1, Panel, Text } from '@bigcommerce/big-design';
import { AutoAwesomeIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable } from '../components';
import { FeatureSetPropTable, FeatureTagPropTable } from '../PropTables/FeatureSetPropTable';

const FeatureSetPage = () => {
  return (
    <>
      <H1>Feature Set</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Feature sets</Code> are uset to represent a summarized version of
          application features.
        </Text>
        <Text>
          They are to be used within installations and other similar pages where a quick glance of
          relevant characteristics is needed.
        </Text>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <CodePreview>
          {/* jsx-to-string:start */}
          {function Example() {
            const features = [
              { label: 'Feature 1', icon: <AutoAwesomeIcon /> },
              { label: 'Feature 2', icon: <AutoAwesomeIcon /> },
              { label: 'Feature 3', icon: <AutoAwesomeIcon /> },
            ];

            return <FeatureSet features={features} />;
          }}
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'feature-set',
              title: 'FeatureSet',
              render: () => <FeatureSetPropTable />,
            },
            {
              id: 'feature-tag',
              title: 'FeatureTag',
              render: () => <FeatureTagPropTable id="feature-tag-prop-table" />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            'Do not use feature tags to convey application status.',
            'Do not use as a call to action element.',
          ]}
          recommended={[
            'Use short feature descriptions.',
            'Use relevant icons associated to the feature description.',
          ]}
        />
      </Panel>
    </>
  );
};

export default FeatureSetPage;

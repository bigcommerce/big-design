import { H1, InfoCard, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, List } from '../components';
import { GuidelinesTable } from '../components/GuidelinesTable';
import { ImgPropTable, InfoCardPropTable } from '../PropTables';

const InfoCardPage = () => {
  return (
    <>
      <H1>InfoCard</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>InfoCards</Code> display a compact summary of an object — a title with an
          optional thumbnail, description, and status badge.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use <Code primary>InfoCards</Code> to represent a 3rd party integration (e.g. a payment
            provider or channel) alongside its connection status.
          </List.Item>
          <List.Item>
            Pair the <Code primary>img</Code> thumbnail with a <Code primary>badge</Code> to convey
            both identity and state at a glance.
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
                  <InfoCard title="Payment provider" />
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'description',
              title: 'Description',
              render: () => (
                <Fragment key="description">
                  <Text>
                    Add supporting copy below the title with the <Code primary>description</Code>{' '}
                    prop.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <InfoCard
                      description="Accept credit cards and digital wallets."
                      title="Payment provider"
                    />
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'badge',
              title: 'Badge',
              render: () => (
                <Fragment key="badge">
                  <Text>
                    Surface a status next to the title with the <Code primary>badge</Code> prop. See{' '}
                    <Code primary>Badge</Code> for available props.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <InfoCard
                      badge={{ label: 'connected', variant: 'success' }}
                      description="Accept credit cards and digital wallets."
                      title="Payment provider"
                    />
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'image',
              title: 'Image',
              render: () => (
                <Fragment key="image">
                  <Text>
                    Render a thumbnail to the left of the title with the <Code primary>img</Code>{' '}
                    prop. Set <Code primary>alt</Code> when the image conveys meaning the title
                    doesn&apos;t; when omitted it is treated as decorative.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <InfoCard
                      badge={{ label: 'connected', variant: 'success' }}
                      description="Accept credit cards and digital wallets."
                      img={{ src: '/logo.svg', alt: 'Payment provider' }}
                      title="Payment provider"
                    />
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'info-card',
              title: 'InfoCard',
              render: () => <InfoCardPropTable />,
            },
            {
              id: 'img',
              title: 'ImgProps',
              render: () => <ImgPropTable id="img-prop-table" />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Don’t use long <Code primary>title</Code> or <Code primary>description</Code> text;
              keep it concise so the card stays scannable.
            </>,
          ]}
          recommended={[
            'Provide a meaningful alt value when the thumbnail carries information the title does not.',
          ]}
        />
      </Panel>
    </>
  );
};

export default InfoCardPage;

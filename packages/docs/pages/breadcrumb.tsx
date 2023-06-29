import { Breadcrumb, BreadcrumbItem, H1, Link, Panel, Text } from '@bigcommerce/big-design';
import { OpenInNewIcon } from '@bigcommerce/big-design-icons';
import React, { Fragment } from 'react';

import { CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { LinkPropTable, MarginPropTable } from '../PropTables';

const LinkPage = () => {
  return (
    <>
      <H1>Breadcrumb</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          Provides a history of navigated pages, navigation to another page, and/or execution of an
          action.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>Display how a user got to the current section or page.</List.Item>
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
                <Fragment key="basic">
                  <Text>TBD.</Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Breadcrumb>
                      <BreadcrumbItem>Account Settings</BreadcrumbItem>
                      <BreadcrumbItem>Payment Methods</BreadcrumbItem>
                    </Breadcrumb>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'with-forward-slash',
              title: 'With Forward Slash',
              render: () => (
                <Fragment key="with-forward-slash">
                  <Text>TBD. With a forwardslash between each item.</Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Breadcrumb forwardSlash>
                      <BreadcrumbItem>Account Settings</BreadcrumbItem>
                      <BreadcrumbItem>Payment Methods</BreadcrumbItem>
                    </Breadcrumb>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'icon-before',
              title: 'Icon Before',
              render: () => (
                <Fragment key="icon-before">
                  <Text>TBD. You can also include an icon before the Bredcrumb List.</Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Breadcrumb iconBefore={<OpenInNewIcon size="large" />}>
                      <BreadcrumbItem>Account Settings</BreadcrumbItem>
                      <BreadcrumbItem>Payment Methods</BreadcrumbItem>
                    </Breadcrumb>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'with-links',
              title: 'With Links',
              render: () => (
                <Fragment key="with-links">
                  <Text>TBD. You can also include links as BreadcrumbItems.</Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Breadcrumb
                      iconBefore={
                        <Link href="#">
                          <OpenInNewIcon size="large" />
                        </Link>
                      }
                    >
                      <BreadcrumbItem href="#">Account Settings</BreadcrumbItem>
                      <BreadcrumbItem href="#">Payment Methods</BreadcrumbItem>
                    </Breadcrumb>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <LinkPropTable
          inheritedProps={<MarginPropTable collapsible />}
          nativeElement={['a', 'all']}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Avoid using any component that is not an `BreadcrumbItem` inside of the `Breadcrumb`
              component.
            </>,
          ]}
          recommended={[
            <>
              Use `BreadcrumbItem` as either an anchor tag or a span with only strings as children.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default LinkPage;

import { Button, H1, Modal, Panel, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, List } from '../components';
import { ModalPropTable } from '../PropTables';

const ModalPage = () => {
  return (
    <>
      <H1>Modal</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Modals</Code> sit on top of the page, containing additional content or functionality without
          leaving the context of a page.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>To focus on a particular on an specific task or content.</List.Item>
          <List.Item>To confirm high impact actions (e.g. deleting a configuration).</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'modal',
              title: 'Modal',
              render: () => (
                <>
                  <Text>
                    A <Code primary>Modal</Code> appears as a layer on top of the primary interface.{' '}
                    <Code primary>Modals</Code> disrupt users from interacting with the page until they complete a
                    specific task.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [isOpen, setIsOpen] = useState(false);

                      return (
                        <>
                          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

                          <Modal
                            actions={[
                              { text: 'Cancel', variant: 'subtle', onClick: () => setIsOpen(false) },
                              { text: 'Apply', onClick: () => setIsOpen(false) },
                            ]}
                            header="Modal title"
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            closeOnEscKey={true}
                            closeOnClickOutside={false}
                          >
                            <Text>
                              Ea tempor sunt amet labore proident dolor proident commodo in exercitation ea nulla sunt
                              pariatur. Nulla sunt ipsum do eu consectetur exercitation occaecat labore aliqua. Aute
                              elit occaecat esse ea fugiat esse. Reprehenderit sunt ea ea mollit commodo tempor amet
                              fugiat.
                            </Text>
                          </Modal>
                        </>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </>
              ),
            },
            {
              id: 'dialog',
              title: 'Dialog',
              render: () => (
                <>
                  <Text>
                    Setting the variant prop to <Code primary>dialog</Code> results in a simplified version of a{' '}
                    <Code primary>Modal</Code>. The purpose of a dialog is to act as a safety net for a user attempting
                    a destructive action.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [isOpen, setIsOpen] = useState(false);

                      return (
                        <>
                          <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>

                          <Modal
                            actions={[
                              { text: 'Cancel', variant: 'subtle', onClick: () => setIsOpen(false) },
                              { text: 'Apply', onClick: () => setIsOpen(false) },
                            ]}
                            header="Dialog title"
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            closeOnEscKey={true}
                            closeOnClickOutside={false}
                            variant="dialog"
                          >
                            <Text>
                              Ea tempor sunt amet labore proident dolor proident commodo in exercitation ea nulla sunt
                              pariatur.
                            </Text>
                          </Modal>
                        </>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ModalPropTable renderPanel={false} />
      </Panel>
    </>
  );
};

export default ModalPage;

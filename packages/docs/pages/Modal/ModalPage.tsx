import { Button, H1, Modal, Panel, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, PageNavigation } from '../../components';
import { ModalPropTable } from '../../PropTables';

const ModalPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel header="Modal variant">
            <Text>
              A modal appears as a layer on top of the primary interface. Modals disrupt users from interacting with the
              page until they complete a specific task.
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
                        pariatur. Nulla sunt ipsum do eu consectetur exercitation occaecat labore aliqua. Aute elit
                        occaecat esse ea fugiat esse. Reprehenderit sunt ea ea mollit commodo tempor amet fugiat.
                      </Text>
                    </Modal>
                  </>
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Dialog variant">
            <Text>
              Setting the variant prop to <Code primary>dialog</Code> results in a simplified version of a Modal. The
              purpose of a dialog is to act as a safety net for a user attempting a destructive action.
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
          </Panel>
        </>
      ),
    },
    {
      id: 'code',
      title: 'Code',
      render: () => <ModalPropTable />,
    },
  ];

  return (
    <>
      <H1>Modal</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default ModalPage;

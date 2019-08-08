import { Button, H0, H1, H2, Link, Modal, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { ModalActionsPropTable, ModalHeaderPropTable, ModalPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Modal</H0>

    <Text>
      A modal appears as a layer on top of the primary interface. Modals disrupt users from interacting with the page
      until they complete a specific task.{' '}
      <Link href="https://design.bigcommerce.com/components/modals" target="_blank">
        Modals Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} closeOnEscKey={true} closeOnClickOutside={false}>
              <Modal.Header>Modal Title</Modal.Header>

              <Modal.Body>
                <Text>
                  Ea tempor sunt amet labore proident dolor proident commodo in exercitation ea nulla sunt pariatur.
                  Nulla sunt ipsum do eu consectetur exercitation occaecat labore aliqua. Aute elit occaecat esse ea
                  fugiat esse. Reprehenderit sunt ea ea mollit commodo tempor amet fugiat.
                </Text>
                <Text>
                  Esse ipsum est consectetur nulla aute deserunt. Anim sint nisi consequat officia adipisicing irure.
                  Nulla ea reprehenderit elit eu nostrud sunt veniam dolore ex occaecat qui. Commodo ullamco ut sint
                  dolor quis cillum in et enim culpa esse exercitation ad. Eiusmod adipisicing nisi culpa esse laborum
                  cupidatat ad pariatur proident. Consectetur ex sint ullamco non ex.
                </Text>
              </Modal.Body>

              <Modal.Actions>
                <Button variant="subtle" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsOpen(false)}>Apply</Button>
              </Modal.Actions>
            </Modal>
          </>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Dialog</H1>

    <Text>
      Setting the variant prop to <Code primary>dialog</Code> results in a simplified version of a Modal. The purpose of
      a dialog is to act as a safety net for a user attempting a destructive action.{' '}
      <Link href="https://design.bigcommerce.com/components/modals" target="_blank">
        Modals–Confirmation Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <>
            <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>

            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              closeOnEscKey={true}
              closeOnClickOutside={false}
              variant="dialog"
            >
              <Modal.Header>Dialog Title</Modal.Header>

              <Modal.Body>
                <Text>
                  Ea tempor sunt amet labore proident dolor proident commodo in exercitation ea nulla sunt pariatur.
                </Text>
              </Modal.Body>

              <Modal.Actions>
                <Button variant="subtle" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsOpen(false)}>Apply</Button>
              </Modal.Actions>
            </Modal>
          </>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Modal</H2>

    <ModalPropTable />

    <H2>Modal.Header</H2>

    <ModalHeaderPropTable />

    <H2>Modal.Actions</H2>

    <ModalActionsPropTable />
  </>
);

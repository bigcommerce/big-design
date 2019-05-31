import { Button, Flex, Modal, Text } from '@bigcommerce/big-design';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

interface State {
  isModalOpen: boolean;
  isDialogOpen: boolean;
}

class Story extends React.PureComponent<{}, State> {
  state = {
    isModalOpen: false,
    isDialogOpen: false,
  };

  render() {
    return (
      <>
        <Flex justifyContent="center" alignItems="center" marginBottom="medium">
          <Button onClick={this.openModal}>Open Modal</Button>
        </Flex>

        <Flex justifyContent="center" alignItems="center">
          <Button onClick={this.openDialog}>Open Dialog</Button>
        </Flex>

        <Modal
          isOpen={this.state.isModalOpen}
          onClose={this.closeModal}
          closeOnEscKey={boolean('closeOnEscKey', true)}
          closeOnClickOutside={boolean('closeOnClickOutside', false)}
        >
          <Text>
            Esse ipsum est consectetur nulla aute deserunt. Anim sint nisi consequat officia adipisicing irure. Nulla ea
            reprehenderit elit eu nostrud sunt veniam dolore ex occaecat qui. Commodo ullamco ut sint dolor quis cillum
            in et enim culpa esse exercitation ad. Eiusmod adipisicing nisi culpa esse laborum cupidatat ad pariatur
            proident. Consectetur ex sint ullamco non ex.
          </Text>
          {/* <Modal.Header>Modal Title</Modal.Header> */}

          {/* <Modal.Body>
            <Text>
              Ea tempor sunt amet labore proident dolor proident commodo in exercitation ea nulla sunt pariatur. Nulla
              sunt ipsum do eu consectetur exercitation occaecat labore aliqua. Aute elit occaecat esse ea fugiat esse.
              Reprehenderit sunt ea ea mollit commodo tempor amet fugiat.
            </Text>
            <Text>
              Esse ipsum est consectetur nulla aute deserunt. Anim sint nisi consequat officia adipisicing irure. Nulla
              ea reprehenderit elit eu nostrud sunt veniam dolore ex occaecat qui. Commodo ullamco ut sint dolor quis
              cillum in et enim culpa esse exercitation ad. Eiusmod adipisicing nisi culpa esse laborum cupidatat ad
              pariatur proident. Consectetur ex sint ullamco non ex.
            </Text>
          </Modal.Body>

          <Modal.Actions>
            <Button variant="subtle" onClick={this.closeModal} marginBottom="xSmall">
              Cancel
            </Button>
            <Button onClick={this.closeModal}>Apply</Button>
          </Modal.Actions> */}
        </Modal>

        <Modal
          isOpen={this.state.isDialogOpen}
          onClose={this.closeDialog}
          closeOnEscKey={boolean('closeOnEscKey', true)}
          closeOnClickOutside={boolean('closeOnClickOutside', false)}
          variant="dialog"
        >
          <Modal.Header>Dialog Title</Modal.Header>

          <Modal.Body>
            <Text>
              Ea tempor sunt amet labore proident dolor proident commodo in exercitation ea nulla sunt pariatur.
            </Text>
          </Modal.Body>

          <Modal.Actions>
            <Button variant="subtle" onClick={this.closeDialog} marginBottom="xSmall">
              Cancel
            </Button>
            <Button onClick={this.closeDialog}>Apply</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }

  private closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  private openModal = () => {
    this.setState({ isModalOpen: true });
  };

  private closeDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  private openDialog = () => {
    this.setState({ isDialogOpen: true });
  };
}

storiesOf('Modal', module).add('Overview', () => (
  <div style={{ padding: 50 }}>
    <Story />
  </div>
));

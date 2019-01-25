import { storiesOf } from '@storybook/react';
import React from 'react';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { H2, Text } from '../Text';

import { Modal } from './Modal';

interface State {
  isOpen: boolean;
}

class Story extends React.PureComponent<{}, State> {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <>
        <Flex justifyContent="center" alignItems="center">
          <Button onClick={this.openModal}>Open Modal</Button>
        </Flex>

        <Modal isOpen={this.state.isOpen} onRequestClose={this.closeModal}>
          <H2>Modal Title</H2>
          <Text>
            Ea tempor sunt amet labore proident dolor proident commodo in exercitation ea nulla sunt pariatur. Nulla
            sunt ipsum do eu consectetur exercitation occaecat labore aliqua. Aute elit occaecat esse ea fugiat esse.
            Reprehenderit sunt ea ea mollit commodo tempor amet fugiat.
          </Text>
          <Text>
            Esse ipsum est consectetur nulla aute deserunt. Anim sint nisi consequat officia adipisicing irure. Nulla ea
            reprehenderit elit eu nostrud sunt veniam dolore ex occaecat qui. Commodo ullamco ut sint dolor quis cillum
            in et enim culpa esse exercitation ad. Eiusmod adipisicing nisi culpa esse laborum cupidatat ad pariatur
            proident. Consectetur ex sint ullamco non ex.
          </Text>

          <Modal.Actions>
            <Button variant="subtle" onClick={this.closeModal}>
              Cancel
            </Button>
            <Button onClick={this.closeModal}>Apply</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }

  private closeModal = () => {
    this.setState({ isOpen: false });
  };

  private openModal = () => {
    this.setState({ isOpen: true });
  };
}

storiesOf('Modal', module).add('Overview', () => (
  <div style={{ padding: 50 }}>
    <Story />
  </div>
));

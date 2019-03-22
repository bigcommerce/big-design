import 'jest-styled-components';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import { Modal } from './Modal';

test('render open modal', () => {
  const text = 'This is a modal';
  const { queryByText } = render(<Modal isOpen={true}>{text}</Modal>);

  expect(document.body).toMatchSnapshot();
  expect(queryByText(text)).toBeInTheDocument();
});

test('render open modal without backdrop', () => {
  const text = 'This is a modal';
  const { queryByText } = render(
    <Modal isOpen={true} backdrop={false}>
      {text}
    </Modal>,
  );

  expect(document.body).toMatchSnapshot();
  expect(queryByText(text)).toBeInTheDocument();
});

test('render closed modal', () => {
  const text = 'This is a modal';
  const { queryByText } = render(<Modal isOpen={false}>{text}</Modal>);

  expect(document.body).toMatchSnapshot();
  expect(queryByText(text)).not.toBeInTheDocument();
});

test('open/hides when props changes', () => {
  const text = 'This is a modal';
  const { queryByText, rerender } = render(<Modal isOpen={false}>{text}</Modal>);

  expect(queryByText(text)).not.toBeInTheDocument();
  rerender(<Modal isOpen={true}>{text}</Modal>);
  expect(queryByText(text)).toBeInTheDocument();
});

test('triggers onRequestClose when pressing esc', () => {
  const text = 'This is a modal';
  const onRequestClose = jest.fn();

  const { queryByText } = render(
    <Modal isOpen={true} onRequestClose={onRequestClose}>
      {text}
    </Modal>,
  );

  const element = queryByText(text) as HTMLElement;

  fireEvent.keyDown(element, { key: 'Escape' });

  expect(onRequestClose).toHaveBeenCalled();
});

test('does not trigger onRequestClose when pressing esc and requestCloseOnEscKey is false', () => {
  const text = 'This is a modal';
  const onRequestClose = jest.fn();

  const { queryByText } = render(
    <Modal isOpen={true} onRequestClose={onRequestClose} requestCloseOnEscKey={false}>
      {text}
    </Modal>,
  );

  const element = queryByText(text) as HTMLElement;

  fireEvent.keyDown(element, { key: 'Escape' });

  expect(onRequestClose).not.toHaveBeenCalled();
});

test('trigger onRequestClose when clicking outside the modal', () => {
  const text = 'This is a modal';
  const onRequestClose = jest.fn();

  const { queryByRole } = render(
    <Modal isOpen={true} onRequestClose={onRequestClose}>
      {text}
    </Modal>,
  );

  const element = queryByRole('dialog') as HTMLElement;

  fireEvent.click(element);

  expect(onRequestClose).toHaveBeenCalled();
});

test('do not trigger onRequestClose when clicking outside the modal and requestCloseOnClickOutside is false', () => {
  const text = 'This is a modal';
  const onRequestClose = jest.fn();

  const { queryByRole } = render(
    <Modal isOpen={true} onRequestClose={onRequestClose} requestCloseOnClickOutside={false}>
      {text}
    </Modal>,
  );

  const element = queryByRole('dialog') as HTMLElement;

  fireEvent.click(element);

  expect(onRequestClose).not.toHaveBeenCalled();
});

test('do not trigger onRequestClose when clicking inside the modal', () => {
  const onRequestClose = jest.fn();

  const { queryByTestId } = render(
    <Modal isOpen={true} onRequestClose={onRequestClose}>
      <p data-testid="inside-modal">Content</p>
    </Modal>,
  );

  const element = queryByTestId('inside-modal') as HTMLElement;

  fireEvent.click(element);

  expect(onRequestClose).not.toHaveBeenCalled();
});

import { DeleteIcon } from '@bigcommerce/big-design-icons';
import { theme } from '@bigcommerce/big-design-theme';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Alert } from './Alert';

test('render Alert', () => {
  const { container } = render(
    <Alert>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur officia ex. Ipsum eiusmod
      fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse deserunt nostrud ipsum id adipisicing enim velit
      labore. Nulla exercitation laborum laboris Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Alert>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('does not forward styles', () => {
  const { container } = render(
    <Alert style={{ background: 'red' }}>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur officia ex. Ipsum eiusmod
      fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse deserunt nostrud ipsum id adipisicing enim velit
      labore. Nulla exercitation laborum laboris Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Alert>,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('renders a header and action', () => {
  const onClick = jest.fn();

  const { getByRole } = render(
    <Alert header="Test Header" onCloseButtonClick={onClick}>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur officia ex. Ipsum eiusmod
      fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse deserunt nostrud ipsum id adipisicing enim velit
      labore. Nulla exercitation laborum laboris Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Alert>,
  );

  const header = getByRole('heading');

  expect(header).toBeInTheDocument();
  expect(header.textContent).toBe('Test Header');

  const actionButton = getByRole('button');

  expect(actionButton).toBeInTheDocument();
  expect(actionButton).toMatchSnapshot();
});

test('action options get forwarded to button', () => {
  const onClick = jest.fn();

  const { getByRole } = render(
    <Alert header="Test Header" onCloseButtonClick={onClick}>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur officia ex. Ipsum eiusmod
      fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse deserunt nostrud ipsum id adipisicing enim velit
      labore. Nulla exercitation laborum laboris Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Alert>,
  );

  fireEvent.click(getByRole('button'));

  expect(onClick).toHaveBeenCalled();
});

test('forwards data attributes', () => {
  const { getByTestId } = render(
    <Alert header="Test Header" data-testid="alert">
      Dolore proident eiusmod sint est enim laboris
    </Alert>,
  );

  const alert = getByTestId('alert');

  expect(alert).toBeInTheDocument();
});

test('ignores padding props', () => {
  const { getByTestId } = render(
    // @ts-ignore - ignoring since paddingRight is not a valid prop
    <Alert header="Test Header" data-testid="alert" paddingRight="xxxLarge">
      Dolore proident eiusmod sint est enim laboris
    </Alert>,
  );

  const alert = getByTestId('alert');

  expect(alert).not.toHaveStyle(`padding-right: ${theme.spacing.xxxLarge}`);
});

test('support margin props', () => {
  const { getByTestId } = render(
    // @ts-ignore - ignoring since paddingRight is not a valid prop
    <Alert header="Test Header" data-testid="alert" marginBottom="xxxLarge">
      Dolore proident eiusmod sint est enim laboris
    </Alert>,
  );

  const alert = getByTestId('alert');

  expect(alert).toHaveStyle(`margin-bottom: ${theme.spacing.xxxLarge}`);
});

test('render custom icon left alert', () => {
  const { container } = render(<Alert iconLeft={<DeleteIcon />}>Dolore proident eiusmod sint est enim laboris</Alert>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render success alert', () => {
  const { container } = render(<Alert variant="success">Dolore proident eiusmod sint est enim laboris</Alert>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render danger alert', () => {
  const { container } = render(<Alert variant="danger">Dolore proident eiusmod sint est enim laboris</Alert>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render warning alert', () => {
  const { container } = render(<Alert variant="warning">Dolore proident eiusmod sint est enim laboris</Alert>);

  expect(container.firstChild).toMatchSnapshot();
});

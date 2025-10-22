import { theme } from '@bigcommerce/big-design-theme';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import 'jest-styled-components';

import { Message, MessageProps } from './Message';

test('renders with margins', () => {
  const { rerender } = render(<Message messages={[{ text: 'Success' }]} />);

  const message = screen.getByRole('alert');

  expect(message).not.toHaveStyle('margin: 1rem');

  rerender(<Message margin="medium" messages={[{ text: 'Success' }]} />);

  expect(message).toHaveStyle('margin: 1rem');
});

test('render default (success) Message', () => {
  render(<Message messages={[{ text: 'Success' }]} />);

  const message = screen.getByRole('alert');

  expect(message).toMatchSnapshot();
  expect(message).toHaveStyle(
    `border-left: ${theme.spacing.xxSmall} solid ${theme.colors.success}`,
  );
});

test('render error Message', () => {
  render(<Message messages={[{ text: 'Error' }]} type="error" />);

  const message = screen.getByRole('alert');

  expect(message).toMatchSnapshot();
  expect(message).toHaveStyle(`border-left: ${theme.spacing.xxSmall} solid ${theme.colors.danger}`);
});

test('render warning Message', () => {
  render(<Message messages={[{ text: 'Warning' }]} type="warning" />);

  const message = screen.getByRole('alert');

  expect(message).toMatchSnapshot();
  expect(message).toHaveStyle(
    `border-left: ${theme.spacing.xxSmall} solid ${theme.colors.warning50}`,
  );
});

test('render info Message', () => {
  render(<Message messages={[{ text: 'Info' }]} type="info" />);

  const message = screen.getByRole('alert');

  expect(message).toMatchSnapshot();
  expect(message).toHaveStyle(
    `border-left: ${theme.spacing.xxSmall} solid ${theme.colors.primary60}`,
  );
});

test('renders with link', async () => {
  render(<Message messages={[{ text: 'Success', link: { text: 'Link', href: '#' } }]} />);

  const message = screen.getByText('Success');

  expect(message).toMatchSnapshot();

  const link = await screen.findByRole<HTMLAnchorElement>('link');

  expect(link).toBeInTheDocument();
  expect(link.href).toBe('http://localhost/#');
});

test('renders with external link', async () => {
  render(
    <Message
      messages={[
        { text: 'Success', link: { text: 'Link', href: '#', external: true, target: '_blank' } },
      ]}
    />,
  );

  const message = screen.getByText('Success');

  expect(message).toMatchSnapshot();

  const link = await screen.findByRole<HTMLAnchorElement>('link');

  expect(link).toBeInTheDocument();
  expect(link.href).toBe('http://localhost/#');
  expect(link.target).toBe('_blank');
  // eslint-disable-next-line testing-library/no-node-access
  expect(link.querySelector('svg')).toBeInTheDocument();
});

test('renders header', () => {
  render(<Message header="Header" messages={[{ text: 'Success' }]} />);

  const message = screen.getByText('Success');

  expect(message).toMatchSnapshot();
  expect(screen.getByText('Header')).toBeInTheDocument();
});

test('renders close button', () => {
  render(<Message messages={[{ text: 'Success' }]} onClose={() => null} />);

  const message = screen.getByText('Success');

  expect(message).toMatchSnapshot();
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('trigger onClose', async () => {
  const fn = jest.fn();

  render(<Message messages={[{ text: 'Success' }]} onClose={fn} />);

  const button = await screen.findByRole<HTMLButtonElement>('button');

  fireEvent.click(button);

  expect(fn).toHaveBeenCalled();
});

test('does not forward styles', () => {
  render(
    <Message className="test" messages={[{ text: 'Success' }]} style={{ background: 'red' }} />,
  );

  const message = screen.getByText('Success');

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(message).not.toHaveStyle('background: red');
});

test('renders actions', () => {
  const onClick = jest.fn();
  const actions: MessageProps['actions'] = [
    { text: 'First Action', onClick },
    { text: 'Second Action', variant: 'secondary', onClick },
  ];

  render(<Message actions={actions} messages={[{ text: 'Success' }]} />);

  const message = screen.getByText('Success');
  const firstAction = screen.getByRole('button', { name: 'First Action' });
  const secondAction = screen.getByRole('button', { name: 'Second Action' });

  expect(message).toMatchSnapshot();

  expect(firstAction).toHaveStyleRule('background-color', 'transparent');
  expect(secondAction).toHaveStyleRule('background-color', 'transparent');

  fireEvent.click(firstAction);

  expect(onClick).toHaveBeenCalledTimes(1);

  fireEvent.click(secondAction);

  expect(onClick).toHaveBeenCalledTimes(2);
});

test('renders localized labels', async () => {
  render(
    <Message
      localization={{ close: 'Cerrar' }}
      messages={[{ text: 'Success' }]}
      onClose={() => null}
    />,
  );

  const button = await screen.findByRole('button', { name: 'Cerrar' });

  expect(button).toBeInTheDocument();
});

import { theme } from '@bigcommerce/big-design-theme';
import React from 'react';

import 'jest-styled-components';
import { fireEvent, render } from '@test/utils';

import { Message } from './Message';

test('renders with margins', () => {
  const { container, rerender } = render(<Message messages={[{ text: 'Success' }]} />);

  expect(container.firstChild).not.toHaveStyle('margin: 1rem');

  rerender(<Message messages={[{ text: 'Success' }]} margin="medium" />);

  expect(container.firstChild).toHaveStyle('margin: 1rem');
});

test('render default (success) Message', () => {
  const { container } = render(<Message messages={[{ text: 'Success' }]} />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`border-left: ${theme.spacing.xxSmall} solid ${theme.colors.success}`);
});

test('render error Message', () => {
  const { container } = render(<Message messages={[{ text: 'Error' }]} type="error" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`border-left: ${theme.spacing.xxSmall} solid ${theme.colors.danger}`);
});

test('render warning Message', () => {
  const { container } = render(<Message messages={[{ text: 'Warning' }]} type="warning" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`border-left: ${theme.spacing.xxSmall} solid ${theme.colors.warning50}`);
});

test('render info Message', () => {
  const { container } = render(<Message messages={[{ text: 'Info' }]} type="info" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`border-left: ${theme.spacing.xxSmall} solid ${theme.colors.primary60}`);
});

test('renders with link', () => {
  const { queryByRole, container } = render(
    <Message messages={[{ text: 'Success', link: { text: 'Link', href: '#' } }]} />,
  );

  expect(container.firstChild).toMatchSnapshot();

  const link = queryByRole('link') as HTMLAnchorElement;

  expect(link).toBeInTheDocument();
  expect(link.href).toBe('http://localhost/#');
});

test('renders with external link', () => {
  const { queryByRole, container } = render(
    <Message messages={[{ text: 'Success', link: { text: 'Link', href: '#', external: true, target: '_blank' } }]} />,
  );

  expect(container.firstChild).toMatchSnapshot();

  const link = queryByRole('link') as HTMLAnchorElement;

  expect(link).toBeInTheDocument();
  expect(link.href).toBe('http://localhost/#');
  expect(link.target).toBe('_blank');
  expect(link.querySelector('svg')).not.toBeUndefined();
});

test('renders header', () => {
  const { queryByText, container } = render(<Message header="Header" messages={[{ text: 'Success' }]} />);

  expect(container.firstChild).toMatchSnapshot();
  expect(queryByText('Header')).not.toBeUndefined();
});

test('renders close button', () => {
  const { queryByRole, container } = render(<Message onClose={() => null} messages={[{ text: 'Success' }]} />);

  expect(container.firstChild).toMatchSnapshot();
  expect(queryByRole('button')).not.toBeUndefined();
});

test('trigger onClose', () => {
  const fn = jest.fn();
  const { queryByRole } = render(<Message onClose={fn} messages={[{ text: 'Success' }]} />);

  const button = queryByRole('button') as HTMLButtonElement;

  fireEvent.click(button);

  expect(fn).toHaveBeenCalled();
});

test('does not forward styles', () => {
  const { container } = render(
    <Message messages={[{ text: 'Success' }]} className="test" style={{ background: 'red' }} />,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

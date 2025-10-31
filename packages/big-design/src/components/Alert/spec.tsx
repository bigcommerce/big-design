import { theme } from '@bigcommerce/big-design-theme';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import 'jest-styled-components';

import { Alert } from './Alert';

test('render default (success) Alert', () => {
  render(<Alert messages={[{ text: 'Success' }]} />);

  const alert = screen.getByRole('alert');

  expect(alert).toMatchSnapshot();
  expect(alert).toHaveStyle(`border-left: ${theme.spacing.xxSmall} solid ${theme.colors.success}`);
});

test('render error Alert', () => {
  render(<Alert messages={[{ text: 'Error' }]} type="error" />);

  const alert = screen.getByRole('alert');

  expect(alert).toMatchSnapshot();
  expect(alert).toHaveStyle(`border-left: ${theme.spacing.xxSmall} solid ${theme.colors.danger}`);
});

test('render warning Alert', () => {
  render(<Alert messages={[{ text: 'Warning' }]} type="warning" />);

  const alert = screen.getByRole('alert');

  expect(alert).toMatchSnapshot();
  expect(alert).toHaveStyle(
    `border-left: ${theme.spacing.xxSmall} solid ${theme.colors.warning50}`,
  );
});

test('render info Alert', () => {
  render(<Alert messages={[{ text: 'Info' }]} type="info" />);

  const alert = screen.getByRole('alert');

  expect(alert).toMatchSnapshot();
  expect(alert).toHaveStyle(
    `border-left: ${theme.spacing.xxSmall} solid ${theme.colors.primary60}`,
  );
});

test('renders with link', () => {
  render(<Alert messages={[{ text: 'Success', link: { text: 'Link', href: '#' } }]} />);

  const alert = screen.getByRole('alert');
  const link = screen.getByRole<HTMLAnchorElement>('link');

  expect(alert).toMatchSnapshot();
  expect(link).toBeInTheDocument();
  expect(link.href).toBe('http://localhost/#');
});

test('renders with external link', () => {
  render(
    <Alert
      messages={[
        { text: 'Success', link: { text: 'Link', href: '#', external: true, target: '_blank' } },
      ]}
    />,
  );

  const alert = screen.getByRole('alert');
  const link = screen.getByRole<HTMLAnchorElement>('link');

  expect(alert).toMatchSnapshot();
  expect(link).toBeInTheDocument();
  expect(link.href).toBe('http://localhost/#');
  expect(link.target).toBe('_blank');
  expect(link.querySelector('svg')).toBeDefined();
});

test('renders header', () => {
  render(<Alert header="Header" messages={[{ text: 'Success' }]} />);

  const alert = screen.getByRole('alert');
  const heading = screen.getByRole('heading', { name: /header/i });

  expect(alert).toMatchSnapshot();
  expect(heading).toBeInTheDocument();
});

test('uses the header as an accessibility label for the alert', () => {
  render(<Alert header="Some reason for the alert" messages={[{ text: 'Success' }]} />);

  expect(screen.getByRole('alert', { name: 'Some reason for the alert' })).toBeInTheDocument();
});

test('renders close button', () => {
  render(<Alert messages={[{ text: 'Success' }]} onClose={() => null} />);

  const alert = screen.getByRole('alert');
  const button = screen.getByRole('button');

  expect(alert).toMatchSnapshot();
  expect(button).toBeInTheDocument();
});

test('trigger onClose', async () => {
  const fn = jest.fn();

  render(<Alert messages={[{ text: 'Success' }]} onClose={fn} />);

  const button = screen.getByRole('button');

  await userEvent.click(button);

  expect(fn).toHaveBeenCalled();
});

test('does not forward styles', () => {
  const { container } = render(
    <Alert className="test" messages={[{ text: 'Success' }]} style={{ background: 'red' }} />,
  );
  const alert = screen.getByRole('alert');

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(alert).not.toHaveStyle('background: red');
});

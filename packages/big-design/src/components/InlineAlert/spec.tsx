import { theme } from '@bigcommerce/big-design-theme';
import React from 'react';
import 'jest-styled-components';

import { fireEvent, render } from '@test/utils';

import { InlineAlert, InlineAlertProps } from './InlineAlert';

test('renders with margins', () => {
  const { container, rerender } = render(<InlineAlert messages={[{ text: 'Success' }]} />);

  expect(container.firstChild).not.toHaveStyle('margin: 1rem');

  rerender(<InlineAlert messages={[{ text: 'Success' }]} margin="medium" />);

  expect(container.firstChild).toHaveStyle('margin: 1rem');
});

test('render default (success) InlineAlert', () => {
  const { container } = render(<InlineAlert messages={[{ text: 'Success' }]} />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`border-left: ${theme.spacing.xxSmall} solid ${theme.colors.success}`);
});

test('render error InlineAlert', () => {
  const { container } = render(<InlineAlert messages={[{ text: 'Error' }]} type="error" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`border-left: ${theme.spacing.xxSmall} solid ${theme.colors.danger}`);
});

test('render warning InlineAlert', () => {
  const { container } = render(<InlineAlert messages={[{ text: 'Warning' }]} type="warning" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`border-left: ${theme.spacing.xxSmall} solid ${theme.colors.warning50}`);
});

test('render info InlineAlert', () => {
  const { container } = render(<InlineAlert messages={[{ text: 'Info' }]} type="info" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`border-left: ${theme.spacing.xxSmall} solid ${theme.colors.primary60}`);
});

test('renders with link', () => {
  const { queryByRole, container } = render(
    <InlineAlert messages={[{ text: 'Success', link: { text: 'Link', href: '#' } }]} />,
  );

  expect(container.firstChild).toMatchSnapshot();

  const link = queryByRole('link') as HTMLAnchorElement;

  expect(link).toBeInTheDocument();
  expect(link.href).toBe('http://localhost/#');
});

test('renders with external link', () => {
  const { queryByRole, container } = render(
    <InlineAlert
      messages={[{ text: 'Success', link: { text: 'Link', href: '#', external: true, target: '_blank' } }]}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();

  const link = queryByRole('link') as HTMLAnchorElement;

  expect(link).toBeInTheDocument();
  expect(link.href).toBe('http://localhost/#');
  expect(link.target).toBe('_blank');
  expect(link.querySelector('svg')).not.toBeUndefined();
});

test('renders header', () => {
  const { queryByText, container } = render(<InlineAlert header="Header" messages={[{ text: 'Success' }]} />);

  expect(container.firstChild).toMatchSnapshot();
  expect(queryByText('Header')).not.toBeUndefined();
});

test('renders close button', () => {
  const { queryByRole, container } = render(<InlineAlert onClose={() => null} messages={[{ text: 'Success' }]} />);

  expect(container.firstChild).toMatchSnapshot();
  expect(queryByRole('button')).not.toBeUndefined();
});

test('trigger onClose', () => {
  const fn = jest.fn();
  const { queryByRole } = render(<InlineAlert onClose={fn} messages={[{ text: 'Success' }]} />);

  const button = queryByRole('button') as HTMLButtonElement;

  fireEvent.click(button);

  expect(fn).toHaveBeenCalled();
});

test('does not forward styles', () => {
  const { container } = render(
    <InlineAlert messages={[{ text: 'Success' }]} className="test" style={{ background: 'red' }} />,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('renders actions', () => {
  const onClick = jest.fn();
  const actions = [
    { text: 'First Action', onClick: onClick },
    { text: 'Second Action', variant: 'primary', onClick: onClick },
  ];

  const { container, getByRole } = render(
    <InlineAlert actions={actions as InlineAlertProps['actions']} messages={[{ text: 'Success' }]} />,
  );
  const firstAction = getByRole('button', { name: 'First Action' });
  const secondAction = getByRole('button', { name: 'Second Action' });

  expect(container.firstChild).toMatchSnapshot();

  expect(firstAction).toHaveStyleRule('background-color', 'transparent');
  expect(secondAction).toHaveStyleRule('background-color', 'transparent');

  fireEvent.click(firstAction);

  expect(onClick).toHaveBeenCalledTimes(1);

  fireEvent.click(secondAction);

  expect(onClick).toHaveBeenCalledTimes(2);
});

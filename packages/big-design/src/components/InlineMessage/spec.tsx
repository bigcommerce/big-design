import { theme } from '@bigcommerce/big-design-theme';
import React from 'react';
import 'jest-styled-components';

import { fireEvent, render } from '@test/utils';

import { InlineMessage, InlineMessageProps } from './InlineMessage';

test('renders with margins', () => {
  const { container, rerender } = render(<InlineMessage messages={[{ text: 'Success' }]} />);

  expect(container.firstChild).not.toHaveStyle('margin: 1rem');

  rerender(<InlineMessage margin="medium" messages={[{ text: 'Success' }]} />);

  expect(container.firstChild).toHaveStyle('margin: 1rem');
});

test('render default (success) InlineMessage', () => {
  const { container } = render(<InlineMessage messages={[{ text: 'Success' }]} />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(
    `border-left: ${theme.spacing.xxSmall} solid ${theme.colors.success}`,
  );
});

test('render error InlineMessage', () => {
  const { container } = render(<InlineMessage messages={[{ text: 'Error' }]} type="error" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(
    `border-left: ${theme.spacing.xxSmall} solid ${theme.colors.danger}`,
  );
});

test('render warning InlineMessage', () => {
  const { container } = render(<InlineMessage messages={[{ text: 'Warning' }]} type="warning" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(
    `border-left: ${theme.spacing.xxSmall} solid ${theme.colors.warning50}`,
  );
});

test('render info InlineMessage', () => {
  const { container } = render(<InlineMessage messages={[{ text: 'Info' }]} type="info" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(
    `border-left: ${theme.spacing.xxSmall} solid ${theme.colors.primary60}`,
  );
});

test('renders with link', () => {
  const { queryByRole, container } = render(
    <InlineMessage messages={[{ text: 'Success', link: { text: 'Link', href: '#' } }]} />,
  );

  expect(container.firstChild).toMatchSnapshot();

  const link = queryByRole('link');

  expect(link).toBeInTheDocument();
  expect(link.href).toBe('http://localhost/#');
});

test('renders with external link', () => {
  const { queryByRole, container } = render(
    <InlineMessage
      messages={[
        { text: 'Success', link: { text: 'Link', href: '#', external: true, target: '_blank' } },
      ]}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();

  const link = queryByRole('link');

  expect(link).toBeInTheDocument();
  expect(link.href).toBe('http://localhost/#');
  expect(link.target).toBe('_blank');
  expect(link.querySelector('svg')).toBeDefined();
});

test('renders header', () => {
  const { queryByText, container } = render(
    <InlineMessage header="Header" messages={[{ text: 'Success' }]} />,
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(queryByText('Header')).toBeDefined();
});

test('renders close button', () => {
  const { queryByRole, container } = render(
    <InlineMessage messages={[{ text: 'Success' }]} onClose={() => null} />,
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(queryByRole('button')).toBeDefined();
});

test('trigger onClose', () => {
  const fn = jest.fn();
  const { queryByRole } = render(<InlineMessage messages={[{ text: 'Success' }]} onClose={fn} />);

  const button = queryByRole('button');

  fireEvent.click(button);

  expect(fn).toHaveBeenCalled();
});

test('does not forward styles', () => {
  const { container } = render(
    <InlineMessage
      className="test"
      messages={[{ text: 'Success' }]}
      style={{ background: 'red' }}
    />,
  );

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('renders actions', () => {
  const onClick = jest.fn();
  const actions: InlineMessageProps['actions'] = [
    { text: 'First Action', onClick },
    { text: 'Second Action', variant: 'secondary', onClick },
  ];

  const { container, getByRole } = render(
    <InlineMessage actions={actions} messages={[{ text: 'Success' }]} />,
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

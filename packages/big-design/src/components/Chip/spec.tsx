import { AddIcon } from '@bigcommerce/big-design-icons';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import 'jest-styled-components';

import { Chip } from './index';

test('renders the label', () => {
  const label = 'Test';

  render(<Chip label={label} />);

  expect(screen.getByText(label)).toBeInTheDocument();
});

test('renders without close button', () => {
  render(<Chip label="Test" />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.getByText(/test/i).parentElement).toMatchSnapshot();
});

test('renders with close button if onRemove is present', () => {
  render(<Chip label="Test" onDelete={jest.fn()} />);

  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByText(/test/i).parentElement).toMatchSnapshot();
});

test('onDelete is called when close button is clicked', async () => {
  const onDelete = jest.fn();

  render(<Chip label="Test" onDelete={onDelete} />);

  await userEvent.click(screen.getByRole('button'));

  expect(onDelete).toHaveBeenCalled();
});

test('accepts custom margin props', () => {
  render(<Chip label="Test" margin="large" onDelete={jest.fn()} />);

  const chipParent = screen.getByText(/test/i).parentElement;

  expect(chipParent).toHaveStyle('margin: 1.25rem');
});

test('renders with icon when icon prop is provided', () => {
  const { container } = render(<Chip icon={<AddIcon size="medium" />} label="With icon" />);

  expect(screen.getByText('With icon')).toBeInTheDocument();
  expect(container.querySelector('svg')).toBeInTheDocument();
});

test('icon is always constrained to 16px (1rem) regardless of icon size prop', () => {
  const { container } = render(<Chip icon={<AddIcon size="xLarge" />} label="Large icon" />);

  const chip = container.firstChild;
  const iconWrapper = chip?.firstChild;

  expect(iconWrapper).toHaveStyleRule('height', '1rem', { modifier: 'svg' });
  expect(iconWrapper).toHaveStyleRule('width', '1rem', { modifier: 'svg' });
});

test('icon is always constrained to 16px even if size is set to 40px', () => {
  const { container } = render(<Chip icon={<AddIcon size="40px" />} label="Large icon" />);

  const chip = container.firstChild;
  const iconWrapper = chip?.firstChild;

  expect(iconWrapper).toHaveStyleRule('height', '1rem', { modifier: 'svg' });
  expect(iconWrapper).toHaveStyleRule('width', '1rem', { modifier: 'svg' });
});

test('uses xSmall left padding when there is no icon', () => {
  render(<Chip label="No icon" />);

  const chip = screen.getByText('No icon').parentElement;
  expect(chip).toHaveStyle({ paddingLeft: '0.5rem' }); // xSmall
});

test('uses xxSmall left padding when icon is present', () => {
  const { container } = render(
    <Chip icon={<AddIcon size="medium" />} label="With icon" />,
  );

  const chip = container.firstChild as HTMLElement;
  expect(chip).toHaveStyle({ paddingLeft: '0.25rem' }); // xxSmall
});

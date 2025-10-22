// Lozenge.spec.tsx
import { theme } from '@bigcommerce/big-design-theme';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { StyledLozenge, StyledLozengeButton } from './styled';

import { Lozenge } from './index';

const noop = jest.fn();

test('render default Lozenge', () => {
  render(<Lozenge label="Lozenge" />);

  const lozenge = screen.getByText('Lozenge');

  expect(lozenge).toMatchSnapshot();
  expect(lozenge).toHaveStyle(`background-color: ${theme.colors.success20}`);
  // eslint-disable-next-line testing-library/no-node-access
  expect(lozenge.querySelector('svg')).toBeInTheDocument();
  expect(lozenge.tagName).toBe('DIV');
  expect(lozenge).toBeInTheDocument();
});

test('StyledLozenge renders with correct styles', () => {
  render(<StyledLozenge variant="alpha">Alpha</StyledLozenge>);

  const lozenge = screen.getByText('Alpha');

  expect(lozenge).toHaveStyle(`background-color: ${theme.colors.warning20}`);
  expect(lozenge).toHaveStyle(`color: ${theme.colors.secondary70}`);
});

test('StyledLozengeButton renders with correct styles', () => {
  render(<StyledLozengeButton variant="beta">Beta</StyledLozengeButton>);

  const lozenge = screen.getByText('Beta');

  expect(lozenge).toHaveStyle(`background-color: ${theme.colors.primary20}`);
  expect(lozenge).toHaveStyle(`color: ${theme.colors.primary50}`);
});

test('render alpha Lozenge', () => {
  render(<Lozenge label="Alpha" variant="alpha" />);

  const lozenge = screen.getByText('Alpha');

  expect(lozenge).toMatchSnapshot();
  expect(lozenge).toHaveStyle(`background-color: ${theme.colors.warning20}`);
  expect(lozenge).toHaveStyle(`color: ${theme.colors.secondary70}`);
  // eslint-disable-next-line testing-library/no-node-access
  expect(lozenge.querySelector('svg')).toBeInTheDocument();
  expect(lozenge.tagName).toBe('DIV');
  expect(lozenge).toBeInTheDocument();
});

test('render beta Lozenge', () => {
  render(<Lozenge label="Beta" variant="beta" />);

  const lozenge = screen.getByText('Beta');

  expect(lozenge).toMatchSnapshot();
  expect(lozenge).toHaveStyle(`background-color: ${theme.colors.primary20}`);
  expect(lozenge).toHaveStyle(`color: ${theme.colors.primary50}`);
  // eslint-disable-next-line testing-library/no-node-access
  expect(lozenge.querySelector('svg')).toBeInTheDocument();
  expect(lozenge.tagName).toBe('DIV');
  expect(lozenge).toBeInTheDocument();
});

test('render deprecated Lozenge', () => {
  render(<Lozenge label="Deprecated" variant="deprecated" />);

  const lozenge = screen.getByText('Deprecated');

  expect(lozenge).toMatchSnapshot();
  expect(lozenge).toHaveStyle(`background-color: ${theme.colors.danger20}`);
  expect(lozenge).toHaveStyle(`color: ${theme.colors.danger70}`);
  // eslint-disable-next-line testing-library/no-node-access
  expect(lozenge.querySelector('svg')).toBeInTheDocument();
  expect(lozenge.tagName).toBe('DIV');
  expect(lozenge).toBeInTheDocument();
});

test('render legacy Lozenge', () => {
  render(<Lozenge label="Legacy" variant="legacy" />);

  const lozenge = screen.getByText('Legacy');

  expect(lozenge).toMatchSnapshot();
  expect(lozenge).toHaveStyle(`background-color: ${theme.colors.secondary30}`);
  expect(lozenge).toHaveStyle(`color: ${theme.colors.secondary70}`);
  // eslint-disable-next-line testing-library/no-node-access
  expect(lozenge.querySelector('svg')).toBeInTheDocument();
  expect(lozenge.tagName).toBe('DIV');
  expect(lozenge).toBeInTheDocument();
});

test('render new Lozenge', () => {
  render(<Lozenge label="New" variant="new" />);

  const lozenge = screen.getByText('New');

  expect(lozenge).toMatchSnapshot();
  expect(lozenge).toHaveStyle(`background-color: ${theme.colors.success20}`);
  expect(lozenge).toHaveStyle(`color: ${theme.colors.success70}`);
  // eslint-disable-next-line testing-library/no-node-access
  expect(lozenge.querySelector('svg')).toBeInTheDocument();
  expect(lozenge.tagName).toBe('DIV');
  expect(lozenge).toBeInTheDocument();
});

test('render Lozenge with tooltip', async () => {
  render(<Lozenge label="Lozenge" tooltipContent="Tooltip content" />);

  const lozenge = screen.getByText('Lozenge');

  await userEvent.hover(lozenge);

  const tooltip = await screen.findByText('Tooltip content');

  expect(tooltip).toBeVisible();

  await userEvent.unhover(lozenge);
  await waitFor(() => expect(tooltip).not.toBeVisible());
});

test('render Lozenge as button (popover variant)', () => {
  const handleClick = jest.fn();

  render(<Lozenge isOpen={false} label="Popover" onClick={handleClick} variant="new" />);

  const lozenge = screen.getByText('Popover');

  expect(lozenge).toMatchSnapshot();
  expect(lozenge.tagName).toBe('BUTTON');
  expect(lozenge).toBeInTheDocument();
  // eslint-disable-next-line testing-library/no-node-access
  expect(lozenge.querySelector('svg')).toBeInTheDocument();
});

test('StyledLozenge adjusts end padding when hasTooltip is true/false', () => {
  const { rerender } = render(<StyledLozenge>Pad</StyledLozenge>);

  const lozenge = screen.getByText('Pad');

  // defaultProps has hasTooltip=false
  expect(lozenge).toHaveStyleRule('padding-inline-end', theme.spacing.small);

  rerender(<StyledLozenge hasTooltip>Pad</StyledLozenge>);

  expect(lozenge).toHaveStyleRule('padding-inline-end', theme.spacing.xxSmall);
});

const variantHoverFocusCases: Array<{ variant: any; hover: string; focus: string }> = [
  { variant: 'alpha', hover: theme.colors.warning10, focus: theme.colors.warning30 },
  { variant: 'beta', hover: theme.colors.primary10, focus: theme.colors.primary30 },
  { variant: 'deprecated', hover: theme.colors.danger10, focus: theme.colors.danger30 },
  { variant: 'legacy', hover: theme.colors.secondary20, focus: theme.colors.secondary30 },
  { variant: 'new', hover: theme.colors.success10, focus: theme.colors.success30 },
  { variant: 'early-access', hover: theme.colors.success10, focus: theme.colors.success30 },
];

test.each(variantHoverFocusCases)(
  'StyledLozengeButton hover/focus styles for %s',
  ({ variant, hover, focus }) => {
    render(<StyledLozengeButton variant={variant}>X</StyledLozengeButton>);

    const lozenge = screen.getByText('X');

    // Hover outline per variant
    expect(lozenge).toHaveStyleRule('outline', `1px solid ${hover}`, {
      modifier: ':hover',
    });

    // Focus outline per variant
    expect(lozenge).toHaveStyleRule('outline', `3px solid ${focus}`, {
      modifier: ':focus',
    });
  },
);

test('Lozenge (button) applies expanded styles when isOpen is true', () => {
  render(<Lozenge isOpen={true} label="Menu" onClick={noop} variant="new" />);

  const lozenge = screen.getByText('Menu');

  // aria-expanded state present
  expect(lozenge).toHaveAttribute('aria-expanded', 'true');

  // Snapshot to exercise nested expanded style rule
  expect(lozenge).toMatchSnapshot();
});

test('Lozenge forwards refs for div and button renders', () => {
  const divRef = createRef<HTMLDivElement>();

  render(<Lozenge label="DivRef" ref={divRef} />);

  expect(divRef.current?.nodeName).toBe('DIV');

  const btnRef = createRef<HTMLDivElement>();

  render(<Lozenge isOpen={false} label="BtnRef" onClick={noop} ref={btnRef} />);

  expect(btnRef.current?.nodeName).toBe('BUTTON');
});

test('Lozenge tooltip path only when tooltipContent is a non-empty string', async () => {
  const { rerender } = render(<Lozenge label="X" tooltipContent="Tip!" />);

  await userEvent.hover(screen.getByText('X'));

  expect(await screen.findByText('Tip!')).toBeVisible();

  // Empty string -> falls back to plain lozenge (no tooltip)
  rerender(<Lozenge label="Y" tooltipContent="" />);
  await userEvent.hover(screen.getByText('Y'));
  await waitFor(() => {
    expect(screen.queryByText('Tip!')).not.toBeInTheDocument();
  });
});

/* Optional: idle style sanity for all variants (tiny guardrail) */
const idleMatrix: Array<{ variant: any; bg: string; color: string }> = [
  { variant: 'alpha', bg: theme.colors.warning20, color: theme.colors.secondary70 },
  { variant: 'beta', bg: theme.colors.primary20, color: theme.colors.primary50 },
  { variant: 'deprecated', bg: theme.colors.danger20, color: theme.colors.danger70 },
  { variant: 'legacy', bg: theme.colors.secondary30, color: theme.colors.secondary70 },
  { variant: 'new', bg: theme.colors.success20, color: theme.colors.success70 },
  { variant: 'early-access', bg: theme.colors.success20, color: theme.colors.success70 },
];

test.each(idleMatrix)('StyledLozenge idle style for %s', ({ variant, bg, color }) => {
  render(<StyledLozenge variant={variant}>Idle</StyledLozenge>);

  const lozenge = screen.getByText('Idle');

  expect(lozenge).toHaveStyleRule('background-color', bg);
  expect(lozenge).toHaveStyleRule('color', color);
});

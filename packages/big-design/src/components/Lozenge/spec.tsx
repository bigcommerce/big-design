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
  const { container, getByText } = render(<Lozenge label="Lozenge" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.success20}`);
  expect(container.querySelector('svg')).toBeInTheDocument();
  expect(container.firstChild?.nodeName).toBe('DIV');
  expect(getByText('Lozenge')).toBeInTheDocument();
});

test('StyledLozenge renders with correct styles', () => {
  const { container } = render(<StyledLozenge variant="alpha">Alpha</StyledLozenge>);

  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.warning20}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.secondary70}`);
});

test('StyledLozengeButton renders with correct styles', () => {
  const { container } = render(<StyledLozengeButton variant="beta">Beta</StyledLozengeButton>);

  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.primary20}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.primary50}`);
});

test('render alpha Lozenge', () => {
  const { container, getByText } = render(<Lozenge label="Alpha" variant="alpha" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.warning20}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.secondary70}`);
  expect(container.querySelector('svg')).toBeInTheDocument();
  expect(container.firstChild?.nodeName).toBe('DIV');
  expect(getByText('Alpha')).toBeInTheDocument();
});

test('render beta Lozenge', () => {
  const { container, getByText } = render(<Lozenge label="Beta" variant="beta" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.primary20}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.primary50}`);
  expect(container.querySelector('svg')).toBeInTheDocument();
  expect(container.firstChild?.nodeName).toBe('DIV');
  expect(getByText('Beta')).toBeInTheDocument();
});

test('render deprecated Lozenge', () => {
  const { container, getByText } = render(<Lozenge label="Deprecated" variant="deprecated" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.danger20}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.danger70}`);
  expect(container.querySelector('svg')).toBeInTheDocument();
  expect(container.firstChild?.nodeName).toBe('DIV');
  expect(getByText('Deprecated')).toBeInTheDocument();
});

test('render legacy Lozenge', () => {
  const { container, getByText } = render(<Lozenge label="Legacy" variant="legacy" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.secondary30}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.secondary70}`);
  expect(container.querySelector('svg')).toBeInTheDocument();
  expect(container.firstChild?.nodeName).toBe('DIV');
  expect(getByText('Legacy')).toBeInTheDocument();
});

test('render new Lozenge', () => {
  const { container, getByText } = render(<Lozenge label="New" variant="new" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.success20}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.success70}`);
  expect(container.querySelector('svg')).toBeInTheDocument();
  expect(container.firstChild?.nodeName).toBe('DIV');
  expect(getByText('New')).toBeInTheDocument();
});

test('render Lozenge with tooltip', async () => {
  render(<Lozenge label="Lozenge" tooltipContent="Tooltip content" />);

  const lozenge = screen.getByText('Lozenge');

  userEvent.hover(lozenge);

  const tooltip = await screen.findByText('Tooltip content');

  expect(tooltip).toBeVisible();

  userEvent.unhover(lozenge);
  await waitFor(() => expect(tooltip).not.toBeVisible());
});

test('render Lozenge as button (popover variant)', () => {
  const handleClick = jest.fn();
  const { container, getByText } = render(
    <Lozenge isOpen={false} label="Popover" onClick={handleClick} variant="new" />,
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild?.nodeName).toBe('BUTTON');
  expect(getByText('Popover')).toBeInTheDocument();
  expect(container.querySelector('svg')).toBeInTheDocument();
});

test('StyledLozenge adjusts end padding when hasTooltip is true/false', () => {
  const { rerender, container } = render(<StyledLozenge>Pad</StyledLozenge>);

  // defaultProps has hasTooltip=false
  expect(container.firstChild).toHaveStyleRule('padding-inline-end', theme.spacing.small);

  rerender(<StyledLozenge hasTooltip>Pad</StyledLozenge>);

  expect(container.firstChild).toHaveStyleRule('padding-inline-end', theme.spacing.xxSmall);
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
    const { container } = render(<StyledLozengeButton variant={variant}>X</StyledLozengeButton>);

    // Hover outline per variant
    expect(container.firstChild).toHaveStyleRule('outline', `1px solid ${hover}`, {
      modifier: ':hover',
    });

    // Focus outline per variant
    expect(container.firstChild).toHaveStyleRule('outline', `3px solid ${focus}`, {
      modifier: ':focus',
    });
  },
);

test('Lozenge (button) applies expanded styles when isOpen is true', () => {
  const { container } = render(<Lozenge isOpen={true} label="Menu" onClick={noop} variant="new" />);

  // aria-expanded state present
  expect(container.firstChild).toHaveAttribute('aria-expanded', 'true');

  // Snapshot to exercise nested expanded style rule
  expect(container.firstChild).toMatchSnapshot();
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

  userEvent.hover(screen.getByText('X'));

  expect(await screen.findByText('Tip!')).toBeVisible();

  // Empty string -> falls back to plain lozenge (no tooltip)
  rerender(<Lozenge label="Y" tooltipContent="" />);
  userEvent.hover(screen.getByText('Y'));
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
  const { container } = render(<StyledLozenge variant={variant}>Idle</StyledLozenge>);

  expect(container.firstChild).toHaveStyleRule('background-color', bg);
  expect(container.firstChild).toHaveStyleRule('color', color);
});

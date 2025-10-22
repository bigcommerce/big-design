import { render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { GridItem } from './Item';

import { Grid } from './index';

test('render Grid', () => {
  const template = `
  "head head" 80px
  "nav  main" 1fr
  "nav  foot" 10%
  / 120px 1fr;
`;

  render(
    <Grid data-testid="grid" gridTemplate={template}>
      <GridItem gridArea="head">Header</GridItem>
      <GridItem gridArea="nav">Sidebar</GridItem>
      <GridItem gridArea="main">Content</GridItem>
      <GridItem gridArea="foot">Footer</GridItem>
    </Grid>,
  );

  expect(screen.getByTestId('grid')).toMatchSnapshot();
});

test('has display grid', () => {
  render(<Grid data-testid="grid" />);

  expect(screen.getByTestId('grid')).toHaveStyle('display: grid');
});

test('has gap properties', () => {
  const { rerender } = render(<Grid data-testid="grid" gridGap="3rem" />);

  expect(screen.getByTestId('grid')).toHaveStyle('gap: 3rem');

  rerender(<Grid data-testid="grid" gridColumnGap="1rem" gridRowGap="2rem" />);

  expect(screen.getByTestId('grid')).toHaveStyle({ 'row-gap': '2rem', 'column-gap': '1rem' });
});

test('Grid forwards styles', () => {
  render(<Grid className="test" data-testid="grid" style={{ background: 'red' }} />);

  expect(screen.getByTestId('grid')).toHaveClass('test');
  expect(screen.getByTestId('grid')).toHaveStyle('background: red');
});

test('Grid item forwards styles', () => {
  render(<GridItem className="test" data-testid="grid-item" style={{ background: 'red' }} />);

  expect(screen.getByTestId('grid-item')).toHaveClass('test');
  expect(screen.getByTestId('grid-item')).toHaveStyle('background: red');
});

test('rendering as another element retains inherited props and styles', () => {
  render(<Grid as="section" data-testid="grid" margin="medium" />);

  const grid = screen.getByTestId('grid');

  expect(grid.tagName).toBe('SECTION');
  expect(grid).toHaveStyle(`margin: 1rem`);
});

test('grid forwards ref', () => {
  const ref = createRef<HTMLDivElement>();

  render(<Grid data-testid="grid" ref={ref} />);

  const grid = screen.getByTestId('grid');

  expect(grid).toBe(ref.current);
});

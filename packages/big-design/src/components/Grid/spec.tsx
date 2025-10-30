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

  const { container } = render(
    <Grid gridTemplate={template}>
      <GridItem gridArea="head">Header</GridItem>
      <GridItem gridArea="nav">Sidebar</GridItem>
      <GridItem gridArea="main">Content</GridItem>
      <GridItem gridArea="foot">Footer</GridItem>
    </Grid>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('has display grid', () => {
  const { container } = render(<Grid />);

  expect(container.firstChild).toHaveStyle('display: grid');
});

test('has gap properties', () => {
  const { container, rerender } = render(<Grid gridGap="3rem" />);

  expect(container.firstChild).toHaveStyle('gap: 3rem');

  rerender(<Grid gridColumnGap="1rem" gridRowGap="2rem" />);

  expect(container.firstChild).toHaveStyle({ 'row-gap': '2rem', 'column-gap': '1rem' });
});

test('Grid forwards styles', () => {
  const { container } = render(<Grid className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test')).toHaveLength(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

test('Grid item forwards styles', () => {
  const { container } = render(<GridItem className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test')).toHaveLength(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

test('rendering as another element retains inherited props and styles', () => {
  const { getByTestId } = render(<Grid as="section" data-testid="grid" margin="medium" />);

  const grid = getByTestId('grid');

  expect(grid.tagName).toBe('SECTION');
  expect(grid).toHaveStyle(`margin: 1rem`);
});

test('grid forwards ref', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByTestId } = render(<Grid data-testid="grid" ref={ref} />);
  const grid = getByTestId('grid');

  expect(grid).toBe(ref.current);
});

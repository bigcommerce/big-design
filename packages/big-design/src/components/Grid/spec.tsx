import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';

import { Grid } from './index';

test('render Grid', () => {
  const template = `
  "head head" 80px
  "nav  main" 1fr
  "nav  foot" 10%
  / 120px 1fr;
`;

  const { container } = render(
    <Grid template={template}>
      <Grid.Item area="head">Header</Grid.Item>
      <Grid.Item area="nav">Sidebar</Grid.Item>
      <Grid.Item area="main">Content</Grid.Item>
      <Grid.Item area="foot">Footer</Grid.Item>
    </Grid>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('has display grid', () => {
  const { container } = render(<Grid />);

  expect(container.firstChild).toHaveStyle('display: grid');
});

test('Grid forwards styles', () => {
  const { container } = render(<Grid className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test').length).toBe(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

test('Grid item forwards styles', () => {
  const { container } = render(<Grid.Item className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test').length).toBe(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

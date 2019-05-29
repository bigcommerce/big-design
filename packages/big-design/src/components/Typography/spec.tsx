import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';

import { H0, H1, H2, H3, H4, Small, Text } from './Typography';

test('render H0', () => {
  const { container } = render(<H0>Test</H0>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render H1', () => {
  const { container } = render(<H1>Test</H1>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render H2', () => {
  const { container } = render(<H2>Test</H2>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render H3', () => {
  const { container } = render(<H3>Test</H3>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render H4', () => {
  const { container } = render(<H4>Test</H4>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render Small', () => {
  const { container } = render(<Small>Test</Small>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render Text', () => {
  const { container } = render(<Text>Test</Text>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render Text with ellipsis', () => {
  const { container } = render(<Text ellipsis={true}>Test with ellipsis</Text>);

  expect(container.firstChild).toMatchSnapshot();
});

test('H0 - does not forward styles', () => {
  const { container } = render(
    <H0 className="test" style={{ background: 'red' }}>
      Test
    </H0>,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('H1 - does not forward styles', () => {
  const { container } = render(
    <H1 className="test" style={{ background: 'red' }}>
      Test
    </H1>,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('H2 - does not forward styles', () => {
  const { container } = render(
    <H2 className="test" style={{ background: 'red' }}>
      Test
    </H2>,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('H3 - does not forward styles', () => {
  const { container } = render(
    <H3 className="test" style={{ background: 'red' }}>
      Test
    </H3>,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('H4 - does not forward styles', () => {
  const { container } = render(
    <H4 className="test" style={{ background: 'red' }}>
      Test
    </H4>,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('Small - does not forward styles', () => {
  const { container } = render(
    <Small className="test" style={{ background: 'red' }}>
      Test
    </Small>,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('Text - does not forward styles', () => {
  const { container } = render(
    <Text className="test" style={{ background: 'red' }}>
      Test
    </Text>,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

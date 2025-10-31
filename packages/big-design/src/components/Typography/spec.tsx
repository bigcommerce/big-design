import { theme } from '@bigcommerce/big-design-theme';
import { render } from '@testing-library/react';
import React from 'react';

import 'jest-styled-components';

import { H0, H1, H2, H3, H4, HR, Small, Text } from './Typography';

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

test('render HR', () => {
  const { container } = render(<HR />);

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

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('H1 - does not forward styles', () => {
  const { container } = render(
    <H1 className="test" style={{ background: 'red' }}>
      Test
    </H1>,
  );

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('H2 - does not forward styles', () => {
  const { container } = render(
    <H2 className="test" style={{ background: 'red' }}>
      Test
    </H2>,
  );

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('H3 - does not forward styles', () => {
  const { container } = render(
    <H3 className="test" style={{ background: 'red' }}>
      Test
    </H3>,
  );

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('H4 - does not forward styles', () => {
  const { container } = render(
    <H4 className="test" style={{ background: 'red' }}>
      Test
    </H4>,
  );

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('Small - does not forward styles', () => {
  const { container } = render(
    <Small className="test" style={{ background: 'red' }}>
      Test
    </Small>,
  );

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('Text - does not forward styles', () => {
  const { container } = render(
    <Text className="test" style={{ background: 'red' }}>
      Test
    </Text>,
  );

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('HR - does not forward styles', () => {
  const { container } = render(<HR className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('All typography components allow changing their color given a color prop', () => {
  const { container } = render(
    <>
      <H1 color="primary">Test</H1>
      <H2 color="primary">Test</H2>
      <H3 color="primary">Test</H3>
      <H4 color="primary">Test</H4>
      <Small color="primary">Test</Small>
      <Text color="primary">Test</Text>
    </>,
  );

  Array.from(container.children).forEach((child) => {
    expect(child).toHaveStyle(`color: ${theme.colors.primary}`);
  });
});

test('HR allows changing its color given a color prop', () => {
  const { container } = render(<HR color="primary" />);

  expect(container.firstChild).toHaveStyle(`border-bottom: 1px solid ${theme.colors.primary}`);
});

test('HR can change its margins given a margin prop', () => {
  const { container } = render(<HR marginTop="medium" />);

  expect(container.firstChild).toHaveStyle(`margin-top: ${theme.spacing.medium}`);
});

test('Headings can change their tag', () => {
  const { container } = render(<H2 as="h1">Test</H2>);

  expect(container.querySelector('h1')).toBeInTheDocument();
});

test('Headings can not change their tag to non-heading tags', () => {
  // @ts-expect-error ignoring since as="p" is not a valid prop
  const { container } = render(<H2 as="p">Test</H2>);

  expect(container.querySelector('p')).not.toBeInTheDocument();
  expect(container.querySelector('h2')).toBeInTheDocument();
});

test('Text and Small can change their tag', () => {
  const { container } = render(
    <>
      <Text as="span">Some Text</Text>
      <Small as="span">Some Text</Small>
    </>,
  );

  expect(container.querySelectorAll('span')).toHaveLength(2);
});

test('Text and Small accept text modifiers', () => {
  const { getByTestId } = render(
    <>
      <Text bold data-testid="text" italic underline uppercase>
        Some Text
      </Text>
      <Small data-testid="small" lowercase strikethrough>
        Some Text
      </Small>
    </>,
  );

  const text = getByTestId('text');
  const small = getByTestId('small');

  expect(text).toHaveStyle(`
    font-weight: 600;
    font-style: italic;
    text-decoration: underline;
    text-transform: uppercase;
  `);

  expect(small).toHaveStyle(`
    text-decoration: line-through;
    text-transform: lowercase;
  `);
});

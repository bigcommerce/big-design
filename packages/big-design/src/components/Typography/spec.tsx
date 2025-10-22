import { theme } from '@bigcommerce/big-design-theme';
import { render, screen } from '@testing-library/react';
import React from 'react';

import 'jest-styled-components';

import { H0, H1, H2, H3, H4, HR, Small, Text } from './Typography';

test('render H0', () => {
  render(<H0>Test</H0>);

  expect(screen.getByText('Test')).toMatchSnapshot();
});

test('render H1', () => {
  render(<H1>Test</H1>);

  expect(screen.getByText('Test')).toMatchSnapshot();
});

test('render H2', () => {
  render(<H2>Test</H2>);

  expect(screen.getByText('Test')).toMatchSnapshot();
});

test('render H3', () => {
  render(<H3>Test</H3>);

  expect(screen.getByText('Test')).toMatchSnapshot();
});

test('render H4', () => {
  render(<H4>Test</H4>);

  expect(screen.getByText('Test')).toMatchSnapshot();
});

test('render Small', () => {
  render(<Small>Test</Small>);

  expect(screen.getByText('Test')).toMatchSnapshot();
});

test('render Text', () => {
  render(<Text>Test</Text>);

  expect(screen.getByText('Test')).toMatchSnapshot();
});

test('render HR', () => {
  render(<HR data-testid="hr" />);

  expect(screen.getByTestId('hr')).toMatchSnapshot();
});

test('render Text with ellipsis', () => {
  render(<Text ellipsis={true}>Test with ellipsis</Text>);

  expect(screen.getByText('Test with ellipsis')).toMatchSnapshot();
});

test('H0 - does not forward styles', () => {
  render(
    <H0 className="test" style={{ background: 'red' }}>
      Test
    </H0>,
  );

  const element = screen.getByText('Test');

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(element).not.toHaveStyle('background: red');
});

test('H1 - does not forward styles', () => {
  render(
    <H1 className="test" style={{ background: 'red' }}>
      Test
    </H1>,
  );

  const element = screen.getByText('Test');

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(element).not.toHaveStyle('background: red');
});

test('H2 - does not forward styles', () => {
  render(
    <H2 className="test" style={{ background: 'red' }}>
      Test
    </H2>,
  );

  const element = screen.getByText('Test');

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(element).not.toHaveStyle('background: red');
});

test('H3 - does not forward styles', () => {
  render(
    <H3 className="test" style={{ background: 'red' }}>
      Test
    </H3>,
  );

  const element = screen.getByText('Test');

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(element).not.toHaveStyle('background: red');
});

test('H4 - does not forward styles', () => {
  render(
    <H4 className="test" style={{ background: 'red' }}>
      Test
    </H4>,
  );

  const element = screen.getByText('Test');

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(element).not.toHaveStyle('background: red');
});

test('Small - does not forward styles', () => {
  render(
    <Small className="test" style={{ background: 'red' }}>
      Test
    </Small>,
  );

  const element = screen.getByText('Test');

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(element).not.toHaveStyle('background: red');
});

test('Text - does not forward styles', () => {
  render(
    <Text className="test" style={{ background: 'red' }}>
      Test
    </Text>,
  );

  const element = screen.getByText('Test');

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(element).not.toHaveStyle('background: red');
});

test('HR - does not forward styles', () => {
  render(<HR className="test" data-testid="hr-test" style={{ background: 'red' }} />);

  const hrElement = screen.getByTestId('hr-test');

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(hrElement).not.toHaveStyle('background: red');
});

test('All typography components allow changing their color given a color prop', () => {
  render(
    <>
      <H1 color="primary" data-testid="h1-primary">
        Test H1
      </H1>
      <H2 color="primary" data-testid="h2-primary">
        Test H2
      </H2>
      <H3 color="primary" data-testid="h3-primary">
        Test H3
      </H3>
      <H4 color="primary" data-testid="h4-primary">
        Test H4
      </H4>
      <Small color="primary" data-testid="small-primary">
        Test Small
      </Small>
      <Text color="primary" data-testid="text-primary">
        Test Text
      </Text>
    </>,
  );

  expect(screen.getByTestId('h1-primary')).toHaveStyle(`color: ${theme.colors.primary}`);
  expect(screen.getByTestId('h2-primary')).toHaveStyle(`color: ${theme.colors.primary}`);
  expect(screen.getByTestId('h3-primary')).toHaveStyle(`color: ${theme.colors.primary}`);
  expect(screen.getByTestId('h4-primary')).toHaveStyle(`color: ${theme.colors.primary}`);
  expect(screen.getByTestId('small-primary')).toHaveStyle(`color: ${theme.colors.primary}`);
  expect(screen.getByTestId('text-primary')).toHaveStyle(`color: ${theme.colors.primary}`);
});

test('HR allows changing its color given a color prop', () => {
  render(<HR color="primary" data-testid="hr-color" />);

  expect(screen.getByTestId('hr-color')).toHaveStyle(
    `border-bottom: 1px solid ${theme.colors.primary}`,
  );
});

test('HR can change its margins given a margin prop', () => {
  render(<HR data-testid="hr-margin" marginTop="medium" />);

  expect(screen.getByTestId('hr-margin')).toHaveStyle(`margin-top: ${theme.spacing.medium}`);
});

test('Headings can change their tag', () => {
  render(<H2 as="h1">Test</H2>);

  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});

test('Headings can not change their tag to non-heading tags', () => {
  // @ts-expect-error ignoring since as="p" is not a valid prop
  render(<H2 as="p">Test</H2>);

  const heading = screen.getByText('Test');

  expect(heading.tagName).toBe('H2');
});

test('Text and Small can change their tag', () => {
  render(
    <>
      <Text as="span">Some Text</Text>
      <Small as="span">Some Small Text</Small>
    </>,
  );

  const textElement = screen.getByText('Some Text');
  const smallElement = screen.getByText('Some Small Text');

  expect(textElement.tagName).toBe('SPAN');
  expect(smallElement.tagName).toBe('SPAN');
});

test('Text and Small accept text modifiers', () => {
  render(
    <>
      <Text bold data-testid="text" italic underline uppercase>
        Some Text
      </Text>
      <Small data-testid="small" lowercase strikethrough>
        Some Text
      </Small>
    </>,
  );

  const text = screen.getByTestId('text');
  const small = screen.getByTestId('small');

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

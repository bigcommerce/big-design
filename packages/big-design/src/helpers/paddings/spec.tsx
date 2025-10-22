import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import React from 'react';
import styled from 'styled-components';

import { excludePaddingProps, PaddingProps, withPaddings } from './paddings';

const TestComponent = styled.div<PaddingProps>`
  ${withPaddings()};
`;

TestComponent.defaultProps = { theme: defaultTheme };

test('padding', () => {
  render(<TestComponent data-testid="test-component" padding="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('padding: 1rem');
});

test('paddingTop', () => {
  render(<TestComponent data-testid="test-component" paddingTop="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('padding-top: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-right: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-left: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-bottom: 1rem');
});

test('paddingRight', () => {
  render(<TestComponent data-testid="test-component" paddingRight="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('padding-right: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-top: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-left: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-bottom: 1rem');
});

test('paddingBottom', () => {
  render(<TestComponent data-testid="test-component" paddingBottom="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('padding-bottom: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-top: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-right: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-left: 1rem');
});

test('paddingLeft', () => {
  render(<TestComponent data-testid="test-component" paddingLeft="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('padding-left: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-top: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-right: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-bottom: 1rem');
});

test('paddingVertical', () => {
  render(<TestComponent data-testid="test-component" paddingVertical="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('padding-top: 1rem');
  expect(screen.getByTestId('test-component')).toHaveStyle('padding-bottom: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-right: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-left: 1rem');
});

test('paddingHorizontal', () => {
  render(<TestComponent data-testid="test-component" paddingHorizontal="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('padding-left: 1rem');
  expect(screen.getByTestId('test-component')).toHaveStyle('padding-right: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-top: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('padding-bottom: 1rem');
});

test('simple paddings combination', () => {
  render(
    <TestComponent
      data-testid="test-component"
      paddingBottom="none"
      paddingRight="small"
      paddingTop="medium"
    />,
  );

  expect(screen.getByTestId('test-component')).toHaveStyle('padding-top: 1rem');
  expect(screen.getByTestId('test-component')).toHaveStyle('padding-bottom: 0px');
  expect(screen.getByTestId('test-component')).toHaveStyle('padding-right: 0.75rem');
});

test('responsive padding', () => {
  render(
    <TestComponent
      data-testid="test-component"
      padding={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive paddingTop', () => {
  render(
    <TestComponent
      data-testid="test-component"
      paddingTop={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive paddingRight', () => {
  render(
    <TestComponent
      data-testid="test-component"
      paddingRight={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive paddingBottom', () => {
  render(
    <TestComponent
      data-testid="test-component"
      paddingBottom={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive paddingLeft', () => {
  render(
    <TestComponent
      data-testid="test-component"
      paddingLeft={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive paddingVertical', () => {
  render(
    <TestComponent
      data-testid="test-component"
      paddingVertical={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive paddingHorizontal', () => {
  render(
    <TestComponent
      data-testid="test-component"
      paddingHorizontal={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive and non responsive combination', () => {
  render(
    <TestComponent
      data-testid="test-component"
      paddingBottom="medium"
      paddingLeft={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
      paddingTop="none"
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('excludePaddingProps removes all margin props from an object', () => {
  const props: PaddingProps & { testKey: 'test-value' } = {
    testKey: 'test-value',
    padding: 'medium',
    paddingTop: 'medium',
    paddingRight: 'medium',
    paddingBottom: 'medium',
    paddingLeft: 'medium',
    paddingVertical: 'medium',
    paddingHorizontal: 'medium',
  };

  expect(excludePaddingProps(props)).toEqual({ testKey: 'test-value' });
});

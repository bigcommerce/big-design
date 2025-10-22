import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import React from 'react';
import styled from 'styled-components';

import { excludeMarginProps, MarginProps, withMargins } from './margins';

const TestComponent = styled.div<MarginProps>`
  ${withMargins()};
`;

TestComponent.defaultProps = { theme: defaultTheme };

test('margin', () => {
  render(<TestComponent data-testid="test-component" margin="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('margin: 1rem');
});

test('marginTop', () => {
  render(<TestComponent data-testid="test-component" marginTop="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('margin-top: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-right: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-left: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-bottom: 1rem');
});

test('marginRight', () => {
  render(<TestComponent data-testid="test-component" marginRight="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('margin-right: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-top: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-left: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-bottom: 1rem');
});

test('marginBottom', () => {
  render(<TestComponent data-testid="test-component" marginBottom="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('margin-bottom: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-top: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-right: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-left: 1rem');
});

test('marginLeft', () => {
  render(<TestComponent data-testid="test-component" marginLeft="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('margin-left: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-top: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-right: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-bottom: 1rem');
});

test('marginVertical', () => {
  render(<TestComponent data-testid="test-component" marginVertical="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('margin-top: 1rem');
  expect(screen.getByTestId('test-component')).toHaveStyle('margin-bottom: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-right: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-left: 1rem');
});

test('marginHorizontal', () => {
  render(<TestComponent data-testid="test-component" marginHorizontal="medium" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('margin-left: 1rem');
  expect(screen.getByTestId('test-component')).toHaveStyle('margin-right: 1rem');

  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-top: 1rem');
  expect(screen.getByTestId('test-component')).not.toHaveStyle('margin-bottom: 1rem');
});

test('simple margins combination', () => {
  render(
    <TestComponent
      data-testid="test-component"
      marginBottom="none"
      marginRight="small"
      marginTop="medium"
    />,
  );

  expect(screen.getByTestId('test-component')).toHaveStyle('margin-top: 1rem');
  expect(screen.getByTestId('test-component')).toHaveStyle('margin-bottom: 0px');
  expect(screen.getByTestId('test-component')).toHaveStyle('margin-right: 0.75rem');
});

test('responsive margin', () => {
  render(
    <TestComponent
      data-testid="test-component"
      margin={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive marginTop', () => {
  render(
    <TestComponent
      data-testid="test-component"
      marginTop={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive marginRight', () => {
  render(
    <TestComponent
      data-testid="test-component"
      marginRight={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive marginBottom', () => {
  render(
    <TestComponent
      data-testid="test-component"
      marginBottom={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive marginLeft', () => {
  render(
    <TestComponent
      data-testid="test-component"
      marginLeft={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive marginVertical', () => {
  render(
    <TestComponent
      data-testid="test-component"
      marginVertical={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive marginHorizontal', () => {
  render(
    <TestComponent
      data-testid="test-component"
      marginHorizontal={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('responsive and non responsive combination', () => {
  render(
    <TestComponent
      data-testid="test-component"
      marginBottom="medium"
      marginLeft={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
      marginTop="none"
    />,
  );

  expect(screen.getByTestId('test-component')).toMatchSnapshot();
});

test('excludeMarginProps removes all margin props from an object', () => {
  const props: MarginProps & { testKey: 'test-value' } = {
    testKey: 'test-value',
    margin: 'medium',
    marginTop: 'medium',
    marginRight: 'medium',
    marginBottom: 'medium',
    marginLeft: 'medium',
    marginVertical: 'medium',
    marginHorizontal: 'medium',
  };

  expect(excludeMarginProps(props)).toEqual({ testKey: 'test-value' });
});

test('non-spacing value auto', () => {
  render(<TestComponent data-testid="test-component" margin="auto" />);

  expect(screen.getByTestId('test-component')).toHaveStyle('margin: auto');
});

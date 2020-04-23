import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';

import { render } from '@test/utils';

import { excludePaddingProps, PaddingProps, withPaddings } from './paddings';

const TestComponent = styled.div<PaddingProps>`
  ${withPaddings()};
`;

TestComponent.defaultProps = { theme: defaultTheme };

test('padding', () => {
  const { container } = render(<TestComponent padding="medium" />);

  expect(container.firstChild).toHaveStyle('padding: 1rem');
});

test('paddingTop', () => {
  const { container } = render(<TestComponent paddingTop="medium" />);

  expect(container.firstChild).toHaveStyle('padding-top: 1rem');

  expect(container.firstChild).not.toHaveStyle('padding: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-right: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-left: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-bottom: 1rem');
});

test('paddingRight', () => {
  const { container } = render(<TestComponent paddingRight="medium" />);

  expect(container.firstChild).toHaveStyle('padding-right: 1rem');

  expect(container.firstChild).not.toHaveStyle('padding: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-top: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-left: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-bottom: 1rem');
});

test('paddingBottom', () => {
  const { container } = render(<TestComponent paddingBottom="medium" />);

  expect(container.firstChild).toHaveStyle('padding-bottom: 1rem');

  expect(container.firstChild).not.toHaveStyle('padding: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-top: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-right: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-left: 1rem');
});

test('paddingLeft', () => {
  const { container } = render(<TestComponent paddingLeft="medium" />);

  expect(container.firstChild).toHaveStyle('padding-left: 1rem');

  expect(container.firstChild).not.toHaveStyle('padding: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-top: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-right: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-bottom: 1rem');
});

test('paddingVertical', () => {
  const { container } = render(<TestComponent paddingVertical="medium" />);

  expect(container.firstChild).toHaveStyle('padding-top: 1rem');
  expect(container.firstChild).toHaveStyle('padding-bottom: 1rem');

  expect(container.firstChild).not.toHaveStyle('padding: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-right: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-left: 1rem');
});

test('paddingHorizontal', () => {
  const { container } = render(<TestComponent paddingHorizontal="medium" />);

  expect(container.firstChild).toHaveStyle('padding-left: 1rem');
  expect(container.firstChild).toHaveStyle('padding-right: 1rem');

  expect(container.firstChild).not.toHaveStyle('padding: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-top: 1rem');
  expect(container.firstChild).not.toHaveStyle('padding-bottom: 1rem');
});

test('simple paddings combination', () => {
  const { container } = render(<TestComponent paddingTop="medium" paddingBottom="none" paddingRight="small" />);

  expect(container.firstChild).toHaveStyle('padding-top: 1rem');
  expect(container.firstChild).toHaveStyle('padding-bottom: 0px');
  expect(container.firstChild).toHaveStyle('padding-right: 0.75rem');
});

test('responsive padding', () => {
  const { container } = render(<TestComponent padding={{ mobile: 'none', tablet: 'small', desktop: 'medium' }} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('responsive paddingTop', () => {
  const { container } = render(<TestComponent paddingTop={{ mobile: 'none', tablet: 'small', desktop: 'medium' }} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('responsive paddingRight', () => {
  const { container } = render(<TestComponent paddingRight={{ mobile: 'none', tablet: 'small', desktop: 'medium' }} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('responsive paddingBottom', () => {
  const { container } = render(
    <TestComponent paddingBottom={{ mobile: 'none', tablet: 'small', desktop: 'medium' }} />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('responsive paddingLeft', () => {
  const { container } = render(<TestComponent paddingLeft={{ mobile: 'none', tablet: 'small', desktop: 'medium' }} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('responsive paddingVertical', () => {
  const { container } = render(
    <TestComponent paddingVertical={{ mobile: 'none', tablet: 'small', desktop: 'medium' }} />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('responsive paddingHorizontal', () => {
  const { container } = render(
    <TestComponent paddingHorizontal={{ mobile: 'none', tablet: 'small', desktop: 'medium' }} />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('responsive and non responsive combination', () => {
  const { container } = render(
    <TestComponent
      paddingTop="none"
      paddingLeft={{ mobile: 'none', tablet: 'small', desktop: 'medium' }}
      paddingBottom="medium"
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
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

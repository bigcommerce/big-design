import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';

import { render } from '@test/utils';

import { withDisplay } from './display';
import { DisplayProps } from './types';

const TestComponent = styled.div<DisplayProps>`
  ${withDisplay()};
`;

TestComponent.defaultProps = { theme: defaultTheme };

test('display', () => {
  const { container } = render(<TestComponent display="inline-block" />);

  expect(container.firstChild).toHaveStyle('display: inline-block');
});

test('responsive display', () => {
  const { container } = render(<TestComponent display={{ mobile: 'none', tablet: 'flex' }} />);

  expect(container.firstChild).toMatchSnapshot();
});

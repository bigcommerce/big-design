import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import React from 'react';
import styled from 'styled-components';

import { withDisplay } from './display';
import { DisplayProps } from './types';

const TestComponent = styled.div<DisplayProps>`
  ${withDisplay()};
`;

TestComponent.defaultProps = { theme: defaultTheme };

test('display', () => {
  render(<TestComponent data-testid="display-test" display="inline-block" />);

  expect(screen.getByTestId('display-test')).toHaveStyle('display: inline-block');
});

test('responsive display', () => {
  render(
    <TestComponent data-testid="display-responsive" display={{ mobile: 'none', tablet: 'flex' }} />,
  );

  expect(screen.getByTestId('display-responsive')).toMatchSnapshot();
});

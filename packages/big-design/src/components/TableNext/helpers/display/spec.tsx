import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import React from 'react';
import styled from 'styled-components';

import { withTableColumnDisplay } from './display';
import { TableColumnDisplayProps } from './types';

const TestComponent = styled.div<TableColumnDisplayProps>`
  ${withTableColumnDisplay()};
`;

TestComponent.defaultProps = { theme: defaultTheme };

test('display', () => {
  render(<TestComponent data-testid="display-test" display="table-cell" />);

  expect(screen.getByTestId('display-test')).toHaveStyle('display: table-cell');
});

test('responsive display', () => {
  render(
    <TestComponent
      data-testid="display-responsive"
      display={{ mobile: 'none', tablet: 'table-cell' }}
    />,
  );

  expect(screen.getByTestId('display-responsive')).toMatchSnapshot();
});

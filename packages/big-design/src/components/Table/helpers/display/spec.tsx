import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import 'jest-styled-components';
import { render } from '@testing-library/react';
import React from 'react';
import styled from 'styled-components';

import { withTableColumnDisplay } from './display';
import { TableColumnDisplayProps } from './types';

const TestComponent = styled.div<TableColumnDisplayProps>`
  ${withTableColumnDisplay()};
`;

TestComponent.defaultProps = { theme: defaultTheme };

test('display', () => {
  const { container } = render(<TestComponent display="table-cell" />);

  expect(container.firstChild).toHaveStyle('display: table-cell');
});

test('responsive display', () => {
  const { container } = render(
    <TestComponent display={{ mobile: 'none', tablet: 'table-cell' }} />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

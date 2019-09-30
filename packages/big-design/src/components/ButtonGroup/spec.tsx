import { theme } from '@bigcommerce/big-design-theme';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';

import { ButtonGroup } from './index';

test('renders ButtonGroup', () => {
  const { container } = render(<ButtonGroup />);

  expect(container.firstChild).toMatchSnapshot();
});

test('renders ButtonGroup with Buttons', () => {
  const { container } = render(
    <ButtonGroup>
      <Button>Test</Button>
      <Button>Test</Button>
      <Button>Test</Button>
    </ButtonGroup>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('renders middle Button with no border-radius', () => {
  const testId = 'middleButton';

  const { queryByTestId } = render(
    <ButtonGroup>
      <Button>Test</Button>
      <Button data-testid={testId}>Test</Button>
      <Button>Test</Button>
    </ButtonGroup>,
  );

  expect(queryByTestId(testId)).toHaveStyle('border-radius: 0');
});

test("renders Buttons with appropriate border-radius'", () => {
  const firstTestId = 'firstButton';
  const lastTestId = 'lastButton';

  const { queryByTestId } = render(
    <ButtonGroup>
      <Button data-testid={firstTestId}>Test</Button>
      <Button>Test</Button>
      <Button data-testid={lastTestId}>Test</Button>
    </ButtonGroup>,
  );
  expect(queryByTestId(firstTestId)).toHaveStyle(`border-bottom-left-radius: ${theme.borderRadius.normal}`);
  expect(queryByTestId(firstTestId)).toHaveStyle(`border-top-left-radius: ${theme.borderRadius.normal}`);

  expect(queryByTestId(lastTestId)).toHaveStyle(`border-bottom-right-radius: ${theme.borderRadius.normal}`);
  expect(queryByTestId(lastTestId)).toHaveStyle(`border-top-right-radius: ${theme.borderRadius.normal}`);
});

test('renders with Dropdown', () => {
  const { queryByTestId } = render(
    <ButtonGroup>
      <Button>Button</Button>
      <Button>Button</Button>
      <Dropdown data-testid="dropdown" trigger={<Button data-testid="dropdown-button">Button</Button>}>
        <Dropdown.Item>Dropdown Item</Dropdown.Item>
        <Dropdown.Item>Dropdown Item</Dropdown.Item>
        <Dropdown.Item>Dropdown Item</Dropdown.Item>
      </Dropdown>
    </ButtonGroup>,
  );

  expect(queryByTestId('dropdown')).toBeInTheDocument();
  expect(queryByTestId('dropdown-button')).toBeInTheDocument();
});

test("doesn't render with invalid Components", () => {
  const checkbox = <Checkbox label="Test" />;

  const { queryByLabelText } = render(<ButtonGroup>{checkbox}</ButtonGroup>);

  expect(queryByLabelText('Test')).not.toBeInTheDocument();
});

test('does not forward styles', () => {
  const { container } = render(<ButtonGroup className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

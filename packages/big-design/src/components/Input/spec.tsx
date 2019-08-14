import { AddIcon } from '@bigcommerce/big-design-icons';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Form } from '../Form';

import { Input } from './index';

test('forwards ref', () => {
  const ref = React.createRef<HTMLInputElement>();
  const { container } = render(<Input ref={ref} />);
  const input = container.querySelector('input');

  expect(ref.current).toBe(input);
});

test('renders an input tag', () => {
  const { container } = render(<Input />);

  expect(container.querySelector('input')).toBeInTheDocument();
});

test('renders an input with matched label', () => {
  const { queryByLabelText } = render(<Input label="Test Label" />);

  // This one checks for matching id and htmlFor
  expect(queryByLabelText('Test Label')).toBeInTheDocument();
});

test('create unique ids if not provided', () => {
  const { queryByTestId } = render(
    <>
      <Input label="Test Label" data-testid="item1" />
      <Input label="Test Label" data-testid="item2" />
    </>,
  );

  const item1 = queryByTestId('item1') as HTMLInputElement;
  const item2 = queryByTestId('item2') as HTMLInputElement;

  expect(item1).toBeDefined();
  expect(item2).toBeDefined();
  expect(item1.id).not.toBe(item2.id);
});

test('respects provided id', () => {
  const { container } = render(<Input id="test" label="Test Label" />);
  const input = container.querySelector('#test') as HTMLInputElement;

  expect(input.id).toBe('test');
});

test('matches label htmlFor with id provided', () => {
  const { container } = render(<Input id="test" label="Test Label" />);
  const label = container.querySelector('label') as HTMLLabelElement;

  expect(label.htmlFor).toBe('test');
});

test('renders a description', () => {
  const descriptionText = 'This is a description';
  const { queryByText } = render(<Input description={descriptionText} />);

  expect(queryByText(descriptionText)).toBeInTheDocument();
});

test('renders an error', () => {
  const errorText = 'This is an error';
  const { queryByText } = render(
    <Form.Group>
      <Input error={errorText} />
    </Form.Group>,
  );

  expect(queryByText(errorText)).toBeInTheDocument();
});

test('accepts a Label Component', () => {
  const CustomLabel = (
    <Input.Label>
      This is a custom Label
      <a href="#" data-testid="test">
        has a url
      </a>
    </Input.Label>
  );

  const { queryByTestId } = render(<Input label={CustomLabel} />);

  expect(queryByTestId('test')).toBeInTheDocument();
});

test('does not accept non-Label Components', () => {
  const NotALabel = (
    <div>
      This is a not custom Label Component
      <a href="#" data-testid="test">
        has a url
      </a>
    </div>
  );

  const { queryByTestId } = render(<Input label={NotALabel} />);

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('accepts a Description Component', () => {
  const CustomDescription = (
    <Input.Description>
      This is a custom Description
      <a href="#" data-testid="test">
        has a url
      </a>
    </Input.Description>
  );

  const { queryByTestId } = render(<Input description={CustomDescription} />);

  expect(queryByTestId('test')).toBeInTheDocument();
});

test('does not accept non-Description Components', () => {
  const NotADescription = (
    <div>
      This is a not custom description
      <a href="#" data-testid="test">
        has a url
      </a>
    </div>
  );

  const { queryByTestId } = render(<Input description={NotADescription} />);

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('accepts an Error Component', () => {
  const CustomError = (
    <Input.Error>
      This is a custom Error Component
      <a href="#" data-testid="test">
        has a url
      </a>
    </Input.Error>
  );

  const { queryByTestId } = render(
    <Form.Group>
      <Input error={CustomError} />
    </Form.Group>,
  );

  expect(queryByTestId('test')).toBeInTheDocument();
});

test('does not accept non-Error Components', () => {
  const NotAnError = (
    <div>
      This is a not a custom error component
      <a href="#" data-testid="test">
        has a url
      </a>
    </div>
  );

  const { queryByTestId } = render(
    <Form.Group>
      <Input error={NotAnError} />
    </Form.Group>,
  );

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('renders iconLeft', () => {
  const { queryByTestId } = render(<Input iconLeft={<AddIcon data-testid="icon" />} />);

  expect(queryByTestId('icon')).toBeInTheDocument();
});

test('renders iconRight', () => {
  const { queryByTestId } = render(<Input iconRight={<AddIcon data-testid="icon" />} />);

  expect(queryByTestId('icon')).toBeInTheDocument();
});

test('renders both icons', () => {
  const { queryByTestId } = render(
    <Input iconRight={<AddIcon data-testid="icon-right" />} iconLeft={<AddIcon data-testid="icon-left" />} />,
  );

  expect(queryByTestId('icon-left')).toBeInTheDocument();
  expect(queryByTestId('icon-right')).toBeInTheDocument();
});

test('renders all together', () => {
  const { container } = render(
    <Input
      label="This is a label"
      description="This is a description"
      iconRight={<AddIcon data-testid="icon-right" />}
      iconLeft={<AddIcon data-testid="icon-left" />}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('is invalid when required and has no value', () => {
  const { getByLabelText } = render(<Input label="Label" description="This is a description" required />);

  const input = getByLabelText('Label') as HTMLInputElement;

  expect(input.checkValidity()).toEqual(false);
});

test('is valid when required and has a value', () => {
  const { getByLabelText } = render(
    <Input label="Label" value="Hello world" description="This is a description" required />,
  );

  const input = getByLabelText('Label') as HTMLInputElement;

  expect(input.checkValidity()).toEqual(true);
});

test('it is invalid when it was an error', () => {
  const { getByLabelText } = render(
    <Input label="Label" error="Some error" description="This is a description" required />,
  );
  const input = getByLabelText('Label') as HTMLInputElement;

  expect(input.checkValidity()).toEqual(false);

  fireEvent.change(input, { target: { value: 'Some new value ' } });

  expect(input.checkValidity()).toEqual(false);
});

test('error shows with valid string', () => {
  const error = 'Error';
  const { container, rerender } = render(
    <Form.Group>
      <Input error="" />
    </Form.Group>,
  );

  expect(container.querySelector('[class*="StyledError"]')).not.toBeInTheDocument();

  rerender(
    <Form.Group>
      <Input error={error} />
    </Form.Group>,
  );

  expect(container.querySelector('[class*="StyledError"]')).toBeInTheDocument();
});

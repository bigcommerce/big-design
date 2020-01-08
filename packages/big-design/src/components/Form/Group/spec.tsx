import { render } from '@test/utils';
import 'jest-styled-components';
import React from 'react';

import { Input } from '../../Input';

import { FormGroup } from './';

test('renders a form group', () => {
  const { container } = render(<FormGroup />);

  expect(container.firstChild).toMatchSnapshot();
});

test('renders group with input', () => {
  const { container } = render(
    <FormGroup>
      <Input />
    </FormGroup>,
  );

  expect(container.querySelector('input')).toBeInTheDocument();
});

test('renders group and input with error', () => {
  const error = 'Error';
  const { getByText } = render(
    <FormGroup>
      <Input error={error} />
    </FormGroup>,
  );

  expect(getByText(error)).toBeInTheDocument();
});

test('renders group with error prop', () => {
  const error = 'Error';
  const { getByText } = render(
    <FormGroup errors={error}>
      <Input />
    </FormGroup>,
  );

  expect(getByText(error)).toBeInTheDocument();
});

test('renders error prop with an array of errors', () => {
  const errors = ['Error 1', 'Error 2', 'Error 3'];
  const { getByText } = render(
    <FormGroup errors={errors}>
      <Input />
    </FormGroup>,
  );

  errors.forEach(error => expect(getByText(error)).toBeInTheDocument());
});

test('renders error with Input.Error element', () => {
  const testId = 'test';
  const errors = <Input.Error data-testid={testId}>Error</Input.Error>;
  const { getByTestId } = render(
    <FormGroup errors={errors}>
      <Input />
    </FormGroup>,
  );

  expect(getByTestId(testId)).toBeInTheDocument();
});

test('renders error prop with an array of Input.Error elements', () => {
  const testIds = ['test_1', 'test_2', 'test_3'];
  const errors = testIds.map(id => <Input.Error data-testid={id}>Error</Input.Error>);
  const { getByTestId } = render(
    <FormGroup errors={errors}>
      <Input />
    </FormGroup>,
  );

  testIds.forEach(id => expect(getByTestId(id)).toBeInTheDocument());
});

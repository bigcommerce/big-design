import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { Input } from '../../Input';
import { FormControlError } from '../Error';

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

  render(
    <FormGroup>
      <Input error={error} />
    </FormGroup>,
  );

  expect(screen.getByText(error)).toBeInTheDocument();
});

test('renders group and nested input with error', () => {
  const error = 'Error';

  render(
    <FormGroup>
      <div>
        <Input error={error} />
      </div>
    </FormGroup>,
  );

  expect(screen.getByText(error)).toBeInTheDocument();
});

test('renders group with error prop', () => {
  const error = 'Error';

  render(
    <FormGroup errors={error}>
      <Input />
    </FormGroup>,
  );

  expect(screen.getByText(error)).toBeInTheDocument();
});

test('renders error prop with an array of errors', () => {
  const errors = ['Error 1', 'Error 2', 'Error 3'];

  render(
    <FormGroup errors={errors}>
      <Input />
    </FormGroup>,
  );

  errors.forEach((error) => expect(screen.getByText(error)).toBeInTheDocument());
});

test('renders error with FormControlError element', () => {
  const testId = 'test';
  const errors = <FormControlError data-testid={testId}>Error</FormControlError>;

  render(
    <FormGroup errors={errors}>
      <Input />
    </FormGroup>,
  );

  expect(screen.getByTestId(testId)).toBeInTheDocument();
});

test('renders error prop with an array of FormControlError elements', () => {
  const testIds = ['test_1', 'test_2', 'test_3'];
  const errors = testIds.map((id) => (
    <FormControlError data-testid={id} key={id}>
      Error
    </FormControlError>
  ));

  render(
    <FormGroup errors={errors}>
      <Input />
    </FormGroup>,
  );

  testIds.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument());
});

test('does not render invalid errors', () => {
  const testId = 'test';
  const errors = [
    'Error',
    <FormControlError key="1">Error</FormControlError>,
    <div data-testid="testId" key="2">
      Error
    </div>,
  ];

  render(
    <FormGroup errors={errors}>
      <Input />
    </FormGroup>,
  );

  expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
});

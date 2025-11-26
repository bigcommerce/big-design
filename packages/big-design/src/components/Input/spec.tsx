import { AddIcon } from '@bigcommerce/big-design-icons';
import { render, screen } from '@testing-library/react';
import React, { createRef } from 'react';

import { warning } from '../../utils';
import { FormControlDescription, FormControlError, FormControlLabel, FormGroup } from '../Form';

import { Input } from './index';

test('forwards ref', () => {
  const ref = createRef<HTMLInputElement>();
  const { container } = render(<Input ref={ref} />);
  const input = container.querySelector('input');

  expect(ref.current).toBe(input);
});

test('renders an input tag', () => {
  const { container } = render(<Input />);

  expect(container.querySelector('input')).toBeInTheDocument();
});

test('renders an input with matched label', () => {
  render(<Input label="Test Label" />);

  // This one checks for matching id and htmlFor
  expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
});

test('create unique ids if not provided', async () => {
  render(
    <>
      <Input data-testid="item1" label="Test Label" />
      <Input data-testid="item2" label="Test Label" />
    </>,
  );

  const item1 = await screen.findByTestId('item1');
  const item2 = await screen.findByTestId('item2');

  expect(item1).toBeInTheDocument();
  expect(item2).toBeInTheDocument();
  expect(item1.id).not.toBe(item2.id);
});

test('respects provided id', async () => {
  render(<Input data-testid="test-input" id="test" label="Test Label" />);

  const input = await screen.findByTestId<HTMLInputElement>('test-input');

  expect(input.id).toBe('test');
});

test('matches label htmlFor with id provided', async () => {
  render(<Input id="test" label="Test Label" />);

  const label = await screen.findByText<HTMLLabelElement>('Test Label');

  expect(label.htmlFor).toBe('test');
});

test('respects provided labelId', async () => {
  render(<Input label="Test Label" labelId="test" />);

  const label = await screen.findByText<HTMLLabelElement>('Test Label');

  expect(label.id).toBe('test');
});

test('renders a description', () => {
  const descriptionText = 'This is a description';

  render(<Input description={descriptionText} />);

  expect(screen.getByText(descriptionText)).toBeInTheDocument();
});

test('renders an error', () => {
  const errorText = 'This is an error';
  const { container } = render(
    <FormGroup>
      <Input error={errorText} />
    </FormGroup>,
  );
  expect(screen.getByText(errorText)).toBeInTheDocument();
});

test('accepts a Label Component', () => {
  const CustomLabel = (
    <FormControlLabel>
      This is a custom Label
      <a data-testid="test" href="#">
        has a url
      </a>
    </FormControlLabel>
  );

  render(<Input label={CustomLabel} />);

  expect(screen.getByTestId('test')).toBeInTheDocument();
});

test('does not accept non-Label Components', () => {
  const NotALabel = (
    <div>
      This is a not custom Label Component
      <a data-testid="test" href="#">
        has a url
      </a>
    </div>
  );

  render(<Input label={NotALabel} />);

  expect(screen.queryByTestId('test')).not.toBeInTheDocument();
});

test('accepts a Description Component', () => {
  const CustomDescription = (
    <FormControlDescription>
      This is a custom Description
      <a data-testid="test" href="#">
        has a url
      </a>
    </FormControlDescription>
  );

  render(<Input description={CustomDescription} />);

  expect(screen.getByTestId('test')).toBeInTheDocument();
});

test('does not accept non-Description Components', () => {
  const NotADescription = (
    <div>
      This is a not custom description
      <a data-testid="test" href="#">
        has a url
      </a>
    </div>
  );

  render(<Input description={NotADescription} />);

  expect(screen.queryByTestId('test')).not.toBeInTheDocument();
});

test('accepts an Error Component', () => {
  const CustomError = (
    <FormControlError>
      This is a custom Error Component
      <a data-testid="test" href="#">
        has a url
      </a>
    </FormControlError>
  );

  const { container } = render(
    <FormGroup>
      <Input error={CustomError} />
    </FormGroup>,
  );
  expect(screen.getByTestId('test')).toBeInTheDocument();
});

test('does not accept non-Error Components', () => {
  const NotAnError = (
    <div>
      This is a not a custom error component
      <a data-testid="test" href="#">
        has a url
      </a>
    </div>
  );

  const { container } = render(
    <FormGroup>
      <Input error={NotAnError} />
    </FormGroup>,
  );
  expect(screen.queryByTestId('test')).not.toBeInTheDocument();
});

test('renders iconLeft', () => {
  render(<Input iconLeft={<AddIcon data-testid="icon" />} />);

  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('renders iconRight', () => {
  render(<Input iconRight={<AddIcon data-testid="icon" />} />);

  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('renders both icons', () => {
  render(
    <Input
      iconLeft={<AddIcon data-testid="icon-left" />}
      iconRight={<AddIcon data-testid="icon-right" />}
    />,
  );

  expect(screen.getByTestId('icon-left')).toBeInTheDocument();
  expect(screen.getByTestId('icon-right')).toBeInTheDocument();
});

test('renders all together', () => {
  const { container } = render(
    <Input
      description="This is a description"
      iconLeft={<AddIcon data-testid="icon-left" />}
      iconRight={<AddIcon data-testid="icon-right" />}
      label="This is a label"
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('error shows with valid string', () => {
  const error = 'Error';
  const { container, rerender } = render(
    <FormGroup>
      <Input error="" />
    </FormGroup>,
  );

  expect(container.querySelector('[class*="StyledError"]')).not.toBeInTheDocument();

  rerender(
    <FormGroup>
      <Input error={error} />
    </FormGroup>,
  );

  expect(screen.getByText(error)).toBeInTheDocument();
});

describe('error shows when an array of strings', () => {
  test('empty array', () => {
    const { container } = render(
      <FormGroup>
        <Input error={[]} />
      </FormGroup>,
    );

    expect(container.querySelector('[class*="StyledError"]')).not.toBeInTheDocument();
  });

  test('array with empty strings', () => {
    const { container } = render(
      <FormGroup>
        <Input error={['', '']} />
      </FormGroup>,
    );

    expect(container.querySelector('[class*="StyledError"]')).not.toBeInTheDocument();
  });

  test('array with valid strings', () => {
    const errors = ['Error 0', 'Error 1'];
    render(
      <FormGroup>
        <Input error={errors} />
      </FormGroup>,
    );

    errors.forEach((error) => expect(screen.getByText(error)).toBeInTheDocument());
  });
});

test('error shows when an array of Errors', () => {
  const testIds = ['error_0', 'error_1'];
  const errors = testIds.map((id) => (
    <FormControlError data-testid={id} key={id}>
      Error
    </FormControlError>
  ));
  render(
    <FormGroup>
      <Input error={errors} />
    </FormGroup>,
  );

  testIds.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument());
});

describe('error does not show when invalid type', () => {
  test('single element', () => {
    const error = <div data-testid="err">Error</div>;
    render(
      <FormGroup>
        <Input error={error} />
      </FormGroup>,
    );

    expect(warning).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('err')).not.toBeInTheDocument();
  });

  test('array of elements', () => {
    const errors = [
      'Error',
      <FormControlError key="1">Error</FormControlError>,
      <div data-testid="err" key="2">
        Error
      </div>,
    ];

    render(
      <FormGroup>
        <Input error={errors} />
      </FormGroup>,
    );

    expect(warning).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('err')).not.toBeInTheDocument();
  });
});

test('appends * text to label if input is required', () => {
  render(<Input label="label" required />);

  expect(screen.getByLabelText('label *')).toBeInTheDocument();
});

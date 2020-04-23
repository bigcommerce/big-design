import 'jest-styled-components';
import React, { createRef } from 'react';

import { render } from '@test/utils';

import { warning } from '../../utils';
import { FormControlDescription, FormControlError, FormControlLabel, FormGroup } from '../Form';

import { Textarea, TextareaProps } from './index';

test('forwards ref', () => {
  const ref = createRef<HTMLTextAreaElement>();
  const { container } = render(<Textarea ref={ref} />);
  const textarea = container.querySelector('textarea');

  expect(ref.current).toBe(textarea);
});

test('renders an texarea tag', () => {
  const { container } = render(<Textarea />);

  expect(container.querySelector('textarea')).toBeInTheDocument();
});

test('renders an textarea with matched label', () => {
  const { queryByLabelText } = render(<Textarea label="Test Label" />);

  // This one checks for matching id and htmlFor
  expect(queryByLabelText('Test Label')).toBeInTheDocument();
});

test('create unique ids if not provided', () => {
  const { queryByTestId } = render(
    <>
      <FormGroup>
        <Textarea label="Test Label" data-testid="item1" />
      </FormGroup>
      <FormGroup>
        <Textarea label="Test Label" data-testid="item2" />
      </FormGroup>
    </>,
  );

  const item1 = queryByTestId('item1') as HTMLTextAreaElement;
  const item2 = queryByTestId('item2') as HTMLTextAreaElement;

  expect(item1).toBeDefined();
  expect(item2).toBeDefined();
  expect(item1.id).not.toBe(item2.id);
});

test('respects provided id', () => {
  const { container } = render(<Textarea id="test" label="Test Label" />);
  const textarea = container.querySelector('#test') as HTMLTextAreaElement;

  expect(textarea.id).toBe('test');
});

test('matches label htmlFor with id provided', () => {
  const { container } = render(<Textarea id="test" label="Test Label" />);
  const label = container.querySelector('label') as HTMLLabelElement;

  expect(label.htmlFor).toBe('test');
});

test('respects provided labelId', () => {
  const { container } = render(<Textarea labelId="test" label="Test Label" />);
  const label = container.querySelector('#test') as HTMLLabelElement;

  expect(label.id).toBe('test');
});

test('renders a description', () => {
  const descriptionText = 'This is a description';
  const { queryByText } = render(<Textarea description={descriptionText} />);

  expect(queryByText(descriptionText)).toBeInTheDocument();
});

test('renders an error', () => {
  const errorText = 'This is an error';
  const { queryByText } = render(
    <FormGroup>
      <Textarea error={errorText} />
    </FormGroup>,
  );

  expect(queryByText(errorText)).toBeInTheDocument();
});

test('accepts a Label Component', () => {
  const CustomLabel = (
    <FormControlLabel>
      This is a custom Label
      <a href="#" data-testid="test">
        has a url
      </a>
    </FormControlLabel>
  );

  const { queryByTestId } = render(<Textarea label={CustomLabel} />);

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

  const { queryByTestId } = render(<Textarea label={NotALabel} />);

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('accepts a Description Component', () => {
  const CustomDescription = (
    <FormControlDescription>
      This is a custom Description
      <a href="#" data-testid="test">
        has a url
      </a>
    </FormControlDescription>
  );

  const { queryByTestId } = render(<Textarea description={CustomDescription} />);

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

  const { queryByTestId } = render(<Textarea description={NotADescription} />);

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('accepts an Error Component', () => {
  const CustomError = (
    <FormControlError>
      This is a custom Error Component
      <a href="#" data-testid="test">
        has a url
      </a>
    </FormControlError>
  );

  const { queryByTestId } = render(
    <FormGroup>
      <Textarea error={CustomError} />
    </FormGroup>,
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
    <FormGroup>
      <Textarea error={NotAnError} />
    </FormGroup>,
  );

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

describe('error does not show when invalid type', () => {
  test('single element', () => {
    const error = <div data-testid="err">Error</div>;
    const { queryByTestId } = render(
      <FormGroup>
        <Textarea error={error} />
      </FormGroup>,
    );

    expect(warning).toHaveBeenCalledTimes(1);
    expect(queryByTestId('err')).not.toBeInTheDocument();
  });

  test('array of elements', () => {
    const errors = [
      'Error',
      <FormControlError key="1">Error</FormControlError>,
      <div data-testid="err" key="2">
        Error
      </div>,
    ];

    const { queryByTestId } = render(
      <FormGroup>
        <Textarea error={errors} />
      </FormGroup>,
    );

    expect(warning).toHaveBeenCalledTimes(1);
    expect(queryByTestId('err')).not.toBeInTheDocument();
  });
});

test('accepts valid row property', () => {
  const rows = 3;
  const { baseElement } = render(<Textarea rows={rows} data-testid="test-rows" />);

  const textarea = baseElement.querySelector('textarea') as HTMLTextAreaElement;

  expect(textarea.getAttribute('rows')).toEqual(`${rows}`);
});

test('does not accept invalid row property', () => {
  const rows = 9;
  const { baseElement } = render(<Textarea rows={rows as TextareaProps['rows']} data-testid="test-rows" />);

  const textarea = baseElement.querySelector('textarea') as HTMLTextAreaElement;

  expect(textarea.getAttribute('rows')).not.toEqual(`${rows}`);
});

test('renders and accepts resize property', () => {
  const { container, rerender } = render(<Textarea resize={true} />);
  const textarea = container.querySelector('textarea');

  expect(textarea).toHaveStyle('resize: vertical');

  rerender(<Textarea resize={false} />);

  expect(textarea).toHaveStyle('resize: none');
});

test('renders all together', () => {
  const { container } = render(
    <Textarea label="This is a label" description="This is a description" rows={3} resize={true} />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

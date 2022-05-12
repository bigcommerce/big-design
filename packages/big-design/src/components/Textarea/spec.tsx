import 'jest-styled-components';
import { theme } from '@bigcommerce/big-design-theme';
import React, { createRef } from 'react';

import { render } from '@test/utils';

import { warning } from '../../utils';
import { FormControlDescription, FormControlError, FormControlLabel, FormGroup } from '../Form';

import { Textarea } from './index';

const basicBorderStyle = `1px solid ${theme.colors.secondary30}`;
const errorBorderStyle = `1px solid ${theme.colors.danger40}`;

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
        <Textarea data-testid="item1" label="Test Label" />
      </FormGroup>
      <FormGroup>
        <Textarea data-testid="item2" label="Test Label" />
      </FormGroup>
    </>,
  );

  const item1 = queryByTestId('item1');
  const item2 = queryByTestId('item2');

  expect(item1).toBeDefined();
  expect(item2).toBeDefined();
  expect(item1.id).not.toBe(item2.id);
});

test('respects provided id', () => {
  const { container } = render(<Textarea id="test" label="Test Label" />);
  const textarea = container.querySelector('#test');

  expect(textarea.id).toBe('test');
});

test('matches label htmlFor with id provided', () => {
  const { container } = render(<Textarea id="test" label="Test Label" />);
  const label = container.querySelector('label');

  expect(label.htmlFor).toBe('test');
});

test('respects provided labelId', () => {
  const { container } = render(<Textarea label="Test Label" labelId="test" />);
  const label = container.querySelector('#test');

  expect(label.id).toBe('test');
});

test('renders a description', () => {
  const descriptionText = 'This is a description';
  const { queryByText } = render(<Textarea description={descriptionText} />);

  expect(queryByText(descriptionText)).toBeInTheDocument();
});

test('renders an error', () => {
  const errorText = 'This is an error';
  const { container, queryByText } = render(
    <FormGroup>
      <Textarea error={errorText} />
    </FormGroup>,
  );
  const textarea = container.querySelector('textarea');

  expect(queryByText(errorText)).toBeInTheDocument();
  expect(textarea).toHaveStyleRule('border', errorBorderStyle);
});

test('accepts a Label Component', () => {
  const CustomLabel = (
    <FormControlLabel>
      This is a custom Label
      <a data-testid="test" href="#top">
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
      <a data-testid="test" href="#top">
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
      <a data-testid="test" href="#top">
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
      <a data-testid="test" href="#top">
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
      <a data-testid="test" href="#top">
        has a url
      </a>
    </FormControlError>
  );

  const { container, queryByTestId } = render(
    <FormGroup>
      <Textarea error={CustomError} />
    </FormGroup>,
  );
  const textarea = container.querySelector('textarea');

  expect(queryByTestId('test')).toBeInTheDocument();
  expect(textarea).toHaveStyleRule('border', errorBorderStyle);
});

test('does not accept non-Error Components', () => {
  const NotAnError = (
    <div>
      This is a not a custom error component
      <a data-testid="test" href="#top">
        has a url
      </a>
    </div>
  );

  const { container, queryByTestId } = render(
    <FormGroup>
      <Textarea error={NotAnError} />
    </FormGroup>,
  );
  const textarea = container.querySelector('textarea');

  expect(queryByTestId('test')).not.toBeInTheDocument();
  expect(textarea).toHaveStyleRule('border', basicBorderStyle);
});

describe('error does not show when invalid type', () => {
  test('single element', () => {
    const error = <div data-testid="err">Error</div>;
    const { container, queryByTestId } = render(
      <FormGroup>
        <Textarea error={error} />
      </FormGroup>,
    );
    const textarea = container.querySelector('textarea');

    expect(warning).toHaveBeenCalledTimes(1);
    expect(queryByTestId('err')).not.toBeInTheDocument();
    expect(textarea).toHaveStyleRule('border', basicBorderStyle);
  });

  test('array of elements', () => {
    const errors = [
      'Error',
      <FormControlError key="1">Error</FormControlError>,
      <div data-testid="err" key="2">
        Error
      </div>,
    ];

    const { container, queryByTestId } = render(
      <FormGroup>
        <Textarea error={errors} />
      </FormGroup>,
    );
    const textarea = container.querySelector('textarea');

    expect(warning).toHaveBeenCalledTimes(1);
    expect(queryByTestId('err')).not.toBeInTheDocument();
    expect(textarea).toHaveStyleRule('border', errorBorderStyle);
  });
});

test('accepts valid row property', () => {
  const rows = 3;
  const { baseElement } = render(<Textarea data-testid="test-rows" rows={rows} />);

  const textarea = baseElement.querySelector('textarea');

  expect(textarea.getAttribute('rows')).toBe(`${rows}`);
});

test('does not accept invalid row property', () => {
  const rows = 9;
  const { baseElement } = render(<Textarea data-testid="test-rows" rows={rows} />);

  const textarea = baseElement.querySelector('textarea');

  expect(textarea.getAttribute('rows')).not.toBe(`${rows}`);
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
    <Textarea description="This is a description" label="This is a label" resize={true} rows={3} />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

describe('error shows when an array of strings', () => {
  test('empty array', () => {
    const { container } = render(
      <FormGroup>
        <Textarea error={[]} />
      </FormGroup>,
    );
    const textarea = container.querySelector('textarea');

    expect(container.querySelector('[class*="StyledError"]')).not.toBeInTheDocument();
    expect(textarea).toHaveStyleRule('border', basicBorderStyle);
  });

  test('array with empty strings', () => {
    const { container } = render(
      <FormGroup>
        <Textarea error={['', '']} />
      </FormGroup>,
    );
    const textarea = container.querySelector('textarea');

    expect(container.querySelector('[class*="StyledError"]')).not.toBeInTheDocument();
    expect(textarea).toHaveStyleRule('border', basicBorderStyle);
  });

  test('array with valid strings', () => {
    const errors = ['Error 0', 'Error 1'];
    const { container, getByText } = render(
      <FormGroup>
        <Textarea error={errors} />
      </FormGroup>,
    );
    const textarea = container.querySelector('textarea');

    expect(textarea).toHaveStyleRule('border', errorBorderStyle);

    errors.forEach((error) => expect(getByText(error)).toBeInTheDocument());
  });
});

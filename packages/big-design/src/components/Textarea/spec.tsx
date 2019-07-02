import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';

import { PlusIcon } from '../Icons';

import { Textarea } from './index';

test('forwards ref', () => {
  const ref = React.createRef<HTMLTextAreaElement>();
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
      <Textarea label="Test Label" data-testid="item1" />
      <Textarea label="Test Label" data-testid="item2" />
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

test('renders a description', () => {
  const descriptionText = 'This is a description';
  const { queryByText } = render(<Textarea description={descriptionText} />);

  expect(queryByText(descriptionText)).toBeInTheDocument();
});

test('renders an error', () => {
  const errorText = 'This is an error';
  const { queryByText } = render(<Textarea error={errorText} />);

  expect(queryByText(errorText)).toBeInTheDocument();
});

test('accepts a Label Component', () => {
  const CustomLabel = (
    <Textarea.Label>
      This is a custom Label
      <a href="#" data-testid="test">
        has a url
      </a>
    </Textarea.Label>
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
    <Textarea.Description>
      This is a custom Description
      <a href="#" data-testid="test">
        has a url
      </a>
    </Textarea.Description>
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
    <Textarea.Error>
      This is a custom Error Component
      <a href="#" data-testid="test">
        has a url
      </a>
    </Textarea.Error>
  );

  const { queryByTestId } = render(<Textarea error={CustomError} />);

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

  const { queryByTestId } = render(<Textarea error={NotAnError} />);

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('renders iconLeft', () => {
  const { queryByTestId } = render(<Textarea iconLeft={<PlusIcon data-testid="icon" />} />);

  expect(queryByTestId('icon')).toBeInTheDocument();
});

test('renders iconRight', () => {
  const { queryByTestId } = render(<Textarea iconRight={<PlusIcon data-testid="icon" />} />);

  expect(queryByTestId('icon')).toBeInTheDocument();
});

test('renders both icons', () => {
  const { queryByTestId } = render(
    <Textarea iconRight={<PlusIcon data-testid="icon-right" />} iconLeft={<PlusIcon data-testid="icon-left" />} />,
  );

  expect(queryByTestId('icon-left')).toBeInTheDocument();
  expect(queryByTestId('icon-right')).toBeInTheDocument();
});

test('renders all together', () => {
  const { container } = render(
    <Textarea
      label="This is a label"
      description="This is a description"
      iconRight={<PlusIcon data-testid="icon-right" />}
      iconLeft={<PlusIcon data-testid="icon-left" />}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

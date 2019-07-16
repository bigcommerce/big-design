import { render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Fieldset } from './index';

test('renders a fieldset tag', () => {
  const { container } = render(<Fieldset />);

  expect(container.querySelector('fieldset')).toBeInTheDocument();
});

test('renders legend', () => {
  const legendText = 'legend text';
  const { container } = render(<Fieldset legend={legendText} />);
  const legend = container.querySelector('legend') as HTMLLegendElement;

  expect(legend).toBeInTheDocument();
});

test('renders description', () => {
  const descriptionText = 'description text';
  const { queryByText } = render(<Fieldset description={descriptionText} />);

  expect(queryByText(descriptionText)).toBeInTheDocument();
});

test('accepts a Legend Component', () => {
  const CustomLegend = (
    <Fieldset.Legend>
      This is a custom legend
      <a href="#" data-testid="test">
        has a url
      </a>
    </Fieldset.Legend>
  );

  const { queryByTestId } = render(<Fieldset legend={CustomLegend} />);

  expect(queryByTestId('test')).toBeInTheDocument();
});

test('does not accept non-Legend Components', () => {
  const NotALegend = (
    <div>
      This is not a custom legend
      <a href="#" data-testid="test">
        has a url
      </a>
    </div>
  );

  const { queryByTestId } = render(<Fieldset legend={NotALegend} />);

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('accepts a Description Component', () => {
  const CustomDescription = (
    <Fieldset.Description>
      This is a custom Description
      <a href="#" data-testid="test">
        has a url
      </a>
    </Fieldset.Description>
  );

  const { queryByTestId } = render(<Fieldset description={CustomDescription} />);

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

  const { queryByTestId } = render(<Fieldset description={NotADescription} />);

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

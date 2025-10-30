import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { warning } from '../../utils';

import { FieldsetDescription } from './Description';
import { FieldsetLegend } from './Legend';

import { Fieldset } from './index';

test('renders a fieldset tag', () => {
  const { container } = render(<Fieldset />);

  expect(container.querySelector('fieldset')).toBeInTheDocument();
});

test('renders legend', () => {
  const legendText = 'legend text';
  const { container } = render(<Fieldset legend={legendText} />);
  const legend = container.querySelector('legend');

  expect(legend).toBeInTheDocument();
});

test('renders description', () => {
  const descriptionText = 'description text';
  render(<Fieldset description={descriptionText} />);

  expect(screen.getByText(descriptionText)).toBeInTheDocument();
});

test('accepts a Legend Component', () => {
  const CustomLegend = (
    <FieldsetLegend>
      This is a custom legend
      <a data-testid="test" href="#">
        has a url
      </a>
    </FieldsetLegend>
  );

  render(<Fieldset legend={CustomLegend} />);

  expect(screen.getByTestId('test')).toBeInTheDocument();
});

test('does not accept non-Legend Components', () => {
  const NotALegend = (
    <div>
      This is not a custom legend
      <a data-testid="test" href="#">
        has a url
      </a>
    </div>
  );

  render(<Fieldset legend={NotALegend} />);

  expect(warning).toHaveBeenCalledTimes(1);
});

test('renders in legend is null or undefined', () => {
  const { container } = render(<Fieldset />);

  const fieldset = container.querySelector('fieldset');

  expect(fieldset).toBeInTheDocument();
});

test('accepts a Description Component', () => {
  const CustomDescription = (
    <FieldsetDescription>
      This is a custom Description
      <a data-testid="test" href="#">
        has a url
      </a>
    </FieldsetDescription>
  );

  render(<Fieldset description={CustomDescription} />);

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

  render(<Fieldset description={NotADescription} />);

  expect(warning).toHaveBeenCalledTimes(1);
});
